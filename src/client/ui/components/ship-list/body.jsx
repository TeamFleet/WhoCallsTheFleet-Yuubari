import React from 'react'
import { connect } from 'react-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import translate from 'sp-i18n'
import db from 'Logic/database'
import shipListFilter from 'Logic/database/list-ships-filter.js'
import {
    init as shipListInit,
    filterLeave,
    compareEnter,
    compareLeave,
    compareReset
} from 'Logic/ship-list/api.js'

import Title from './title.jsx'
import SubTitle from './title-sub.jsx'
import List from './list.jsx'
import Header from './header.jsx'

import { ImportStyle } from 'sp-css-import'
import style from './body.less'

const filterMax = 100

@connect((state, ownProps) => ({
    ...state.shipList[ownProps.id],
    location: state.location
}))
@ImportStyle(style)
export default class ShipList extends React.Component {
    toggleCompare() {
        if (this.props.isModeCompare)
            return this.props.dispatch(compareLeave(this.props.id))
        return this.props.dispatch(compareEnter(this.props.id))
    }

    getExtraButtons() {
        if (__SERVER__) return null

        let buttons = []
        if (this.props.extraButton) buttons = [this.props.extraButton]
        if (this.props.extraButtons) buttons = this.props.extraButtons

        if (!buttons.length) return null
        return buttons.map((button, index) => {
            switch (button) {
                case 'compare':
                    return (
                        <span
                            className={"link item" + (this.props.isModeCompare ? ' on' : '')}
                            key={index}
                            onClick={this.toggleCompare.bind(this)}
                        >
                            {translate("ship_list.compare.button")}
                        </span>
                    )
                default:
                    return button
            }
        })
    }

    renderCollection(collection, index) {
        if (typeof index !== 'undefined')
            index = index + '-'
        else
            index = ''
        return collection.list.map((type, index2) => (
            <div
                key={index + index2}
                className={
                    index2 === 0 ? 'first' :
                        (index2 === collection.list.length - 1 ? 'last' : '')
                    + (!type.type ? ' is-unselectable' : '')
                }
            >
                {type.type && (!type.class || !index2) ? (<Title type={type.type} />) : null}
                {!type.type && (<Title />)}
                {type.class && (<Title class={type.class} />)}
                <List
                    id={this.props.id}
                    ships={type.ships}
                />
            </div>
        ))
    }

    renderFilteredResult() {
        let result = shipListFilter(this.props.filterInput)
        let filteredResultText

        if (result.length > filterMax) {
            this.filteredResult = result.slice(0, filterMax)
            filteredResultText = translate('ship_list.filter.results_count_too_many', { count: result.length, showing: filterMax })
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
        if (this.props.isModeCompare && this.props.compareState === 'comparing') {
            return 'COMPARING'
        } else if (__CLIENT__) {
            if (this.props.isModeFilter && typeof this.props.filterInput !== 'undefined' && this.props.filterInput !== "")
                return this.renderFilteredResult()
            else {
                this.filteredResult = undefined
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
        }
    }

    componentWillUnmount() {
        if (!__CLIENT__) return
        if (typeof this.props.isModeCompare !== 'undefined' || this.props.compareList.length)
            this.props.dispatch(
                compareReset(this.props.id)
            )
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
