import React from 'react'
import { ImportStyle } from 'sp-css-import'

import Illust from './components/illust'
import Facts from './components/facts'
// import Stats from './components/stats'
// import Scrap from './components/scrap'
import Improvements from './components/improvements'
import RequiredForImprovements from './components/required-for-improvements'
import UpgradeFrom from './components/upgrade-from'
import Stocked from './components/stocked'

// @connect()
@ImportStyle(require('./infos.less'))
export default class EquipmentDetailsContentInfos extends React.Component {
    getInfoClassName(type) {
        const name = this.props.className + '-info'
        return name + (type ? ` ${name}-${type}` : null)
    }
    render() {
        return (
            <div className={this.props.className}>
                <Illust equipment={this.props.equipment} className={this.getInfoClassName('illust')} />
                <Facts equipment={this.props.equipment} className={this.getInfoClassName('facts')} />
                {/*<Scrap equipment={this.props.equipment} className={this.getInfoClassName('scrap')} />*/}
                <Improvements equipment={this.props.equipment} className={this.getInfoClassName('improvements')} />
                <RequiredForImprovements equipment={this.props.equipment} className={this.getInfoClassName('required-for-improvements')} />
                <UpgradeFrom equipment={this.props.equipment} className={this.getInfoClassName('upgrade-from')} />
                <Stocked equipment={this.props.equipment} className={this.getInfoClassName('stocked')} />
            </div>
        )
    }
}
