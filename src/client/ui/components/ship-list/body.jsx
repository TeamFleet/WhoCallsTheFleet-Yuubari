import React from 'react'
import { connect } from 'react-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import translate from 'sp-i18n'
import db from 'Logic/database'
import shipListFilter from 'Logic/database/list-ships-filter.js'
import {
    init as shipListInit,
    filterLeave
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
    constructor(props) {
        super(props)

        this.state = {
            isModeCompare: false,
            compareState: 'selecting', // selecting || comparing
            compareList: __SERVER__ ? null : []
        }

        // this.lastCollection
    }

    onEnterCompare() {
        if (!this.state.isModeCompare)
            this.setState({
                isModeCompare: true
            })
        // console.log('entering compare mode')
    }

    onLeaveCompare() {
        if (this.state.isModeCompare)
            this.setState({
                isModeCompare: false
            })
        // console.log('leaving compare mode')
    }

    toggleCompare() {
        if (this.state.isModeCompare)
            return this.onLeaveCompare()
        return this.onEnterCompare()
    }

    onUpdateCompareState(evt, newState) {
        if (typeof evt === 'string') return this.onUpdateCompareState(undefined, evt)
        this.setState({
            compareState: newState
        })
    }

    onCompareSelect(evt, ship, isRemove) {
        let compareList = [...this.state.compareList]
        const index = compareList.indexOf(ship)

        if (index < 0 && !isRemove) {
            compareList.push(ship)
            this.setState({
                compareList
            })
        } else if (index > -1 && isRemove) {
            compareList.splice(index, 1)
            this.setState({
                compareList
            })
        }

        // console.log('compareList', compareList)
    }

    onResetCompareSelect() {
        this.setState({
            compareList: []
        })
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
                            className={"link item" + (this.state.isModeCompare ? ' on' : '')}
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
            <div key={index + index2}>
                {type.type && (!type.class || !index2) ? (<Title type={type.type} />) : null}
                {!type.type && (<Title />)}
                {type.class && (<SubTitle class={type.class} />)}
                <List
                    id={this.props.id}
                    ships={type.ships}
                    showHidden={!type.type}

                    isModeCompare={this.state.isModeCompare}
                    onCompareSelect={this.onCompareSelect.bind(this)}
                    compareList={this.state.compareList}
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

                    isModeCompare={this.state.isModeCompare}
                    onCompareSelect={this.onCompareSelect.bind(this)}
                    compareList={this.state.compareList}
                />}
            </div>
        )
    }

    renderBody() {
        if (this.state.isModeCompare && this.state.compareState === 'comparing') {
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
                + (this.state.isModeCompare ? ` is-compare is-compare-${this.state.compareState}` : '')
            }>
                {__CLIENT__ && <Header
                    id={this.props.id}

                    isModeCompare={this.state.isModeCompare}
                    compareList={this.state.compareList}
                    compareState={this.state.compareState}
                    onUpdateCompareState={this.onUpdateCompareState.bind(this)}
                    onResetCompareSelect={this.onResetCompareSelect.bind(this)}

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
