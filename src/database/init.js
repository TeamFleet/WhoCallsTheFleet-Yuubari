import ShipCollections from './json/ship_collections.json'
import EquipmentCollections from './json/equipment_collections.json'

import { register, parseRaw } from 'kckit'

import parseLocaleId from './parse-locale-id'

/**
 * 初始化 KCKit
 * - 服务器端: 仅针对本次请求
 * @param {String} newLocaleId 
 * @void
 */
const initKCKit = ({ localeId, store }) => {

    const requireCollection = (type, defaults) => {
        if (__DEV__ && __SERVER__)
            return require('fs-extra').readJsonSync(
                require('path').resolve(__dirname, `./json/${type}_collections.json`)
            )
        return defaults
    }
    const shipCollections = requireCollection('ship', ShipCollections)
    const equipmentCollections = requireCollection('equipment', EquipmentCollections)

    const locale = parseLocaleId(localeId)

    const {
        rawNeDB,
        // shipCollections,
        // equipmentCollections
    } = store

    const db = parseRaw(rawNeDB)

    // shipCollections
    {
        db.shipsSpecial = {}

        let shipIndex = 0
        shipCollections.forEach(collection => {
            if (typeof collection.name === 'object') {
                collection.names = { ...collection.name }
                // Object.defineProperty(collection, 'name', {
                //     get: function () {
                //         return this.names[locale]
                //     }
                // })
                collection.name = collection.names[locale]
                collection.list.forEach(list => {
                    list.ships.forEach((arrShips, index) => {
                        list.ships[index] = arrShips.map(shipId => {
                            const ship = db.ships[shipId]
                            // if (!ship) return
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
            }
        })

        db.shipCollections = shipCollections
    }

    // equipment collections
    {
        let equipmentTypeIndex = 0
        let equipmentIndex = 0
        equipmentCollections.forEach(collection => {
            if (typeof collection.name === 'object') {
                collection.names = { ...collection.name }
                // Object.defineProperty(collection, 'name', {
                //     get: function () {
                //         return this.names[locale]
                //     }
                // })
                collection.name = collection.names[locale]
                collection.list.forEach(list => {
                    Object.assign(db.equipmentTypes[list.type], {
                        order: equipmentTypeIndex++
                    })
                    list.equipments = list.equipments.map(equipmentId => {
                        // if (!db.equipments[equipmentId]) return {}
                        Object.assign(db.equipments[equipmentId], {
                            order: equipmentIndex++
                        })
                        return db.equipments[equipmentId]
                    })
                })
            }
        })

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

    // console.log('registering...')

    register({
        db, locale
    })

    // console.log('register OK', {
    //     locale
    // })

    if (__CLIENT__ && __DEV__) {
        console.log('📦 Database inited.', db)
        console.log('🔌 KCKit inited.', require('kckit'))
    }

    /*
    if (__SERVER__) {

        const { database } = store
        // const database = (() => {
        //     if (__SERVER__) return store.database
        //     if (__CLIENT__) return createDatabase()
        // })()

        // database.shipCollections.forEach(collection => {
        //     Object.defineProperty(collection, 'name', {
        //         get: function () {
        //             return this.names[newKCKitLocale]
        //         }
        //     })
        // })
        // database.equipmentCollections.forEach(collection => {
        //     Object.defineProperty(collection, 'name', {
        //         get: function () {
        //             return this.names[newKCKitLocale]
        //         }
        //     })
        // })

        register({
            db: database,
            locale: newKCKitLocale
        })
    }

    */

}

export default initKCKit
