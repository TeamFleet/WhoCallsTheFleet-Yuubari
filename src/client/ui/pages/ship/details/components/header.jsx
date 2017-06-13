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
                    <Title tag="h1" className="shipname">{this.props.ship._name}</Title>
                    <span className="shipname-ja">
                        {localeId === 'ja'
                            ? ""
                            : this.props.ship.getName(undefined, 'ja_jp')
                        }
                    </span>
                    <span>No.{this.props.ship.getNo()}</span>
                    {this.props.ship.class_no
                        ? translate("shipclass_number", { class: this.props.ship._class, number: this.props.ship.class_no })
                        : translate("shipclass", { class: this.props.ship._class })
                    }
                    {this.props.ship.class && this.props.ship.type && ` / ${this.props.ship._type}`}
                </div>
                <div className="tabs">
                </div>
            </div>
        )
    }
}