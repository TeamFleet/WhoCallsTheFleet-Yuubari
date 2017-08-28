import React from 'react'
import classNames from 'classnames'

import ComponentContainer from '@appUI/containers/infos-component'
import Bullet from '@appUI/components/bullet'

import arrStats from '@appData/equipment-stats'
// import arrResources from '@appData/resources'
// import getEquipment from '@appUtils/get-equipment'
// import equipmentTypes from 'kckit/src/types/equipments'
import Stat from '@appUI/components/stat'
import getValue from '@appUtils/get-value'
import { get } from 'kckit'

import translate from 'sp-i18n'

/*
 * non-aircraft: 开发 | 改修 | 升级
 * aircraft: 开发 | 改修 | 升级 | 提升熟练度
 */

import { ImportStyle } from 'sp-css-import'
import styles from './styles.less'

// @connect()
@ImportStyle(styles)
export default class EquipmentDetailsComponentFacts extends React.Component {
    render() {
        return (
            <ComponentContainer className={this.props.className}>
                <EquipmentDetailsComponentFactsFacts equipment={this.props.equipment} />
                <EquipmentDetailsComponentFactsStats equipment={this.props.equipment} />
                {/* <EquipmentDetailsComponentFactsScrap equipment={this.props.equipment} /> */}
            </ComponentContainer>
        )
    }
}

import stylesContainer from './styles-container.less'
@ImportStyle(stylesContainer)
class EquipmentDetailsComponentFactsContainer extends React.Component {
    render() {
        return (
            <div className={this.props.className}>
                {this.props.children}
            </div>
        )
    }
}

import stylesFacts from './styles-facts.less'
@ImportStyle(stylesFacts)
class EquipmentDetailsComponentFactsFacts extends React.Component {
    render() {
        // const equipment = getEquipment(this.props.equipment)
        const { equipment, className } = this.props

        const arr = [
            ['craftable', !!(equipment.craftable)],
            ['improvable', !!(equipment.improvable)],
            ['upgradable', (Array.isArray(equipment.upgrade_to) && equipment.upgrade_to.length)]
        ]

        if (equipment.isType('Aircraft'))
            arr.push(
                ['rankupgradable', equipment.rankupgradable]
            )

        return (
            <EquipmentDetailsComponentFactsContainer className={className}>
                {arr.map(pair => (
                    <Bullet
                        className="item"
                        title={translate(`equipment_details.facts_${pair[1] ? '' : 'un'}${pair[0]}`)}
                        level={pair[1] ? 2 : 0}
                        key={pair[0]}
                    />
                ))}
            </EquipmentDetailsComponentFactsContainer>
        )
    }
}

import stylesStats from './styles-stats.less'
@ImportStyle(stylesStats)
class EquipmentDetailsComponentFactsStats extends React.Component {
    render() {
        const { equipment, className } = this.props
        const stats = [...arrStats]

        if (equipment.isType('Aircraft'))
            stats.push('distance')

        return (
            <EquipmentDetailsComponentFactsContainer className={className}>
                {stats.map(stat => {
                    const value = stat === 'range'
                        ? get.range(equipment.stat[stat])
                        : getValue(equipment.stat[stat])
                    {/* if (!value) return null */ }
                    return (<Stat
                        type={translate(`stat.${stat}`)}
                        key={stat}
                        className={
                            classNames(["item", {
                                "is-negative": (value < 0),
                                "is-positive": (value > 0 && stat !== 'range' && stat !== 'distance'),
                                'disabled': !value
                            }])
                        }
                        stat={stat}
                    >
                        {`${value > 0 && stat !== 'range' && stat !== 'distance' ? '+' : ''}${!value ? '-' : value}`}
                    </Stat>)
                })}
            </EquipmentDetailsComponentFactsContainer>
        )
    }
}

// import stylesScrap from './styles-scrap.less'
// @ImportStyle(stylesScrap)
// class EquipmentDetailsComponentFactsScrap extends React.Component {
//     render() {
//         return (
//             <ComponentContainer className={this.props.className} title={translate("equipment_details.scrap")}>
//                 <EquipmentDetailsComponentFactsContainer className={this.props.className}>
//                     {arrResources.map((resource, index) => {
//                         const value = getValue(this.props.equipment.dismantle[index])
//                         return (
//                             <Stat
//                                 className={
//                                     classNames(['item', {
//                                         disabled: !value
//                                     }])
//                                 }
//                                 key={index}
//                                 stat={resource}
//                             >
//                                 {value}
//                             </Stat>
//                         )
//                     })}
//                 </EquipmentDetailsComponentFactsContainer>
//             </ComponentContainer>
//         )
//     }
// }