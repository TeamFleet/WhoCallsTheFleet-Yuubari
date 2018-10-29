import React from 'react'
// import { connect } from 'react-redux'
// import { ImportStyle } from 'sp-css-import'
import { extend } from 'koot'

import db from '@api/database'
// import {
//     changeTab as shipDetailsChangeTab,
//     TABINDEX
// } from '@api/pages'
// import { getInfosId } from '../../details'
import getLink from '@utils/get-link'

import Header from '@ui/components/main-header/infos'

// @connect((state, ownProps) => state.pages[getInfosId(ownProps.ship.id)] || {})
@extend({
    styles: require('./header.less')
})
class ShipDetailsHeader extends React.Component {
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
            tabName: __("ship_details", tabId)
        }))
    }

    getStrShipClass() {
        if (this.props.ship.class_no)
            return __("shipclass_number", { class: this.props.ship._class, number: this.props.ship.class_no })
        return __("shipclass", { class: this.props.ship._class })
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
                {this.getStrShipClass()}
                {/*
                {localeId === 'ja' && <br />}
                {this.props.ship.class_no
                    ? __("shipclass_number", { class: this.props.ship._class, number: this.props.ship.class_no })
                    : __("shipclass", { class: this.props.ship._class })
                }
                {localeId !== 'ja' && <span className="shipname-ja">{this.props.ship.getName(undefined, 'ja_jp')}</span>}
                */}
                {/* this.props.ship.class && this.props.ship.type && ` / ${this.getShipType()}` */}
            </Header>
        )
    }
}





// ============================================================================





export default ShipDetailsHeader
