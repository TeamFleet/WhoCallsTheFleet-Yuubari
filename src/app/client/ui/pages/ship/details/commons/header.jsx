import React from 'react'
import { connect } from 'react-redux'
import { Link, IndexLink } from 'react-router'
import classNames from 'classnames'

import translate, { localeId } from 'sp-i18n'
import db from '@appLogic/database'
import {
    changeTab as shipDetailsChangeTab
} from '@appLogic/ship-details/api'
import getLink from '@appUtils/get-link'

import Header from '@appUI/containers/infos-header'

import { ImportStyle } from 'sp-css-import'
import styles from './header.less'

@connect((state, ownProps) => state.shipDetails[ownProps.ship.id])
@ImportStyle(styles)
export default class ShipDetailsHeader extends React.Component {
    onTabChange(tabId, tabIndex) {
        if (typeof this.props.onTabChange === 'function')
            this.props.onTabChange(tabId, tabIndex)
        this.props.dispatch(shipDetailsChangeTab(this.props.ship.id, tabIndex))
    }

    getShipType() {
        if (this.props.ship.type && this.props.ship.type_display && this.props.ship.type !== this.props.ship.type_display)
            return db.shipTypes[this.props.ship.type_display]._name + ' (' + this.props.ship._type + ')'
        if (this.props.ship.type)
            return this.props.ship._type
        return ''
    }

    getTabs() {
        if (!Array.isArray(this.props.tabs)) return []
        return this.props.tabs.map(tabId => ({
            tabId,
            tabName: translate("ship_details." + tabId)
        }))
    }

    render() {
        return (
            <Header
                className={this.props.className}
                title={this.props.ship._name}
                tabs={this.getTabs()}
                urlBase={getLink('ship', this.props.ship.id)}
                currentIndex={this.props.tabIndex}
                onTabChange={this.onTabChange.bind(this)}
            >
                {localeId !== 'ja' && <span className="shipname-ja">{this.props.ship.getName(undefined, 'ja_jp')}</span>}
                <span className="shipclassnumber">No.{this.props.ship.getNo()}</span>
                {localeId === 'ja' && <br />}
                {this.props.ship.class_no
                    ? translate("shipclass_number", { class: this.props.ship._class, number: this.props.ship.class_no })
                    : translate("shipclass", { class: this.props.ship._class })
                }
                {this.props.ship.class && this.props.ship.type && ` / ${this.getShipType()}`}
            </Header>
        )
    }
}