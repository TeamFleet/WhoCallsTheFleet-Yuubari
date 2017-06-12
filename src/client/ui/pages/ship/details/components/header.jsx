import React from 'react'
// import { connect } from 'react-redux'
import { Link } from 'react-router'

import translate, { localeId } from 'sp-i18n'
// import db from 'Logic/database'

import Title from 'UI/components/title.jsx'

import { ImportStyle } from 'sp-css-import'
import styles from './header.less'

// @connect()
@ImportStyle(styles)
export default class ShipDetailsHeader extends React.Component {
    render() {
        return (
            <div className={this.props.className}>
                <div className="infos">
                    {localeId !== 'ja' && <span className="shipname-ja">{this.props.ship.getName(undefined, 'ja_jp')}</span>}
                    <Title tag="h1" className="shipname">{this.props.ship._name}</Title>
                    <div className="sub">
                        <span>No.{this.props.ship.no}</span>
                        {this.props.ship.class && translate("shipclass", { class: this.props.ship._class })}
                        {this.props.ship.class_no && `${this.props.ship.class_no}号舰`}
                        {this.props.ship.class && this.props.ship.type && ` / ${this.props.ship._type}`}
                    </div>
                </div>
                <div className="tabs">
                </div>
            </div>
        )
    }
}