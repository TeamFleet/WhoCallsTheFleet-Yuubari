import React from 'react'
import { extend } from 'koot'

import db from '@database'
// import {
//     changeTab as shipDetailsChangeTab,
//     TABINDEX
// } from '@api/pages'
// import { getInfosId } from '../../details'
import getLink from '@utils/get-link'

import Header from '@ui/components/main-header/infos'

const getShipType = (ship) => {
    if (ship.type && ship.type_display && ship.type !== ship.type_display)
        // return db.shipTypes[ship.type_display]._name + ' (' + ship._type + ')'
        return db.shipTypes[ship.type_display]._name
    if (ship.type)
        return ship._type
    return ''
}

const getStrShipClass = (ship) => {
    if (ship.class_no)
        return __("shipclass_number", { "class": ship._class, number: ship.class_no })
    return __("shipclass", { "class": ship._class })
}

// @connect((state, ownProps) => state.pages[getInfosId(ownProps.ship.id)] || {})
const ShipDetailsHeader = extend({
    styles: require('./header.less')
})(
    ({
        className,
        ship,
        tabs, defaultTabIndex,
        onTabChange,
        // dispatch
    }) => {
        if (!ship) return null
        return (
            <Header
                className={className}
                title={ship._name}
                subtitle={getShipType(ship)}
                tabs={(() => {
                    if (!Array.isArray(tabs)) return []
                    return tabs.map(tabId => ({
                        tabId,
                        tabName: __("ship_details", tabId)
                    }))
                })()}
                urlBase={getLink('ship', ship.id)}
                defaultIndex={defaultTabIndex}
                onTabChange={(tabId, tabIndex) => {
                    if (typeof onTabChange === 'function')
                        onTabChange(tabId, tabIndex)
                    // dispatch(
                    //     shipDetailsChangeTab(getInfosId(ship.id), tabIndex)
                    // )
                }}
            >
                <span className="shipclassnumber">No.{ship.getNo()}</span>
                <br />
                {getStrShipClass(ship)}
                {/*
                {localeId === 'ja' && <br />}
                {ship.class_no
                    ? __("shipclass_number", { class: ship._class, number: ship.class_no })
                    : __("shipclass", { class: ship._class })
                }
                {localeId !== 'ja' && <span className="shipname-ja">{ship.getName(undefined, 'ja_jp')}</span>}
                */}
                {/* ship.class && ship.type && ` / ${this.getShipType()}` */}
            </Header>
        )
    }
)





// ============================================================================





export default ShipDetailsHeader
