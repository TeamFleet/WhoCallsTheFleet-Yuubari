import React from 'react'

import ComponentContainer from '@appUI/containers/infos-component'
import Bullet from '@appUI/components/bullet'
import CalculatorLevelOASW from '@appUI/components/calculator/level-oasw'

import { ImportStyle } from 'sp-css-import'
import styles from './oasw-calculator.less'

// @connect()
@ImportStyle(styles)
export default class ShipDetailsCalculatorOASW extends React.Component {
    render() {
        return (
            <ComponentContainer className={this.props.className} title={__("oasw_calculator.title")}>
                <CalculatorLevelOASW
                    className="calculator"
                    ship={this.props.ship}

                    componentUnknown={
                        <Bullet
                            className="special"
                            title={__("oasw_calculator.unknown")}
                            level={-1}
                        />
                    }
                    componentUnable={
                        <Bullet
                            className="special"
                            title={__("oasw_calculator.unable")}
                            level={0}
                        />
                    }
                    componentAlways={
                        <Bullet
                            className="special"
                            title={__("oasw_calculator.always")}
                            level={2}
                        />
                    }
                />
            </ComponentContainer>
        )
    }
}
