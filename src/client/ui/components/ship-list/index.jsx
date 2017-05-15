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
import style from './index.less'

@connect()
@ImportStyle(style)
export default class ShipList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            collection: this.props.collection || 0,
            filtering: false,
            filteredResult: null,
            filteredResultRealtimeCount: 0
        }

        // this.lastCollection
    }

    onCollectionChange(evt, to) {
        this.setState({
            collection: to
        })
        if (this.props.callbacks && typeof this.props.callbacks.onCollectionChange === 'function')
            this.props.callbacks.onCollectionChange(evt, to)
    }

    onFilterInput(evt) {
        let result = shipListFilter(evt.target.value)

        if (result.length > 0) {
            if (this.state.collection > 0) this.lastCollection = this.state.collection
            this.setState({
                collection: -1,
                filteredResult: result,
                filteredResultRealtimeCount: result.length
            })
        } else if (evt.target.value === "") {
            this.setState({
                collection: this.lastCollection || 0,
                filteredResult: null,
                filteredResultRealtimeCount: 0
            })
        } else {
            this.setState({
                filteredResultRealtimeCount: result.length
            })
        }
    }

    enterFilter() {
        if (!this.state.filtering)
            this.setState({
                filtering: true
            })
        // console.log('entering filter mode')
    }

    leaveFilter() {
        if (this.state.filtering)
            this.setState({
                filtering: false
            })
        // console.log('leaving filter mode')
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
                <List ships={type.ships} showAll={!type.type} />
            </div>
        ))
    }

    renderFilteredResult() {
        if (!this.state.filteredResult || !this.state.filteredResult.length) return null
        return (
            <div>
                <p>{
                    this.state.filteredResultRealtimeCount
                        ? translate('ship_list.filter.results_count', { count: this.state.filteredResultRealtimeCount })
                        : translate('ship_list.filter.no_result')
                }</p>
                {<List ships={this.state.filteredResult} />}
            </div>
        )
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.collection !== this.state.collection)
            window.scrollTo(undefined, 0)
    }

    render() {
        return (
            <div className={this.props.className}>
                {__CLIENT__ && <Header
                    callbacks={{
                        onCollectionChange: this.onCollectionChange.bind(this),
                        onFilterInput: this.onFilterInput.bind(this),
                        enterFilter: this.enterFilter.bind(this),
                        leaveFilter: this.leaveFilter.bind(this)
                    }}
                    collection={this.state.collection}
                    filtering={this.state.filtering}
                />}

                <CSSTransitionGroup
                    component="div"
                    className="transition-group"
                    transitionName="transition"
                    transitionLeave={false}
                    transitionEnterTimeout={200}
                >

                    {__CLIENT__ && this.state.collection > -1 && this.renderCollection(db.shipCollections[this.state.collection], 'c-' + this.state.collection)}
                    {__CLIENT__ && this.state.collection < 0 && this.renderFilteredResult()}
                    {__SERVER__ && db.shipCollections.map(this.renderCollection)}

                </CSSTransitionGroup>

            </div>
        )
    }
}
