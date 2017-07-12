import React from 'react'
import { Link } from 'react-router'

import Remodels from './components/remodels.jsx'
import QuickFacts from './components/quickfacts.jsx'
import Stats from './components/stats.jsx'
import SlotEquipments from './components/slot-equipments.jsx'
import Illust from './components/illust.jsx'
import Modernization from './components/modernization.jsx'
import Dismantle from './components/dismantle.jsx'

// import translate from 'sp-i18n'
// import db from 'Logic/database'

import { ImportStyle } from 'sp-css-import'
import styles from './infos.less'

// @connect()
@ImportStyle(styles)
export default class ShipDetailsContentInfos extends React.Component {
    render() {
        return (
            <div className={this.props.className}>
                <Illust ship={this.props.ship} className="shipinfo shipinfo-illust" />
                <QuickFacts ship={this.props.ship} className="shipinfo shipinfo-facts" />
                <Stats ship={this.props.ship} className="shipinfo shipinfo-stats" />
                <SlotEquipments ship={this.props.ship} className="shipinfo shipinfo-equipments" />
                <Modernization ship={this.props.ship} className="shipinfo shipinfo-modernization" />
                <Dismantle ship={this.props.ship} className="shipinfo shipinfo-dismantle" />
                {/* 合成提供属性 */}
                {/* 分解获得资源 */}
                <Remodels ship={this.props.ship} className="shipinfo shipinfo-remodels" />
            </div>
        )
    }
}