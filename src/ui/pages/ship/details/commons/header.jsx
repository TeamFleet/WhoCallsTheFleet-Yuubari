import React from 'react';
import { extend } from 'koot';

// import {
//     changeTab as shipDetailsChangeTab,
//     TABINDEX
// } from '@api/pages'
// import { getInfosId } from '../../details'
import getLink from '@utils/get-link';
import getShipTypeName from '@utils/get-ship-type-name';
import getShipClassNameAndNumber from '@utils/get-ship-class-name-and-number';

import Header from '@ui/components/main-header/infos';

// @connect((state, ownProps) => state.pages[getInfosId(ownProps.ship.id)] || {})
const ShipDetailsHeader = extend({
    styles: require('./header.less')
})(({ className, ship, tabs, defaultTabIndex, onTabChange }) => {
    // dispatch
    if (!ship) return null;
    return (
        <Header
            className={className}
            title={ship._name}
            subtitle={getShipTypeName(ship)}
            tabs={(() => {
                if (!Array.isArray(tabs)) return [];
                return tabs.map(tabId => ({
                    tabId,
                    tabName: __('ship_details', tabId)
                }));
            })()}
            urlBase={getLink('ship', ship.id)}
            defaultIndex={defaultTabIndex}
            onTabChange={(tabId, tabIndex) => {
                if (typeof onTabChange === 'function')
                    onTabChange(tabId, tabIndex);
                // dispatch(
                //     shipDetailsChangeTab(getInfosId(ship.id), tabIndex)
                // )
            }}
        >
            <span className="shipclassnumber">No.{ship.getNo()}</span>
            <br />
            {getShipClassNameAndNumber(ship)}
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
    );
});

// ============================================================================

export default ShipDetailsHeader;
