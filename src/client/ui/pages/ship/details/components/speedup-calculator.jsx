import React from 'react'

import ComponentContainer from '@appUI/containers/infos-component'
import CalculatorSpeed from '@appUI/components/calculator/speed'

import { ImportStyle } from 'sp-css-import'
import styles from './speedup-calculator.less'

// @connect()
@ImportStyle(styles)
export default class ShipDetailsCalculatorSpeedUp extends React.Component {
    render() {
        return (
            <ComponentContainer className={this.props.className} title={__("speed_calculator.title")}>
                <CalculatorSpeed className="calculator" ship={this.props.ship} />
            </ComponentContainer>
        )
    }
}
