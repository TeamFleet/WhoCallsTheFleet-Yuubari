import React from 'react'

import Stocked from './components/stocked.jsx'

import { ImportStyle } from 'sp-css-import'
import styles from './infos.less'

// @connect()
@ImportStyle(styles)
export default class EquipmentDetailsContentInfos extends React.Component {
    render() {
        return (
            <div className={this.props.className}>
                <Stocked equipment={this.props.equipment} className="equipmentinfo equipmentinfo-stocked" />
            </div>
        )
    }
}