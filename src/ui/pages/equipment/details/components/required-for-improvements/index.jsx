import React from 'react'

import ComponentContainer from '@ui/containers/infos-component'
import ListEquipments from '@ui/components/list/equipments'

const EquipmentDetailsComponentRequiredForImprovements =
    ({ className, equipment }) => {
        const list = equipment.upgrade_for || []
        const hasItem = !!(list.length)
        return (
            <ComponentContainer className={className} title={__("equipment_details.required_for_improvements")}>
                {hasItem && <ListEquipments list={list} />}
                {!hasItem && <span className="disabled">{__("none")}</span>}
            </ComponentContainer>
        )
    }
export default EquipmentDetailsComponentRequiredForImprovements
