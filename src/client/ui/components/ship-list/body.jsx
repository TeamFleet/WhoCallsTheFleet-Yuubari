import React from 'react'
import { connect } from 'react-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import translate from 'sp-i18n'
import db from 'Logic/database'
import shipListFilter from 'Logic/database/list-ships-filter.js'

import Title from './title.jsx'
import SubTitle from './title-sub.jsx'
import List from './list.jsx'
import Header from './header.jsx'

import { ImportStyle } from 'sp-css-import'
import style from './body.less'

const filterMax = 100

@connect()
@ImportStyle(style)
export default class ShipList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            collection: this.props.collection || 0,

            isModeFilter: false,
            filteredResult: undefined,
            filteredResultText: undefined,

            isModeCompare: false,
            compareState: 'selecting', // selecting || comparing
            compareList: __SERVER__ ? null : []
        }

        // this.lastCollection
    }

    onCollectionChange(evt, to) {
        if (typeof to === 'undefined') to = parseInt(evt.target.value)
        this.setState({
            collection: to
        })
        if (typeof this.props.onCollectionChange === 'function')
            this.props.onCollectionChange(evt, to)
    }

    onFilterInput(evt) {
        const value = typeof evt === 'string' ? evt : evt.target.value
        let result = shipListFilter(value)

        if (result.length > filterMax) {
            if (this.state.collection > 0) this.lastCollection = this.state.collection
            this.setState({
                collection: -1,
                filteredResult: result.slice(0, filterMax),
                filteredResultText: translate('ship_list.filter.results_count_too_many', { count: result.length, showing: filterMax })
            })
        } else if (result.length > 0) {
            if (this.state.collection > 0) this.lastCollection = this.state.collection
            this.setState({
                collection: -1,
                filteredResult: result,
                filteredResultText: translate('ship_list.filter.results_count', { count: result.length })
            })
        } else if (value === "") {
            this.setState({
                collection: this.lastCollection || 0,
                filteredResult: undefined,
                filteredResultText: undefined
            })
        } else if (!this.state.filteredResult || !this.state.filteredResult.length) {
            if (this.state.collection > 0) this.lastCollection = this.state.collection
            this.setState({
                collection: -1,
                filteredResult: result,
                filteredResultText: translate('ship_list.filter.no_result')
            })
        } else {
            this.setState({
                filteredResultText: translate('ship_list.filter.no_result_show_previous')
            })
        }
    }

    onEnterFilter() {
        if (!this.state.isModeFilter)
            this.setState({
                isModeFilter: true
            })
        // console.log('entering filter mode')
    }

    onLeaveFilter() {
        if (this.state.isModeFilter)
            this.setState({
                isModeFilter: false
            })
        // console.log('leaving filter mode')
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
        if (typeof this.state.filteredResult === 'undefined') return null
        return (
            <div className="results">
                <p className="results-text">{this.state.filteredResultText}</p>
                {<List
                    ships={this.state.filteredResult}
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
        } else {
            if (__CLIENT__ && this.state.collection > -1)
                return this.renderCollection(db.shipCollections[this.state.collection], 'c-' + this.state.collection)
            else if (__CLIENT__ && this.state.collection < 0)
                return this.renderFilteredResult()
            else if (__SERVER__)
                return db.shipCollections.map(this.renderCollection.bind(this))
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.collection !== this.state.collection)
            window.scrollTo(undefined, 0)
    }

    render() {
        return (
            <div className={
                this.props.className
                + (this.state.isModeCompare ? ` is-compare is-compare-${this.state.compareState}` : '')
            }>
                {__CLIENT__ && <Header
                    collection={this.state.collection}
                    onCollectionChange={this.onCollectionChange.bind(this)}

                    isModeFilter={this.state.isModeFilter}
                    onFilterInput={this.onFilterInput.bind(this)}
                    onEnterFilter={this.onEnterFilter.bind(this)}
                    onLeaveFilter={this.onLeaveFilter.bind(this)}

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
