import React from 'react'
// import { connect } from 'react-redux'
import translate, { localeId } from 'sp-i18n'
import { ImportStyle } from 'sp-css-import'
import db from '@appLogic/database'
// import {
//     changeTab as shipDetailsChangeTab,
//     TABINDEX
// } from '@appLogic/infospage/api'
// import { getInfosId } from '../../details'
import getLink from '@appUtils/get-link'

import Header from '@appUI/components/main-header/infos'

// @connect((state, ownProps) => state.infosPage[getInfosId(ownProps.ship.id)] || {})
@ImportStyle(require('./header.less'))
export default class ShipDetailsHeader extends React.Component {
    onTabChange(tabId, tabIndex) {
        if (typeof this.props.onTabChange === 'function')
            this.props.onTabChange(tabId, tabIndex)
        // this.props.dispatch(
        //     shipDetailsChangeTab(getInfosId(this.props.ship.id), tabIndex)
        // )
    }

    getShipType() {
        if (this.props.ship.type && this.props.ship.type_display && this.props.ship.type !== this.props.ship.type_display)
            // return db.shipTypes[this.props.ship.type_display]._name + ' (' + this.props.ship._type + ')'
            return db.shipTypes[this.props.ship.type_display]._name
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
        if (!this.props.ship) return null
        return (
            <Header
                className={this.props.className}
                title={this.props.ship._name}
                subtitle={this.getShipType()}
                tabs={this.getTabs()}
                urlBase={getLink('ship', this.props.ship.id)}
                defaultIndex={this.props.defaultTabIndex}
                onTabChange={this.onTabChange.bind(this)}
            >
                <span className="shipclassnumber">No.{this.props.ship.getNo()}</span>
                <br />
                {this.props.ship.class_no
                    ? translate("shipclass_number", { class: this.props.ship._class, number: this.props.ship.class_no })
                    : translate("shipclass", { class: this.props.ship._class })
                }
                {/*
                {localeId === 'ja' && <br />}
                {this.props.ship.class_no
                    ? translate("shipclass_number", { class: this.props.ship._class, number: this.props.ship.class_no })
                    : translate("shipclass", { class: this.props.ship._class })
                }
                {localeId !== 'ja' && <span className="shipname-ja">{this.props.ship.getName(undefined, 'ja_jp')}</span>}
                */}
                {/* this.props.ship.class && this.props.ship.type && ` / ${this.getShipType()}` */}
            </Header>
        )
    }
}