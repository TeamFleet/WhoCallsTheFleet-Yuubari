import React from 'react'

import checkOASW from 'kckit/src/check/oasw'

import db from 'Logic/database'

import ComponentContainer from '../commons/component-container.jsx'
import Special from '../commons/special.jsx'

import translate from 'sp-i18n'

// import { ImportStyle } from 'sp-css-import'
// import styles from './combat-special.less'

// @connect()
// @ImportStyle(styles)
export default class ShipDetailsCalculatorOASW extends React.Component {
    render() {
        const oaswTable = checkOASW(this.props.ship.id) || []
        const canAlways = oaswTable === true
        const canOASW = canAlways || (Array.isArray(oaswTable) && oaswTable.length) ? true : false
        return (
            <ComponentContainer className={this.props.className} title={translate("ship_details.oasw_calculator")}>
                {!canOASW && <Special
                    title={translate("ship_details.oasw_unable")}
                    level={0}
                />}
                {canOASW && canAlways && <Special
                    title={translate("ship_details.can_always_perform")}
                    level={2}
                />}
            </ComponentContainer>
        )
    }
}