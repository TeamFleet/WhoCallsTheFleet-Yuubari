import React from 'react'
import { extend } from 'koot'

import Illust from './components/illust'
import Facts from './components/facts'
// import Stats from './components/stats'
// import Scrap from './components/scrap'
import Improvements from './components/improvements'
import RequiredForImprovements from './components/required-for-improvements'
import UpgradeFrom from './components/upgrade-from'
import Stocked from './components/stocked'
// import Acquisition from './components/acquisition'

const EquipmentDetailsContentInfos = extend({
    styles: require('./infos.less')
})(
    ({className, equipment}) => {
        if (!equipment) return null
        const classNameInfo = className + '-info'
        return (
            <div className={className}>
                {[
                    [Illust, 'illust'],
                    [Facts, 'facts'],
                    // [Scrap, 'scrap'],
                    [Improvements, 'improvements'],
                    [RequiredForImprovements, 'required-for-improvements'],
                    // [Acquisition, 'acquisition'],
                    [UpgradeFrom, 'upgrade-from'],
                    [Stocked, 'stocked'],
                ].map((o, index) => {
                    const [Component, name] = o
                    return (
                        <Component
                            key={index}
                            equipment={equipment}
                            className={classNameInfo + (name ? ` ${classNameInfo}-${name}` : '')}
                        />
                    )
                })}
            </div>
        )
    }
)

export default EquipmentDetailsContentInfos
