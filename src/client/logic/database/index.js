import { localeId } from 'super-i18n'

// import shipCollections from './db/ship_collections.json'
// import equipmentCollections from './db/equipment_collections.json'

// const LZString = __CLIENT__ && require('lz-string')

const {
    register,
} = require('kckit')

// let isInitDb
let db = {}
let lastLocaleId
export let locale = null
export const updateLocale = () => {
    if (!localeId) return false
    if (lastLocaleId !== localeId) {
        locale = localeId
        if (/^zh/.test(localeId)) locale = 'zh_cn'
        else if (/^en/.test(localeId)) locale = 'en_us'
        else if (/^ja/.test(localeId)) locale = 'ja_jp'
        else locale = 'ja_jp'
        lastLocaleId = localeId
        register({
            locale
        })
        return true
    }
    return false
}

// const requireDb = (name) => {
//     if (__SERVER__) return require(`whocallsthefleet-database/db/${name}.nedb`)
//     let compressed = require(`./db/${name}.nedb`)
//     return LZString.decompressFromEncodedURIComponent(compressed)
// }

// export const init = () => {
//     let objInit = {}
//     let needInit = false

//     if (lastLocaleId !== localeId) {
//         locale = localeId
//         if (/^zh/.test(localeId)) locale = 'zh_cn'
//         else if (/^en/.test(localeId)) locale = 'en_us'
//         // else if (/^ja/.test(locale)) locale = 'ja_jp'
//         else locale = 'ja_jp'
//         objInit.locale = locale
//         lastLocaleId = localeId
//         needInit = true
//     }

//     if (!isInitDb) {
//         parseRaw({
//             ships: requireDb('ships'),
//             shipTypes: requireDb('ship_types'),
//             shipClasses: requireDb('ship_classes'),
//             shipNamesuffix: requireDb('ship_namesuffix'),
//             shipSeries: requireDb('ship_series'),

//             exillusts: requireDb('exillusts'),
//             exillustTypes: requireDb('exillust_types'),

//             equipments: requireDb('items'),
//             equipmentTypes: requireDb('item_types'),

//             entities: requireDb('entities'),

//             consumables: requireDb('consumables')
//         }, db)

//         // shipCollections
//         db.shipsSpecial = {}
//         let shipIndex = 0
//         shipCollections.forEach(collection => {
//             collection.name = collection.name[locale]
//             collection.list.forEach(list => {
//                 list.ships.forEach((arrShips, index) => {
//                     list.ships[index] = arrShips.map(shipId => {
//                         const ship = db.ships[shipId]
//                         Object.assign(ship, {
//                             type_display: list.type,
//                             order: shipIndex++
//                         })
//                         if (!db.shipsSpecial[list.type]) db.shipsSpecial[list.type] = []
//                         if (!db.shipsSpecial[list.type].includes(shipId) && (
//                             (Array.isArray(ship.additional_item_types) && ship.additional_item_types.length)
//                             || (Array.isArray(ship.additional_disable_item_types) && ship.additional_disable_item_types.length))
//                         ) {
//                             db.shipsSpecial[list.type].push(shipId)
//                         }
//                         return ship
//                     })
//                 })
//             })
//         })
//         db.shipCollections = shipCollections

//         // equipment collections
//         let equipmentTypeIndex = 0
//         let equipmentIndex = 0
//         equipmentCollections.forEach(collection => {
//             collection.name = collection.name[locale]
//             collection.list.forEach(list => {
//                 Object.assign(db.equipmentTypes[list.type], {
//                     order: equipmentTypeIndex++
//                 })
//                 list.equipments = list.equipments.map(equipmentId => {
//                     Object.assign(db.equipments[equipmentId], {
//                         order: equipmentIndex++
//                     })
//                     return db.equipments[equipmentId]
//                 })
//             })
//         })
//         db.equipmentCollections = equipmentCollections

//         // equipment types
//         db.equipmentTypesExclude = []
//         const cache = []
//         for (let id in db.equipmentTypes) {
//             const type = db.equipmentTypes[id]
//             if (type.id === 59) continue
//             if (cache.includes(type.id_ingame)) {
//                 db.equipmentTypesExclude.push(type.id)
//             } else {
//                 cache.push(type.id_ingame)
//             }
//         }

//         if (__CLIENT__ && __DEV__) console.log('database init', db)

//         objInit.db = db
//         needInit = true

//         isInitDb = true
//     }

//     if (needInit)
//         register(objInit)

//     if (__CLIENT__ && __DEV__) console.log('KCKit', require('kckit'))
// }

// export const init = () =>
//     import(
//         /* webpackChunkName: "database" */
//         './init'
//     ).then(init => init.default())
export const init = require('./init').default

export default db
