// import shipCollections from './json/ship_collections.json'
// import equipmentCollections from './json/equipment_collections.json'

const LZString = __CLIENT__ ? require('lz-string') : {}
const getDataObject = (name) => {
    if (__SERVER__)
        return require(`whocallsthefleet-database/db/${name}.nedb`).default

    if (__CLIENT__)
        return LZString.decompressFromEncodedURIComponent(
            require(`./db/${name}.nedb`).default
        )
}

let result = false
// console.log('create', { locale })

/**
 * 创建 KC database
 * @returns {Object} database
 */
const create = () => {
    if (result) return result

    const raw = {
        ships: getDataObject('ships'),
        shipTypes: getDataObject('ship_types'),
        shipClasses: getDataObject('ship_classes'),
        shipNamesuffix: getDataObject('ship_namesuffix'),
        shipSeries: getDataObject('ship_series'),

        exillusts: getDataObject('exillusts'),
        exillustTypes: getDataObject('exillust_types'),

        equipments: getDataObject('items'),
        equipmentTypes: getDataObject('item_types'),

        entities: getDataObject('entities'),

        consumables: getDataObject('consumables'),

        arsenalAll: getDataObject('arsenal_all'),
        arsenalDays: getDataObject('arsenal_weekday').replace(/"weekday":([0-9])/g, '"weekday":$1,"id":$1'),
    }

    result = {
        rawNeDB: raw,
        // shipCollections,
        // equipmentCollections
    }

    return result
}

export default create
