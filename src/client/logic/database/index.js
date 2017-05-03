import { localeId } from 'sp-i18n'

const LZString = require('lz-string')

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

const requireDb = (name) => require(`./db/${name}.nedb`)

export const init = () => {
    if (isInit) return

    raw = {
        ships: requireDb('ships'),
        ship_types: requireDb('ship_types'),
        ship_classes: requireDb('ship_classes'),
        ship_namesuffix: requireDb('ship_namesuffix'),
        ship_series: requireDb('ship_series'),

        equipments: requireDb('items'),
        equipment_types: requireDb('item_types'),

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
        LZString.decompressFromEncodedURIComponent(raw[type])
            .split(/\r?\n/).forEach(item => {
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

    let locale = localeId
    if (/^zh/.test(locale)) locale = 'zh_cn'
    // else if (/^ja/.test(locale)) locale = 'ja_jp'
    else locale = 'ja_jp'

    register({
        locale,
        db
    })

    isInit = true
}

export default db