import equipmentTypes from 'kckit/src/types/equipments';

export default conditionEquipments => {
    for (const key in conditionEquipments) {
        let typeName;
        if (key.substr(0, 3) === 'has') {
            typeName = key.substr(3);
        } else if (key.substr(0, 2) === 'is') {
            typeName = key.substr(2);
        }

        if (typeName === 'HAMountAAFD')
            return getArr(equipmentTypes['HAMountsAAFD']);

        if (typeName in equipmentTypes) return getArr(equipmentTypes[typeName]);

        if (typeName + 's' in equipmentTypes)
            return getArr(equipmentTypes[typeName + 's']);
    }

    return [];
};

const getArr = v => (Array.isArray(v) ? v : [v]);
