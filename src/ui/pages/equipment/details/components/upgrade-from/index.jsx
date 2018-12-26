import React from 'react'

import ComponentContainer from '@ui/containers/infos-component'
import ListEquipments from '@ui/components/list/equipments'

const EquipmentDetailsComponentUpgradeFrom =
    ({ className, equipment }) => {
        const list = equipment.upgrade_from || []
        const hasItem = !!(list.length)
        return (
            <ComponentContainer className={className} title={__("equipment_details.upgrade_from")}>
                {hasItem && <ListEquipments list={list} />}
                {!hasItem && <span className="disabled">{__("none")}</span>}
            </ComponentContainer>
        )
    }

export default EquipmentDetailsComponentUpgradeFrom
