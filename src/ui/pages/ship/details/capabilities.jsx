import React from 'react'
import { extend } from 'koot'

import SpecialCapability from './components/special-capability'
import CombatSpecial from './components/combat-special'
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
                <SpecialCapability ship={props.ship} className="shipinfo shipinfo-special-capability" />
                <CombatSpecial ship={props.ship} className="shipinfo shipinfo-combat" />
                <AACI ship={props.ship} className="shipinfo shipinfo-aaci" />
                <OASWCalculator ship={props.ship} className="shipinfo shipinfo-oasw" />
                <SpeedUpCalculator ship={props.ship} className="shipinfo shipinfo-speedup" />
            </div>
        </div>
    )
)
export default ShipDetailsContentCapabilities
