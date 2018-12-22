import { parseRaw } from 'kckit'

import shipCollections from './json/ship_collections.json'
import equipmentCollections from './json/equipment_collections.json'

const LZString = __CLIENT__ ? require('lz-string') : {}
const getDataObject = (name) => {
    if (__SERVER__)
        return require(`whocallsthefleet-database/db/${name}.nedb`)

    if (__CLIENT__)
        return LZString.decompressFromEncodedURIComponent(
            require(`./db/${name}.nedb`)
        )
}

let transformed = false

/**
 * 创建 KC database
 * @returns {Object} database
 */
const create = () => {
    const db = parseRaw({
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
    })

    // shipCollections
    {
        db.shipsSpecial = {}

        if (!transformed) {
            let shipIndex = 0
            shipCollections.forEach(collection => {
                collection.names = { ...collection.name }
                collection.list.forEach(list => {
                    list.ships.forEach((arrShips, index) => {
                        list.ships[index] = arrShips.map(shipId => {
                            const ship = db.ships[shipId]
                            Object.assign(ship, {
                                type_display: list.type,
                                order: shipIndex++
                            })
                            if (!db.shipsSpecial[list.type]) db.shipsSpecial[list.type] = []
                            if (!db.shipsSpecial[list.type].includes(shipId) && (
                                (Array.isArray(ship.additional_item_types) && ship.additional_item_types.length)
                                || (Array.isArray(ship.additional_disable_item_types) && ship.additional_disable_item_types.length))
                            ) {
                                db.shipsSpecial[list.type].push(shipId)
                            }
                            return ship
                        })
                    })
                })
                // Object.defineProperty(collection, 'name', {
                //     get: function () {
                //         return this.names[parseLocaleId(require('koot').localeId)]
                //     }
                // })
            })
        }

        db.shipCollections = shipCollections
    }

    // equipment collections
    {
        if (!transformed) {
            let equipmentTypeIndex = 0
            let equipmentIndex = 0
            equipmentCollections.forEach(collection => {
                collection.names = { ...collection.name }
                collection.list.forEach(list => {
                    Object.assign(db.equipmentTypes[list.type], {
                        order: equipmentTypeIndex++
                    })
                    list.equipments = list.equipments.map(equipmentId => {
                        Object.assign(db.equipments[equipmentId], {
                            order: equipmentIndex++
                        })
                        return db.equipments[equipmentId]
                    })
                })
                // Object.defineProperty(collection, 'name', {
                //     get: function () {
                //         return this.names[parseLocaleId(require('koot').localeId)]
                //     }
                // })
            })
        }

        db.equipmentCollections = equipmentCollections
    }

    // equipment types
    {
        db.equipmentTypesExclude = []
        const cache = []
        for (let id in db.equipmentTypes) {
            const type = db.equipmentTypes[id]
            if (type.id === 59) continue // 陸軍戦闘機
            if (cache.includes(type.id_ingame)) {
                db.equipmentTypesExclude.push(type.id)
            } else {
                cache.push(type.id_ingame)
            }
        }
    }

    // arsenal-all
    {
        const arsenalAll = []
        for (const id in db.arsenalAll) {
            arsenalAll.push(db.arsenalAll[id])
        }
        arsenalAll.sort((a, b) => a.sort - b.sort)
        db.arsenalAll = arsenalAll.map(obj => obj.id)
    }

    // arsenal-days
    {
        const days = []
        for (const id in db.arsenalDays) {
            days[db.arsenalDays[id].weekday] = db.arsenalDays[id].improvements
        }
        db.arsenalDays = days
    }

    transformed = true

    return db
}

export default create
