import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import translate from 'sp-i18n'
import db, { locale as dbLocaleId } from '../../logic/database'
import shipList from '../../logic/database/list-ships.js'

import MainHeader from './main-header.jsx'

import { ImportStyle } from 'sp-css-import'
import style from './ship-list/main.less'

@connect()
@ImportStyle(style)
export default class extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            collection: 0
        }
    }

    changeCollection(to) {
        this.setState({
            collection: to
        })
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
                                            <Link to={'/ships/' + ship.id}>
                                                [{ship.id}] {ship._name}
                                            </Link>
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

    render() {
        return (
            <div className={this.props.className}>
                {__CLIENT__ && <ShipListHeader
                    callbacks={{
                        changeCollection: this.changeCollection.bind(this)
                    }}
                    collection={this.state.collection}
                />}

                {__CLIENT__ && this.renderCollection(shipList[this.state.collection])}
                {__SERVER__ && shipList.map(this.renderCollection)}

            </div>
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
                    <ShipListTabs collection={this.props.collection} callbacks={this.props.callbacks} />
                </div>
            </MainHeader>
        )
    }
}

import styleHeaderTabs from './ship-list/header-tabs.less'
@ImportStyle(styleHeaderTabs)
class ShipListTabs extends React.Component {
    // constructor(props){
    //     super(props)
    //     this.state = {
    //         collection: this.props.collection
    //     }
    // }
    // componentWillReceiveProps(newProps) {
    //     this.setState({
    //         collection: newProps.collection
    //     })
    // }
    onSelectChange(evt) {
        // console.log(evt.target.value)
        this.props.callbacks.changeCollection(parseInt(evt.target.value))
    }
    render() {
        return (
            <div className={this.props.className}>
                <label className="select">
                    <select className="select-select" onChange={this.onSelectChange.bind(this)} value={this.props.collection}>
                        {shipList.map((collection, index) => (
                            <option
                                key={index}
                                value={index}
                            >
                                {collection.name[dbLocaleId]}
                            </option>
                        ))}
                    </select>
                    {shipList[this.props.collection].name[dbLocaleId]}
                </label>
                {shipList.map((collection, index) => (
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
    onClick() {
        this.props.callbacks.changeCollection(this.props.collection)
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