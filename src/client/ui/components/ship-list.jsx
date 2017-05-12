import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import translate from 'sp-i18n'
import db, { locale as dbLocaleId } from '../../logic/database'
import shipList from '../../logic/database/list-ships.js'

import MainHeader from './main-header.jsx'

import { ImportStyle } from 'sp-css-import'
import style from './ship-list.less'

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
                <h3>{collection.name[dbLocaleId]}</h3>
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

import styleHeader from './ship-list-header.less'
@ImportStyle(styleHeader)
class ShipListHeader extends React.Component {
    render() {
        return (
            <MainHeader>
                <div className={this.props.className}>
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
            </MainHeader>
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