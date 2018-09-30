import React from 'react'
import { wrapper } from 'koot'
// import { Link } from 'react-router'

import Remodels from './components/remodels.jsx'
import QuickFacts from './components/quickfacts.jsx'
import Stats from './components/stats.jsx'
import SlotEquipments from './components/slot-equipments.jsx'
import Illust from './components/illust.jsx'
import Modernization from './components/modernization.jsx'
import Dismantle from './components/dismantle.jsx'

// import db from '@api/database'

const ShipDetailsInfos = wrapper({
    styles: require('./infos.less')
})(({
    className,
    ship
}) =>
    <div className={className}>
        <Illust
            ship={ship}
            className="shipinfo shipinfo-illust"
        // defaultIndex={this.props.illustIndex}
        // onIndexChange={this.props.onIllustChange}
        />
        <QuickFacts ship={ship} className="shipinfo shipinfo-facts" />
        <Stats ship={ship} className="shipinfo shipinfo-stats" />
        <SlotEquipments ship={ship} className="shipinfo shipinfo-equipments" />
        <div className="shipinfo shipinfo-misc">
            <Modernization ship={ship} className="shipinfo shipinfo-modernization" />
            <Dismantle ship={ship} className="shipinfo shipinfo-dismantle" />
        </div>
        <Remodels ship={ship} className="shipinfo shipinfo-remodels" />
    </div>
)

export default ShipDetailsInfos
