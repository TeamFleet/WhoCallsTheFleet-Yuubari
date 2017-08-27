import React from 'react'

import Illust from './components/illust'
import Facts from './components/facts'
// import Stats from './components/stats'
import Scrap from './components/scrap'
import Improvements from './components/improvements'
import RequiredForImprovements from './components/required-for-improvements'
import UpgradeFrom from './components/upgrade-from'
import Stocked from './components/stocked'

import { ImportStyle } from 'sp-css-import'
import styles from './infos.less'

// @connect()
@ImportStyle(styles)
export default class EquipmentDetailsContentInfos extends React.Component {
    render() {
        return (
            <div className={this.props.className}>
                <Illust equipment={this.props.equipment} className="equipmentinfo equipmentinfo-illust" />
                <Facts equipment={this.props.equipment} className="equipmentinfo equipmentinfo-facts" />
                <Scrap equipment={this.props.equipment} className="equipmentinfo equipmentinfo-scrap" />
                <Improvements equipment={this.props.equipment} className="equipmentinfo equipmentinfo-improvements" />
                <RequiredForImprovements equipment={this.props.equipment} className="equipmentinfo equipmentinfo-required-for-improvements" />
                <UpgradeFrom equipment={this.props.equipment} className="equipmentinfo equipmentinfo-upgrade-from" />
                <Stocked equipment={this.props.equipment} className="equipmentinfo equipmentinfo-stocked" />
            </div>
        )
    }
}