import { localeId } from 'sp-i18n'

import shipCollections from './db/ship_collections.json'

const LZString = __CLIENT__ && require('lz-string')

const {
    register,

    Ship,
    Equipment,
    Entity,
    Consumable
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
        let raw = {
            ships: requireDb('ships'),
            shipTypes: requireDb('ship_types'),
            shipClasses: requireDb('ship_classes'),
            shipNamesuffix: requireDb('ship_namesuffix'),
            shipSeries: requireDb('ship_series'),

            equipments: requireDb('items'),
            equipmentTypes: requireDb('item_types'),

            entities: requireDb('entities'),

            consumables: requireDb('consumables')
        }

        for (let type in raw) {
            let Class
            switch (type) {
                case 'ships': Class = Ship; break;
                case 'equipments': Class = Equipment; break;
                case 'entities': Class = Entity; break;
                case 'consumables': Class = Consumable; break;
            }
            raw[type].split(/\r?\n/).forEach(item => {
                if (!item) return
                if (typeof db[type] === 'undefined') db[type] = {}

                const obj = JSON.parse(item)
                const id = obj.id ? parseInt(obj.id) : obj._id

                if (Class) {
                    db[type][id] = new Class(obj)
                } else {
                    db[type][id] = obj
                }
            })
        }

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
}

export default db