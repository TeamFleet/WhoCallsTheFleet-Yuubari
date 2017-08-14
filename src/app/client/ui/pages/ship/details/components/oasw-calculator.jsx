import React from 'react'

import ComponentContainer from '@appUI/containers/infos-component'
import Special from '../commons/special.jsx'
import CalculatorLevelOASW from '@appUI/components/calculator/level-oasw'

import translate from 'sp-i18n'

import { ImportStyle } from 'sp-css-import'
import styles from './oasw-calculator.less'

// @connect()
@ImportStyle(styles)
export default class ShipDetailsCalculatorOASW extends React.Component {
    render() {
        return (
            <ComponentContainer className={this.props.className} title={translate("oasw_calculator.title")}>
                <CalculatorLevelOASW
                    className="calculator"
                    ship={this.props.ship}

                    componentUnknown={
                        <Special
                            className="special"
                            title={translate("oasw_calculator.unknown")}
                            level={-1}
                        />
                    }
                    componentUnable={
                        <Special
                            className="special"
                            title={translate("oasw_calculator.unable")}
                            level={0}
                        />
                    }
                    componentAlways={
                        <Special
                            className="special"
                            title={translate("oasw_calculator.always")}
                            level={2}
                        />
                    }
                />
            </ComponentContainer>
        )
    }
}