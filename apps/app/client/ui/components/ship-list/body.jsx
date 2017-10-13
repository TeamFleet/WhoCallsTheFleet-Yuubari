import React from 'react'
import { connect } from 'react-redux'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import CSSTransition from 'react-transition-group/CSSTransition'
import classNames from 'classnames'

import translate from 'sp-i18n'
import db from '@appLogic/database'
import shipListFilter from '@appLogic/database/list-ships-filter.js'
import {
    init as shipListInit,
    // reset as shipListReset,
    // filterLeave,
    // compareReset
} from '@appLogic/ship-list/api.js'
import pref from '@appLogic/preferences'
// import { REALTIME_LOCATION_REDUCER_NAME } from 'sp-isomorphic-utils/realtime-location'

import Title from './title.jsx'
import List from './list.jsx'
import Header from './header.jsx'
import TableBody from './table-body.jsx'

import { ImportStyle } from 'sp-css-import'
import style from './body.less'

const filterSelectMax = 100

const getShipList = (list) => {
    let result = []

    const checkLastRemodelLoop = (ships, index) => {
        while (ships[index].remodel && ships[index].remodel.next_loop)
            index++
        return index === ships.length - 1
    }

    list.forEach(ships => {
        if (Array.isArray(ships))
            return ships.forEach((ship, index2) => {
                if (!pref.shipListShowAllShips
                    && index2 < ships.length - 1
                    && !checkLastRemodelLoop(ships, index2)
                )
                    return null
                result.push(ship)
            })

        // 搜索结果：第一级为Ship
        result.push(ships)
    })

    return result
}

@connect((state, ownProps) => ({
    // ...state.shipList[ownProps.id],
    isInit: (typeof state.shipList[ownProps.id] !== 'undefined'),
    // location: state[REALTIME_LOCATION_REDUCER_NAME]
}))
// @connect()
// @ImportStyle(style)
export default class ShipList extends React.Component {
    // componentWillMount() {
    //     if (this.props.isInit && this.props.location && this.props.location.action === 'PUSH'){
    //         console.log('reset')
    //         this.props.dispatch(shipListReset(this.props.id))
    //     }
    // }

    render() {
        if (!this.props.isInit) {
            this.props.dispatch(
                shipListInit(this.props.id)
            )
            if (__CLIENT__) return null
        }

        return <ShipListBody { ...this.props } />
    }
}

// @connect((state, ownProps) => ({
//     ...state.shipList[ownProps.id],
//     // location: state.location
// }))
@connect((state, ownProps) => state.shipList[ownProps.id] || {})
@ImportStyle(style)
class ShipListBody extends React.Component {
    getExtraButtons() {
        if (__SERVER__) return null

        let buttons = []
        if (this.props.extraButton) buttons = [this.props.extraButton]
        if (this.props.extraButtons) buttons = this.props.extraButtons

        if (!buttons.length) return null

        return buttons
    }

    renderCollection(collection, index) {
        if (typeof index !== 'undefined')
            index = index + '-'
        else
            index = ''
        let listType
        return collection.list.map((type, index2) => {
            const list = getShipList(type.ships)
            if (type.type && type.class && typeof listType === 'undefined') {
                listType = []
                collection.list.forEach(type => {
                    listType = listType.concat(getShipList(type.ships))
                })
            }
            return (
                <CSSTransitionComponent key={index + index2}>
                    <div
                        className={classNames({
                            'first': index2 === 0,
                            'last': index2 === collection.list.length - 1,
                            'is-unselectable': !type.type
                        })}
                    >
                        {type.type && (!type.class || !index2) ? (<Title type={type.type} id={this.props.id} ships={listType || list} />) : null}
                        {!type.type && (<Title />)}
                        {type.class && (<Title class={type.class} id={this.props.id} ships={list} />)}
                        <List
                            id={this.props.id}
                            ships={list}
                        />
                    </div>
                </CSSTransitionComponent>
            )
        })
    }

    renderFilteredResult() {
        let result = shipListFilter(this.props.filterInput)
        let filteredResultText

        if (result.length > filterSelectMax) {
            this.filteredResult = result.slice(0, filterSelectMax)
            filteredResultText = translate('ship_list.filter.results_count_too_many', { count: result.length, showing: filterSelectMax })
        } else if (result.length > 0) {
            this.filteredResult = result
            filteredResultText = translate('ship_list.filter.results_count', { count: result.length })
        } else if (!this.filteredResult || !this.filteredResult.length) {
            this.filteredResult = result
            filteredResultText = translate('ship_list.filter.no_result')
        } else {
            filteredResultText = translate('ship_list.filter.no_result_show_previous')
        }

        return (
            <CSSTransitionComponent key="results">
                <div className="results">
                    <p className="results-text">{filteredResultText}</p>
                    {<List
                        id={this.props.id}
                        ships={this.filteredResult}
                    />}
                </div>
            </CSSTransitionComponent>
        )
    }

    renderBody() {
        // console.log(db)
        if (this.props.isModeCompare && this.props.compareState === 'comparing') {
            return (
                <CSSTransitionComponent key="compare">
                    <TableBody id={this.props.id} ships={this.props.compareList} />
                </CSSTransitionComponent>
            )
        } else if (__CLIENT__) {
            if (this.props.isModeFilter && typeof this.props.filterInput !== 'undefined' && this.props.filterInput !== "")
                return this.renderFilteredResult()
            else {
                this.filteredResult = undefined
                // if (__DEV__) console.log(db.shipCollections[this.props.collection])
                return this.renderCollection(db.shipCollections[this.props.collection], 'c-' + this.props.collection)
            }
        } else {
            return db.shipCollections.map(this.renderCollection.bind(this))
        }
    }

    componentDidUpdate(prevProps/*, prevState*/) {
        if (prevProps.collection !== this.props.collection)
            window.scrollTo(undefined, 0)
    }

    // componentWillMount() {
    //     if (this.props.location && this.props.location.action === 'PUSH') {
    //         if (this.props.isModeFilter || typeof this.props.filterInput !== 'undefined')
    //             this.props.dispatch(
    //                 filterLeave(this.props.id)
    //             )
    //         if (typeof this.props.isModeCompare !== 'undefined' || (this.props.compareList && this.props.compareList.length))
    //             this.props.dispatch(
    //                 compareReset(this.props.id, true)
    //             )
    //     }
    // }

    // componentDidMount() {
    //     this.container.addEventListener("pointerover", (evt) => {
    //         if (evt.pointerType === 'mouse' || evt.pointerType === 'pen')
    //             if (evt.target.classList.contains('item'))
    //                 evt.target.classList.add('is-hover')
    //     });
    //     this.container.addEventListener("pointerout", (evt) => {
    //         if (evt.pointerType === 'mouse' || evt.pointerType === 'pen')
    //             if (evt.target.classList.contains('item'))
    //                 evt.target.classList.remove('is-hover')
    //     });
    // }

    render() {
        if (__CLIENT__ && __DEV__) {
            // if (__DEV__) {
            console.log('shipList', this.props)
            const t0 = performance.now()
            setTimeout(() => {
                console.log("Rendering ship-list took " + (performance.now() - t0) + " milliseconds.")
            })
        }

        return (
            <div className={
                this.props.className
                + (this.props.isModeCompare ? ` is-compare is-compare-${this.props.compareState}` : '')
            }>
                {__CLIENT__ && <Header
                    id={this.props.id}
                    extraButtons={this.getExtraButtons()}
                />}

                <TransitionGroup
                    component="div"
                    className="wrapper"
                >
                    {this.renderBody()}
                </TransitionGroup>

            </div>
        )
    }
}

const CSSTransitionComponent = (props) => (
    <CSSTransition
        {...props}
        classNames="transition"
        timeout={{
            enter: 200
        }}
        exit={false}
    />
);