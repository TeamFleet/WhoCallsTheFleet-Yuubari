// import { localeId } from 'koot'
import kckit, { register, parseRaw } from 'kckit'

import shipCollections from './db/ship_collections.json'
import equipmentCollections from './db/equipment_collections.json'

import db, { locale, updateLocale } from './'

const LZString = __CLIENT__ && require('lz-string')

// const {
//     register,
//     parseRaw
// } = require('kckit')

let isInitDb
// let db = {}
// let lastLocaleId
// export let locale = null

const requireDb = (name) => {
    if (__SERVER__) return require(`whocallsthefleet-database/db/${name}.nedb`)
    let compressed = require(`./db/${name}.nedb`)
    return LZString.decompressFromEncodedURIComponent(compressed)
}

export default () => {
    let objInit = {}
    let needInit = updateLocale()

    if (needInit) {
        objInit.locale = locale
    }

    if (!isInitDb) {
        parseRaw({
            ships: requireDb('ships'),
            shipTypes: requireDb('ship_types'),
            shipClasses: requireDb('ship_classes'),
            shipNamesuffix: requireDb('ship_namesuffix'),
            shipSeries: requireDb('ship_series'),

            exillusts: requireDb('exillusts'),
            exillustTypes: requireDb('exillust_types'),

            equipments: requireDb('items'),
            equipmentTypes: requireDb('item_types'),

            entities: requireDb('entities'),

            consumables: requireDb('consumables'),

            arsenalAll: requireDb('arsenal_all'),
            // arsenalDays: requireDb('arsenal_weekday').replace(/"weekday":([0-9])/g, '"weekday":$1,"id":$1'),
            arsenalDays: requireDb('arsenal_weekday').replace(/"weekday":([0-9])/g, '"weekday":$1,"id":$1'),
        }, db)

        // shipCollections
        db.shipsSpecial = {}
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
            Object.defineProperty(collection, 'name', {
                get: function () {
                    return this.names[locale]
                }
            })
        })
        db.shipCollections = shipCollections

        // equipment collections
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
            Object.defineProperty(collection, 'name', {
                get: function () {
                    return this.names[locale]
                }
            })
        })
        db.equipmentCollections = equipmentCollections

        // equipment types
        db.equipmentTypesExclude = []
        const cache = []
        for (let id in db.equipmentTypes) {
            const type = db.equipmentTypes[id]
            if (type.id === 59) continue
            if (cache.includes(type.id_ingame)) {
                db.equipmentTypesExclude.push(type.id)
            } else {
                cache.push(type.id_ingame)
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

        if (__CLIENT__ && __DEV__) console.log('📦 Database inited.', db)

        objInit.db = db
        needInit = true

        isInitDb = true
    }

    if (needInit)
        register(objInit)

    if (__CLIENT__ && __DEV__) console.log('🔌 KCKit inited.', kckit)
}
