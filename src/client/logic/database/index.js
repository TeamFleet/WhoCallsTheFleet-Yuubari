import { localeId } from 'sp-i18n'

const LZString = __CLIENT__ && require('lz-string')

const {
    register,

    Ship,
    Equipment,
    Entity,
    Consumable
} = require('kckit')

let isInit
let raw
let db = {}
export let locale

const requireDb = (name) => {
    if (__SERVER__) return require(`whocallsthefleet-database/db/${name}.nedb`)
    let compressed = require(`./db/${name}.nedb`)
    return LZString.decompressFromEncodedURIComponent(compressed)
}

export const init = () => {
    if (isInit) return

    raw = {
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

    locale = localeId
    if (/^zh/.test(locale)) locale = 'zh_cn'
    else if (/^en/.test(locale)) locale = 'en_us'
    // else if (/^ja/.test(locale)) locale = 'ja_jp'
    else locale = 'ja_jp'

    register({
        locale,
        db
    })

    isInit = true
}

export default db