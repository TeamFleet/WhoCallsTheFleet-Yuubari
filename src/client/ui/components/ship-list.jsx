import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import translate from 'sp-i18n'
import db, { locale as dbLocaleId } from '../../logic/database'
import shipListFilter from '../../logic/database/list-ships-filter.js'

import MainHeader from './main-header.jsx'

import { ImportStyle } from 'sp-css-import'
import style from './ship-list/main.less'

@connect()
@ImportStyle(style)
export default class extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            collection: this.props.collection || 0
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
                collectionFilterd: result
            })
        } else if (evt.target.value === "") {
            this.setState({
                collection: this.lastCollection || 0,
                collectionFilterd: null
            })
        }
    }

    renderCollection(collection) {
        return (
            <div>
                {collection.list.map((type, index2) => (
                    <div key={index2}>
                        {type.type ? (<h5>[{db.shipTypes[type.type].code}] {db.shipTypes[type.type].full_zh}</h5>) : (<h5>--</h5>)}
                        <ul>
                            {type.ships.map((ships, index3) => (
                                <li key={index2 + '-' + index3}>
                                    {ships.map((ship, index4) => (
                                        <span key={index2 + '-' + index3 + '-' + index4}>
                                            <Ship ship={ship} />
                                            {index4 < ships.length - 1 ? "　|　" : null}
                                        </span>
                                    ))}
                                </li>
                            ))}
                        </ul>
                        <div></div>
                    </div>
                ))}
            </div>
        )
    }

    renderFilteredResult() {
        if (!this.state.collectionFilterd || !this.state.collectionFilterd.length) return null
        return (
            <ul>
                {this.state.collectionFilterd.map((ship, index) => (
                    <li key={index}>
                        <Ship ship={ship} />
                    </li>
                ))}
            </ul>
        )
    }

    render() {
        return (
            <div className={this.props.className}>
                {__CLIENT__ && <ShipListHeader
                    callbacks={{
                        onCollectionChange: this.onCollectionChange.bind(this),
                        onFilterInput: this.onFilterInput.bind(this)
                    }}
                    collection={this.state.collection}
                />}

                {__CLIENT__ && this.state.collection > -1 && this.renderCollection(db.shipCollections[this.state.collection])}
                {__CLIENT__ && this.state.collection < 0 && this.renderFilteredResult()}
                {__SERVER__ && db.shipCollections.map(this.renderCollection)}

            </div>
        )
    }
}

class Ship extends React.Component {
    render() {
        return (
            <Link to={'/ships/' + this.props.ship.id}>
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
                <div className={this.props.className}>
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
            <span
                onClick={this.onClick.bind(this)}
                className={'item' + this.props.className}
            >
                {this.props.children}
            </span>
        )
    }
}

import styleHeaderFilter from './ship-list/filter.less'
@ImportStyle(styleHeaderFilter)
class ShipListFilter extends React.Component {
    filterOnInput(evt) {
        this.props.callbacks.onFilterInput(evt)
    }
    render() {
        return (
            <div className={this.props.className}>
                <input type="text" onInput={this.filterOnInput.bind(this)} />
            </div>
        )
    }
}