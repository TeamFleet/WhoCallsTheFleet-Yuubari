const { Ship } = require('kckit')

let raw = {
    ships: require('whocallsthefleet-database/db/ships.nedb')
}
let db = {}

for (let type in raw) {
    let Class
    switch (type) {
        case 'ships': Class = Ship; break;
    }
    raw[type].split(/\r?\n/).forEach(item => {
        if (!item) return
        const obj = JSON.parse(item)
        if (typeof db[type] === 'undefined') db[type] = {}
        db[type][obj.id ? parseInt(obj.id) : obj._id] = new Class(obj)
    })
}

export default db