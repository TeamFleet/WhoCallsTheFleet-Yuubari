import React from 'react'

import ComponentContainer from '../commons/component-container.jsx'
import CalculatorSpeed from 'UI/components/calculator-speed'

import translate from 'sp-i18n'

import { ImportStyle } from 'sp-css-import'
import styles from './speedup-calculator.less'

// @connect()
@ImportStyle(styles)
export default class ShipDetailsCalculatorSpeedUp extends React.Component {
    render() {
        return (
            <ComponentContainer className={this.props.className} title={translate("speed_calculator.title")}>
                <CalculatorSpeed className="calculator" ship={this.props.ship} />
            </ComponentContainer>
        )
    }
}