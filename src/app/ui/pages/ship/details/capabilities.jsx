import React from 'react'

import CombatSpecial from './components/combat-special.jsx'
import OtherSpecial from './components/other-special.jsx'
import AACI from './components/aaci.jsx'
import OASWCalculator from './components/oasw-calculator.jsx'
import SpeedUpCalculator from './components/speedup-calculator.jsx'

// import CenterContainer from '@ui/containers/center'

// import db from '@api/database'

import { ImportStyle } from 'sp-css-import'
import styles from './capabilities.less'

// @connect()
@ImportStyle(styles)
export default class ShipDetailsContentCapabilities extends React.Component {
    render() {
        return (
            <div className={this.props.className}>
                <div className="wrapper">
                    <CombatSpecial ship={this.props.ship} className="shipinfo shipinfo-combat" />
                    <OtherSpecial ship={this.props.ship} className="shipinfo shipinfo-special" />
                    <AACI ship={this.props.ship} className="shipinfo shipinfo-aaci" />
                    <SpeedUpCalculator ship={this.props.ship} className="shipinfo shipinfo-speedup" />
                    <OASWCalculator ship={this.props.ship} className="shipinfo shipinfo-oasw" />
                </div>
            </div>
        )
    }
}
