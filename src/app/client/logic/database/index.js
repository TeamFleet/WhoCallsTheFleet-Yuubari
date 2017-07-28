import { localeId } from 'sp-i18n'

import shipCollections from './db/ship_collections.json'

const LZString = __CLIENT__ && require('lz-string')

const {
    register,
    parseRaw
} = require('kckit')

let isInitDb
let db = {}
let lastLocaleId
export let locale = null

const requireDb = (name) => {
    if (__SERVER__) return require(`whocallsthefleet-database/db/${name}.nedb`)
    let compressed = require(`./db/${name}.nedb`)
    return LZString.decompressFromEncodedURIComponent(compressed)
}

export const init = () => {
    let objInit = {}
    let needInit = false

    if (lastLocaleId !== localeId) {
        locale = localeId
        if (/^zh/.test(localeId)) locale = 'zh_cn'
        else if (/^en/.test(localeId)) locale = 'en_us'
        // else if (/^ja/.test(locale)) locale = 'ja_jp'
        else locale = 'ja_jp'
        objInit.locale = locale
        lastLocaleId = localeId
        needInit = true
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

            consumables: requireDb('consumables')
        }, db)

        // shipCollections
        shipCollections.forEach(collection => {
            collection.list.forEach(type => {
                type.ships.forEach((arrShips, index) => {
                    type.ships[index] = arrShips.map(shipId => {
                        db.ships[shipId].type_display = type.type
                        return db.ships[shipId]
                    })
                })
            })
        })
        db.shipCollections = shipCollections

        if (__CLIENT__ && __DEV__) console.log('database init', db)

        objInit.db = db
        needInit = true

        isInitDb = true
    }

    if (needInit)
        register(objInit)

    if (__DEV__) console.log('KCKit', require('kckit'))
}

export default db