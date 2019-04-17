import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import classNames from 'classnames'
import { extend } from 'koot'
const hotkeys = __CLIENT__ ? require('hotkeys-js').default : undefined

import { KEY_SHIPLIST_SEARCH_RESULT_NAVIGATE } from '@const/hotkey-scopes'
import db from '@database'
import shipListFilter from '@database/list-ships-filter.js'
import {
    init as shipListInit,
    // reset as shipListReset,
    // filterLeave,
    // compareReset
} from '@api/ship-list/api.js'
import pref from '@api/preferences'

import sortShips from '@utils/sort-ships'

import Title from './title'
import List from './list'
import Header from './header'
import TableBody from './table-body'

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

@extend({
    connect: (state, ownProps) => ({
        // ...state.shipList[ownProps.id],
        isInit: (typeof state.shipList[ownProps.id] !== 'undefined'),
        // location: state[REALTIME_LOCATION_REDUCER_NAME]
    })
})
class ShipListView extends React.Component {
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

    componentWillUnmount() {
        hotkeys.setScope('all')
    }

    render() {
        if (!this.props.isInit) {
            if (__CLIENT__) return null
        }

        return <Body {...this.props} />
    }
}
export default ShipListView

// @connect((state, ownProps) => ({
//     ...state.shipList[ownProps.id],
//     // location: state.location
// }))
// @connect((state, ownProps) => state.shipList[ownProps.id] || {})
@extend({
    connect: (state, ownProps) => {
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
    },
    styles: require('./body.less')
})
class Body extends React.Component {
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
                        {type.class && (<Title className={type.class} id={this.props.id} ships={list} />)}
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
            return <BodyCompare key="compare" id={this.props.id} />
        } else if (__CLIENT__) {
            if (this.props.isModeFilter && this.props.hasFilterInput)
                return <BodyFiltered key="filtered" id={this.props.id} />
            else {
                // this.filteredResult = undefined
                // if (__DEV__) console.log(db.shipCollections[this.props.collection])
                return <BodyCollections key="collection" id={this.props.id} />
                // return this.renderCollection(db.shipCollections[this.props.collection], 'c-' + this.props.collection)
            }
        } else {
            // return db.shipCollections.map(this.renderCollection.bind(this))
            return db.shipCollections.map((collection, index) => (
                <BodyCollections
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

                <BodyCompare show={showType === 'compare'} id={this.props.id} />
                <BodyFiltered show={showType === 'filtered'} id={this.props.id} />
                {__CLIENT__ && <BodyCollections show={showType === 'collection'} id={this.props.id} />}
                {__SERVER__ && (
                    db.shipCollections.map((collection, index) => (
                        <BodyCollections
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
        component={React.Fragment}
        // className="wrapper"
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

const BodyCompare = extend({
    connect: (state, ownProps) => {
        const {
            compareState,
            compareList,
        } = state.shipList[ownProps.id] || {}
        return {
            compareState,
            compareList,
        }
    }
})(
    ({ show, compareState, id, compareList }) => (
        <CSSTransitionGroup>
            {show && compareState === 'comparing'
                ? (
                    <CSSTransitionComponent key="compare">
                        <TableBody id={id} ships={compareList} />
                    </CSSTransitionComponent>
                )
                : null
            }
        </CSSTransitionGroup>
    )
)

@extend({
    connect: (state, ownProps) => ({
        filterInput: state.shipList[ownProps.id]
            ? state.shipList[ownProps.id].filterInput
            : undefined,
    })
})
class BodyFiltered extends React.Component {
    get show() {
        return Boolean(
            this.props.show &&
            typeof this.props.filterInput !== 'undefined' &&
            this.props.filterInput !== ''
        )
    }

    updateKeyScope() {
        if (this.show) {
            hotkeys.setScope(KEY_SHIPLIST_SEARCH_RESULT_NAVIGATE)
        } else {
            hotkeys.setScope('all')
        }
    }
    focusItem(direction = 1) {
        const items = Array.from(this._list.querySelectorAll('.item'))
        const active = document.activeElement
        const activeIndex = items.indexOf(active)
        let newIndex

        if (activeIndex > -1) {
            newIndex = activeIndex + (direction > 0 ? 1 : -1)
        } else {
            if (direction > 0) newIndex = 0
            else newIndex = items.length - 1
        }

        if (newIndex < 0) newIndex = items.length - 1
        if (newIndex >= items.length) newIndex = 0
        items[newIndex].focus()
    }

    componentDidMount() {
        hotkeys('down, right', {
            scope: KEY_SHIPLIST_SEARCH_RESULT_NAVIGATE
        }, () => {
            this.focusItem(1)
            return false
        })
        hotkeys('up, left', {
            scope: KEY_SHIPLIST_SEARCH_RESULT_NAVIGATE
        }, () => {
            this.focusItem(-1)
            return false
        })
        this.updateKeyScope()
    }
    componentDidUpdate(prevProps/*, prevState*/) {
        this.updateKeyScope()
        if (prevProps.filterInput !== this.props.filterInput)
            window.scrollTo(undefined, 0)
    }
    componentWillUnmount() {
        hotkeys.deleteScope(KEY_SHIPLIST_SEARCH_RESULT_NAVIGATE)
    }

    render() {
        const show = this.show
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
                        <div className="results" ref={el => this._list = el}>
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

@extend({
    connect: (state, ownProps) => {
        const {
            collection,
        } = state.shipList[ownProps.id] || {}
        return {
            collection,
        }
    }
})
class BodyCollections extends React.Component {
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
