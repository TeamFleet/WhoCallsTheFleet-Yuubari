import React from 'react'
import { Link } from 'react-router'

import Remodels from './components/remodels.jsx'
import QuickFacts from './components/quickfacts.jsx'
import SlotEquipments from './components/slot-equipments.jsx'

import translate from 'sp-i18n'
import db from 'Logic/database'

// import { ImportStyle } from 'sp-css-import'
// import styles from './header.less'

// @connect()
// @ImportStyle(styles)
export default class ShipDetailsContentInfos extends React.Component {
    render() {
        return (
            <div className={this.props.className}>
                <Remodels ship={this.props.ship} />
                <QuickFacts ship={this.props.ship} />
                <SlotEquipments ship={this.props.ship} />
            </div>
        )
    }
}