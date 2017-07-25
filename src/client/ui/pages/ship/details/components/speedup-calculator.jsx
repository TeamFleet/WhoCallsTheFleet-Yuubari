import React from 'react'

import ComponentContainer from '../commons/component-container.jsx'
import CalculatorSpeed from 'UI/components/calculator-speed'

import translate from 'sp-i18n'

// import { ImportStyle } from 'sp-css-import'
// import styles from './combat-special.less'

// @connect()
// @ImportStyle(styles)
export default class ShipDetailsCalculatorSpeedUp extends React.Component {
    render() {
        return (
            <ComponentContainer className={this.props.className} title={translate("ship_details.speedup_calculator")}>
                <CalculatorSpeed ship={this.props.ship} />
            </ComponentContainer>
        )
    }
}