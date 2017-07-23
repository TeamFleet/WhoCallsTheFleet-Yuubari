import equipmentTypes from 'kckit/src/types/equipments'

export default conditionEquipments => {
    let equipmentTypesRequired = []
    for (let key in conditionEquipments) {
        if (key.substr(0, 3) === 'has') {
            let typeName = key.substr(3)
            if (typeName === 'HAMountAAFD') {
                equipmentTypesRequired = equipmentTypesRequired.concat(equipmentTypes['HAMountsAAFD'])
            } else if (typeName in equipmentTypes) {
                equipmentTypesRequired = equipmentTypesRequired.concat(equipmentTypes[typeName])
            } else if (typeName + 's' in equipmentTypes) {
                equipmentTypesRequired = equipmentTypesRequired.concat(equipmentTypes[typeName + 's'])
            }
        }
    }
    return equipmentTypesRequired
}