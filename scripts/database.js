const LZString = require('lz-string')
const Datastore = require('nedb-promise')
const path = require('path')
const fs = require('fs-extra')

const dbpath = path.resolve(process.cwd(), 'node_modules', 'whocallsthefleet-database', 'db')
const topath = path.resolve(process.cwd(), 'src', 'client', 'logic', 'database', 'db')

let db = {}
let shipCollections = []
let shipTypesAppended = []

const appendCollection = async (index, name, types, expandClass) => {
    let subIndex = undefined
    if (Array.isArray(index)) {
        subIndex = index[1]
        index = index[0]
    }
    if (typeof expandClass === 'undefined') expandClass = (types.length < 2)
    if (typeof shipCollections[index] === 'undefined')
        shipCollections[index] = {
            name, list: []
        }

    let promises = types.map(async type => new Promise(async function (resolve, reject) {
        let thisSubIndex
        if (Array.isArray(type)) {
            let subIndex = shipCollections[index].list.length
            shipCollections[index].list[subIndex] = {
                type: type[0],
                ships: []
            }
            await appendCollection([index, subIndex], name, type, expandClass)
            resolve()
            return
        } else {
            // console.log(subIndex)
            if (typeof subIndex === 'undefined') {
                thisSubIndex = shipCollections[index].list.length
                shipCollections[index].list[thisSubIndex] = {
                    type: type,
                    ships: []
                }
            } else {
                thisSubIndex = subIndex
            }
        }
        // console.log(name.zh_cn, type, expandClass)

        let ships = await db.ships.cfind({ type: type })
            .sort({ series: 1, suffix: 1, id: 1 })
            .exec()

        // console.log(ships.map(ship => ship.id))

        shipCollections[index].list[thisSubIndex].ships =
            shipCollections[index].list[thisSubIndex].ships.concat(ships.map(ship => ship.id))

        shipTypesAppended.push(type)

        resolve()
    }));

    await Promise.all(promises)
}

const run = async () => {
    console.log('compressing database...')

    // ensure and empty target dir
    fs.ensureDirSync(topath)
    fs.emptyDirSync(topath)

    fs.readdirSync(dbpath).forEach(file => {
        let content = fs.readFileSync(path.resolve(dbpath, file), 'utf8')
        switch (file) {
            case 'entities.nedb':
                content = content.split(/\r?\n/)
                    .filter(line => typeof line !== 'undefined' && line)
                    .map(line => {
                        const json = JSON.parse(line)
                        delete (json.picture)
                        return JSON.stringify(json)
                    })
                    .join("\n") + "\r"
                // fs.writeFile(
                //     path.resolve(topath, file + '.test'),
                //     content,
                //     'utf-8'
                // )
                break
        }
        fs.writeFile(
            path.resolve(topath, file),
            LZString.compressToEncodedURIComponent(content),
            'utf-8'
        )
        console.log('  > ' + file)
    })

    console.log('COMPLETE: compressing database')

    console.log('')
    console.log('creating ship collections...')
    db.ships = new Datastore({
        filename: path.resolve(dbpath, 'ships.nedb'),
        autoload: true
    })
    db.shipTypeCollections = new Datastore({
        filename: path.resolve(dbpath, 'ship_type_collections.nedb'),
        autoload: true
    })
    let shipTypeCollections = await db.shipTypeCollections
        .cfind({})
        .sort({ id: 1 })
        .projection({ name: 1, types: 1, _id: 0 })
        .exec()
    await Promise.all(shipTypeCollections.map(async (collection, index) => new Promise(async function (resolve, reject) {
        await appendCollection(index, collection.name, collection.types)
        resolve()
    })))
    // 其他舰娘
    fs.writeFile(
        path.resolve(topath, 'ship_collections.json'),
        // LZString.compressToEncodedURIComponent(shipCollections),
        JSON.stringify(shipCollections),
        'utf-8'
    )

    console.log('COMPLETE: creating ship collections')
}

run()