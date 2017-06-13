import React from 'react'
import { connect } from 'react-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import classNames from 'classNames'

import translate from 'sp-i18n'
import db from 'Logic/database'
import shipListFilter from 'Logic/database/list-ships-filter.js'
import {
    init as shipListInit,
    filterLeave,
    compareReset
} from 'Logic/ship-list/api.js'
import pref from 'Logic/preferences'

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
    ...state.shipList[ownProps.id],
    location: state.location
}))
@ImportStyle(style)
export default class ShipList extends React.Component {
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
                <div
                    key={index + index2}
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
            <div className="results">
                <p className="results-text">{filteredResultText}</p>
                {<List
                    id={this.props.id}
                    ships={this.filteredResult}
                />}
            </div>
        )
    }

    renderBody() {
        // console.log(db)
        if (this.props.isModeCompare && this.props.compareState === 'comparing') {
            return <TableBody id={this.props.id} ships={this.props.compareList} />
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

    componentWillMount() {
        if (this.props.location && this.props.location.action === 'PUSH') {
            if (this.props.isModeFilter || typeof this.props.filterInput !== 'undefined')
                this.props.dispatch(
                    filterLeave(this.props.id)
                )
            if (typeof this.props.isModeCompare !== 'undefined' || (this.props.compareList && this.props.compareList.length))
                this.props.dispatch(
                    compareReset(this.props.id, true)
                )
        }
    }

    render() {
        if (typeof this.props.collection === 'undefined') {
            this.props.dispatch(
                shipListInit(this.props.id)
            )
            return null
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

                <CSSTransitionGroup
                    component="div"
                    className="transition-group"
                    transitionName="transition"
                    transitionLeave={false}
                    transitionEnterTimeout={200}
                >
                    {this.renderBody()}
                </CSSTransitionGroup>

            </div>
        )
    }
}
