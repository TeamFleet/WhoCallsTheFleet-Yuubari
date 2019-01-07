import React from 'react'
import { extend } from 'koot'

import CombatSpecial from './components/combat-special'
import OtherSpecial from './components/other-special'
import AACI from './components/aaci'
import OASWCalculator from './components/oasw-calculator'
import SpeedUpCalculator from './components/speedup-calculator'
import UnderConstruction from '@ui/components/under-construction'

// import CenterContainer from '@ui/containers/center'

// import db from '@database'

const ShipDetailsContentCapabilities = extend({
    styles: require('./capabilities.less')
})(
    (props) => (
        <div className={props.className}>
            <div className="wrapper">
                <div className="under-construction">
                    <UnderConstruction component="div" />
                </div>
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
