import React from 'react'
import { extend } from 'koot'

import CombatSpecial from './components/combat-special.jsx'
import OtherSpecial from './components/other-special.jsx'
import AACI from './components/aaci.jsx'
import OASWCalculator from './components/oasw-calculator.jsx'
import SpeedUpCalculator from './components/speedup-calculator.jsx'

// import CenterContainer from '@ui/containers/center'

// import db from '@database'

const ShipDetailsContentCapabilities = extend({
    styles: require('./capabilities.less')
})(
    (props) => (
        <div className={props.className}>
            <div className="wrapper">
                <CombatSpecial ship={props.ship} className="shipinfo shipinfo-combat" />
                <OtherSpecial ship={props.ship} className="shipinfo shipinfo-special" />
                <AACI ship={props.ship} className="shipinfo shipinfo-aaci" />
                <SpeedUpCalculator ship={props.ship} className="shipinfo shipinfo-speedup" />
                <OASWCalculator ship={props.ship} className="shipinfo shipinfo-oasw" />
            </div>
        </div>
    )
)
export default ShipDetailsContentCapabilities
