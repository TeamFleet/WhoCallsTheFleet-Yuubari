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
import Acquisition from './components/acquisition'

// @connect()
@ImportStyle(require('./infos.less'))
export default class EquipmentDetailsContentInfos extends React.Component {
    getInfoClassName(type) {
        const name = this.props.className + '-info'
        return name + (type ? ` ${name}-${type}` : null)
    }
    render() {
        if (!this.props.equipment) return null
        return (
            <div className={this.props.className}>
                {[
                    [Illust, 'illust'],
                    [Facts, 'facts'],
                    // [Scrap, 'scrap'],
                    [Improvements, 'improvements'],
                    [RequiredForImprovements, 'required-for-improvements'],
                    [Acquisition, 'acquisition'],
                    // [UpgradeFrom, 'upgrade-from'],
                    // [Stocked, 'stocked'],
                ].map((o, index) => {
                    const [Component, name] = o
                    return (
                        <Component
                            key={index}
                            equipment={this.props.equipment}
                            className={this.getInfoClassName(name)}
                        />
                    )
                })}
            </div>
        )
    }
}
