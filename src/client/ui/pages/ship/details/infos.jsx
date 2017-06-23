import React from 'react'
import { Link } from 'react-router'

import Remodels from './components/remodels.jsx'
import QuickFacts from './components/quickfacts.jsx'
import Stats from './components/stats.jsx'
import SlotEquipments from './components/slot-equipments.jsx'
import Illust from './components/illust.jsx'

import translate from 'sp-i18n'
import db from 'Logic/database'

import { ImportStyle } from 'sp-css-import'
import styles from './infos.less'

// @connect()
@ImportStyle(styles)
export default class ShipDetailsContentInfos extends React.Component {
    render() {
        return (
            <div className={this.props.className}>
                <QuickFacts ship={this.props.ship} className="shipinfo shipinfo-facts" />
                <Stats ship={this.props.ship} className="shipinfo shipinfo-stats" />
                <SlotEquipments ship={this.props.ship} className="shipinfo shipinfo-equipments" />
                <Remodels ship={this.props.ship} className="shipinfo shipinfo-remodels" />
                <Illust ship={this.props.ship} className="shipinfo shipinfo-illust" />
            </div>
        )
    }
}