import React from 'react'
import { connect } from 'react-redux'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import CSSTransition from 'react-transition-group/CSSTransition'
import classNames from 'classnames'

import db from '@api/database'
import shipListFilter from '@api/database/list-ships-filter.js'
import {
    init as shipListInit,
    // reset as shipListReset,
    // filterLeave,
    // compareReset
} from '@api/ship-list/api.js'
import pref from '@api/preferences'

import sortShips from '@utils/sort-ships'

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
    constructor(props) {
        super(props)
        if (!props.isInit) {
            props.dispatch(
                shipListInit(props.id)
            )
        }
    }

    render() {
        if (!this.props.isInit) {
            if (__CLIENT__) return null
        }

        return <ShipListBody {...this.props} />
    }
}

// @connect((state, ownProps) => ({
//     ...state.shipList[ownProps.id],
//     // location: state.location
// }))
// @connect((state, ownProps) => state.shipList[ownProps.id] || {})
@connect((state, ownProps) => {
    const {
        // collection,
        isModeFilter,
        filterInput,
        isModeCompare,
        compareState,
        // compareList,
    } = state.shipList[ownProps.id] || {}
    return {
        // collection,

        isModeFilter,
        hasFilterInput: (typeof filterInput !== 'undefined' && filterInput !== "") ? true : false,

        isModeCompare,
        compareState,
        // compareList,
        // compareSort,
        // compareScrollLeft,
    }
})
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

    /*
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

    renderBody() {
        // console.log(db)
        if (this.props.isModeCompare && this.props.compareState === 'comparing') {
            return <ShipListBodyListCompare key="compare" id={this.props.id} />
        } else if (__CLIENT__) {
            if (this.props.isModeFilter && this.props.hasFilterInput)
                return <ShipListBodyListFilteredResult key="filtered" id={this.props.id} />
            else {
                // this.filteredResult = undefined
                // if (__DEV__) console.log(db.shipCollections[this.props.collection])
                return <ShipListBodyListCollection key="collection" id={this.props.id} />
                // return this.renderCollection(db.shipCollections[this.props.collection], 'c-' + this.props.collection)
            }
        } else {
            // return db.shipCollections.map(this.renderCollection.bind(this))
            return db.shipCollections.map((collection, index) => (
                <ShipListBodyListCollection
                    key={'c-' + index}
                    index={'c-' + index}
                    id={this.props.id}
                />
            ))
        }
    }
    */

    // componentDidUpdate(prevProps/*, prevState*/) {
    //     if (prevProps.collection !== this.props.collection)
    //         window.scrollTo(undefined, 0)
    // }

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

        let showType
        if (this.props.isModeCompare && this.props.compareState === 'comparing')
            showType = 'compare'
        else if (this.props.isModeFilter && this.props.hasFilterInput)
            showType = 'filtered'
        else if (__CLIENT__)
            showType = 'collection'

        return (
            <div className={
                classNames({
                    [this.props.className]: true,
                    'is-compare': this.props.isModeCompare,
                    [`is-compare-${this.props.compareState}`]: this.props.isModeCompare,
                })
            } >
                {__CLIENT__ && <Header
                    id={this.props.id}
                    extraButtons={this.getExtraButtons()}
                />}

                {<ShipListBodyListCompare show={showType === 'compare'} id={this.props.id} />}
                {<ShipListBodyListFilteredResult show={showType === 'filtered'} id={this.props.id} />}
                {__CLIENT__ && <ShipListBodyListCollection show={showType === 'collection'} id={this.props.id} />}
                {__SERVER__ && (
                    db.shipCollections.map((collection, index) => (
                        <ShipListBodyListCollection
                            key={'c-' + index}
                            index={index}
                            id={this.props.id}
                        />
                    ))
                )}
            </div>
        )
    }
}

const CSSTransitionGroup = (props) => (
    <TransitionGroup
        component="div"
        className="wrapper"
        {...props}
    />
);

const CSSTransitionComponent = (props) => (
    <CSSTransition
        {...props}
        classNames="transition"
        timeout={200}
        exit={false}
    />
);

@connect((state, ownProps) => {
    const {
        compareState,
        compareList,
    } = state.shipList[ownProps.id] || {}
    return {
        compareState,
        compareList,
    }
})
class ShipListBodyListCompare extends React.Component {
    render() {
        const show = (
            this.props.show &&
            this.props.compareState === 'comparing'
        )

        return (
            <CSSTransitionGroup>
                {show &&
                    <CSSTransitionComponent key="compare">
                        <TableBody id={this.props.id} ships={this.props.compareList} />
                    </CSSTransitionComponent>
                }
            </CSSTransitionGroup>
        )
    }
}

@connect((state, ownProps) => ({
    filterInput: state.shipList[ownProps.id]
        ? state.shipList[ownProps.id].filterInput
        : undefined,
}))
class ShipListBodyListFilteredResult extends React.Component {
    componentDidUpdate(prevProps/*, prevState*/) {
        if (prevProps.filterInput !== this.props.filterInput)
            window.scrollTo(undefined, 0)
    }
    render() {
        const show = (
            this.props.show &&
            typeof this.props.filterInput !== 'undefined' &&
            this.props.filterInput !== ''
        )

        let text, list

        if (show) {
            const result = shipListFilter(this.props.filterInput)
            if (result.length > filterSelectMax) {
                list = result.slice(0, filterSelectMax)
                text = __('ship_list.filter.results_count_too_many', { count: result.length, showing: filterSelectMax })
            } else if (result.length > 0) {
                list = result
                text = __('ship_list.filter.results_count', { count: result.length })
            } else if (!list || !list.length) {
                list = result
                text = __('ship_list.filter.no_result')
            } else {
                text = __('ship_list.filter.no_result_show_previous')
            }

            if (Array.isArray(list) && list.length) {
                list = sortShips(list)
            }
        }

        return (
            <CSSTransitionGroup>
                {show &&
                    <CSSTransitionComponent key="filterd">
                        <div className="results">
                            <p className="results-text">{text}</p>
                            {<List
                                id={this.props.id}
                                ships={list}
                            />}
                        </div>
                    </CSSTransitionComponent>
                }
            </CSSTransitionGroup>
        )
    }
}

@connect((state, ownProps) => {
    const {
        collection,
    } = state.shipList[ownProps.id] || {}
    return {
        collection,
    }
})
class ShipListBodyListCollection extends React.Component {
    componentDidUpdate(prevProps/*, prevState*/) {
        if (prevProps.collection !== this.props.collection)
            window.scrollTo(undefined, 0)
    }
    render() {
        let {
            collection,
            show,
        } = this.props

        if (__SERVER__) {
            collection = db.shipCollections[this.props.index]
        } else if (typeof collection === 'undefined' || !show) {
            collection = { list: [] }
        } else if (typeof collection !== 'object') {
            collection = db.shipCollections[collection]
        }

        let listType

        return (
            <CSSTransitionGroup>
                {collection.list.map((type, index2) => {
                    const list = getShipList(type.ships)
                    if (type.type && type.class && typeof listType === 'undefined') {
                        listType = []
                        collection.list.forEach(type => {
                            listType = listType.concat(getShipList(type.ships))
                        })
                    }
                    return (
                        <CSSTransitionComponent key={collection.name + index2} data-key={collection.name + index2}>
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
                })}
            </CSSTransitionGroup>
        )
    }
}
