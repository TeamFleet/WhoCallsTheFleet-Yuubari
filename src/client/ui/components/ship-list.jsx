import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import translate from 'sp-i18n'
import db, { locale as dbLocaleId } from '../../logic/database'
import shipListFilter from '../../logic/database/list-ships-filter.js'
import pref from '../../logic/preferences'

import MainHeader from './main-header.jsx'
import Icon from './icon.jsx'

import { ImportStyle } from 'sp-css-import'
import style from './ship-list/main.less'

@connect()
@ImportStyle(style)
export default class extends React.Component {
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
        return (
            <div key={index}>
                {collection.list.map((type, index2) => (
                    <div key={index2}>
                        {type.type && (!type.class || !index2) ? (<Title type={type.type} />) : null}
                        {!type.type && (<Title />)}
                        {type.class && (<SubTitle class={type.class} />)}
                        <ShipList ships={type.ships} showAll={!type.type} />
                    </div>
                ))}
            </div>
        )
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
                {<ShipList ships={this.state.filteredResult} />}
            </div>
        )
    }

    componentDidUpdate(prevProps, prevState) {
        if( prevState.collection !== this.state.collection )
            window.scrollTo(undefined, 0)
    }

    render() {
        return (
            <div className={this.props.className}>
                {__CLIENT__ && <ShipListHeader
                    callbacks={{
                        onCollectionChange: this.onCollectionChange.bind(this),
                        onFilterInput: this.onFilterInput.bind(this),
                        enterFilter: this.enterFilter.bind(this),
                        leaveFilter: this.leaveFilter.bind(this)
                    }}
                    collection={this.state.collection}
                    filtering={this.state.filtering}
                />}

                {__CLIENT__ && this.state.collection > -1 && this.renderCollection(db.shipCollections[this.state.collection])}
                {__CLIENT__ && this.state.collection < 0 && this.renderFilteredResult()}
                {__SERVER__ && db.shipCollections.map(this.renderCollection)}

            </div>
        )
    }
}

import styleTitle from './ship-list/title.less'
@ImportStyle(styleTitle)
class Title extends React.Component {
    render() {
        if (this.props.type) {
            const type = db.shipTypes[this.props.type]
            return (
                <h4 className={this.props.className}>
                    {type.full_zh}
                    {type.code && (<small className="code">[{type.code}]</small>)}
                </h4>
            )
        } else
            return (
                <h4 className={this.props.className}>--</h4>
            )
    }
}

import styleSubTitle from './ship-list/title-sub.less'
@ImportStyle(styleSubTitle)
class SubTitle extends React.Component {
    render() {
        return (
            <h5 className={this.props.className}>
                {translate("shipclass", { class: db.shipClasses[this.props.class].name_zh })}
            </h5>
        )
    }
}

import styleList from './ship-list/list.less'
@ImportStyle(styleList)
class ShipList extends React.Component {
    // getList() {
    //     let list = []
    // }
    insertPlaceHolders() {
        let i = 0;
        let arr = []
        while (i++ < 10) arr.push(<span className="item placeholder" key={i}></span>)
        return arr
    }

    checkLastRemodelLoop(ships, index) {
        while (ships[index].remodel && ships[index].remodel.next_loop)
            index++
        return index === ships.length - 1
    }

    render() {
        return (
            <div className={this.props.className}>
                {this.props.ships.map((ships, index) => {
                    if (Array.isArray(ships))
                        return ships.map((ship, index2) => {
                            if (!this.props.showAll
                                && !pref.shipListShowAllShips
                                && index2 < ships.length - 1
                                && !this.checkLastRemodelLoop(ships, index2)
                            )
                                return null
                            return (<Ship className="item" ship={ship} key={index + '-' + index2} />)
                        })
                    return (<Ship className="item" ship={ships} key={index} />)
                })}
                {this.insertPlaceHolders()}
            </div>
        )
    }
}

class Ship extends React.Component {
    render() {
        return (
            <Link className={this.props.className} to={'/ships/' + this.props.ship.id}>
                [{this.props.ship.id}] {this.props.ship._name}
            </Link>
        )
    }
}

import styleHeader from './ship-list/header.less'
@ImportStyle(styleHeader)
class ShipListHeader extends React.Component {
    render() {
        return (
            <MainHeader>
                <div className={this.props.className + (this.props.filtering ? ' is-filtering' : '')}>
                    <ShipListFilter callbacks={this.props.callbacks} />
                    <ShipListTabs collection={this.props.collection} callbacks={this.props.callbacks} />
                </div>
            </MainHeader>
        )
    }
}

import styleHeaderTabs from './ship-list/header-tabs.less'
@ImportStyle(styleHeaderTabs)
class ShipListTabs extends React.Component {
    onSelectChange(evt) {
        this.props.callbacks.onCollectionChange(evt, parseInt(evt.target.value))
    }
    render() {
        return (
            <div className={this.props.className}>
                <label className="select">
                    <select className="select-select" onChange={this.onSelectChange.bind(this)} value={this.props.collection}>
                        {db.shipCollections.map((collection, index) => (
                            <option
                                key={index}
                                value={index}
                            >
                                {collection.name[dbLocaleId]}
                            </option>
                        ))}
                    </select>
                    {this.props.collection > -1 && db.shipCollections[this.props.collection].name[dbLocaleId]}
                </label>
                {db.shipCollections.map((collection, index) => (
                    <ShipListTabItem
                        key={index}
                        className={this.props.collection === index ? ' on' : ''}
                        collection={index}
                        callbacks={this.props.callbacks}
                    >
                        {collection.name[dbLocaleId]}
                    </ShipListTabItem>
                ))}
            </div>
        )
    }
}

class ShipListTabItem extends React.Component {
    onClick(evt) {
        this.props.callbacks.onCollectionChange(evt, this.props.collection)
    }

    render() {
        return (
            <a href="javascript:;"
                onClick={this.onClick.bind(this)}
                className={'item' + this.props.className}
            >
                {this.props.children}
            </a>
        )
    }
}

import styleHeaderFilter from './ship-list/filter.less'
@ImportStyle(styleHeaderFilter)
class ShipListFilter extends React.Component {
    onInput(evt) {
        this.props.callbacks.onFilterInput(evt)
    }

    onFocus() {
        this.props.callbacks.enterFilter()
    }

    onBlur(evt) {
        if (evt.target.value === '')
            this.props.callbacks.leaveFilter()
    }

    onCloseClick(evt) {
        this.el.value = ""
        this.el.dispatchEvent(new Event('input', { bubbles: true }))
        this.el.dispatchEvent(new Event('blur', { bubbles: true }))
        // evt.currentTarget.dispatchEvent(new Event('blur', { bubbles: true }))
    }

    render() {
        return (
            <div className={this.props.className}>
                <Icon className="icon-search" icon="search" />
                <button className="close" onClick={this.onCloseClick.bind(this)}><Icon className="icon-close" icon="cross" /></button>
                <input
                    className="input"
                    type="text"
                    placeholder={translate('ship_list.filter.placeholder')}
                    onInput={this.onInput.bind(this)}
                    onFocus={this.onFocus.bind(this)}
                    onBlur={this.onBlur.bind(this)}
                    ref={(c) => this.el = c}
                />
            </div>
        )
    }
}