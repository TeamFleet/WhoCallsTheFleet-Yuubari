import React from 'react'

import ComponentContainer from '@appUI/containers/infos-component'
import Bullet from '@appUI/components/bullet'

import getEquipment from '@appUtils/get-equipment'
import equipmentTypes from 'kckit/src/types/equipments'

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
        const equipment = getEquipment(this.props.equipment)

        const arr = [
            ['craftable', !!(equipment.craftable)],
            ['improvable', !!(equipment.improvable)],
            ['upgradable', (Array.isArray(equipment.upgrade_to) && equipment.upgrade_to.length)]
        ]

        if (equipmentTypes.Aircrafts.includes(equipment.type))
            arr.push(
                ['rankupgradable', equipment.rankupgradable]
            )

        return (
            <ComponentContainer className={this.props.className}>
                {arr.map(pair => (
                    <Bullet
                        className="item"
                        title={translate(`equipment_details.facts_${pair[1] ? '' : 'un'}${pair[0]}`)}
                        level={pair[1] ? 2 : 0}
                        key={pair[0]}
                    />
                ))}
            </ComponentContainer>
        )
    }
}