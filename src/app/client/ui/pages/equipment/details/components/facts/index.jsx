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

// import { ImportStyle } from 'sp-css-import'
// import styles from './styles.less'

// @connect()
// @ImportStyle(styles)
export default class EquipmentDetailsComponentFacts extends React.Component {
    render() {
        const equipment = getEquipment(this.props.equipment)
        const isAircraft = equipmentTypes.Aircrafts.includes

        const isCraftable = !!(undefined)
        // upgrade_to
        return (
            <ComponentContainer className={this.props.className}>
                <Bullet
                    title={translate(`equipment_details.facts_${equipment.craftable ? '' : 'non_'}craftable`)}
                    level={equipment.craftable ? 2 : 0}
                />
                <Bullet
                    title={translate(`equipment_details.facts_${equipment.improvable ? '' : 'non_'}improvable`)}
                    level={equipment.improvable ? 2 : 0}
                />
                <Bullet
                    title={translate(`equipment_details.facts_${equipment.improvable ? '' : 'non_'}improvable`)}
                    level={equipment.improvable ? 2 : 0}
                />
            </ComponentContainer>
        )
    }
}