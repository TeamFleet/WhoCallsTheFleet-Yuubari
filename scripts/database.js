const LZString = require('lz-string')
const Datastore = require('nedb-promise')
const path = require('path')
const fs = require('fs-extra')
const jsonPretty = require('json-pretty')

const dbpath = path.resolve(process.cwd(), 'node_modules', 'whocallsthefleet-database', 'db')
const topath = path.resolve(process.cwd(), 'src', 'client', 'logic', 'database', 'db')

let db = {}
let shipCollections = []
let shipCollectionsPretty = []
let shipSeriesInCollection = []
let shipTypesAppended = []
let shipSeries = {}

const appendCollection = async (index, name, types, expandClass) => {
    const initSublist = (type, index, subIndex) => {
        shipCollections[index].list[subIndex] = {
            type: type,
            ships: []
        }
        shipSeriesInCollection[index][subIndex] = {}
    }

    let subIndex = undefined
    if (Array.isArray(index)) {
        subIndex = index[1]
        index = index[0]
    }
    if (typeof expandClass === 'undefined') expandClass = (types.length < 2)
    if (typeof shipCollections[index] === 'undefined') {
        shipCollections[index] = {
            name, list: []
        }
        shipSeriesInCollection[index] = []
    }

    let promises = types.map(async type => new Promise(async function (resolve, reject) {
        let thisSubIndex
        if (Array.isArray(type)) {
            let subIndex = shipCollections[index].list.length
            initSublist(type[0], index, subIndex)
            await appendCollection([index, subIndex], name, type, expandClass)
            resolve()
            return
        } else {
            // console.log(subIndex)
            if (typeof subIndex === 'undefined') {
                thisSubIndex = shipCollections[index].list.length
                initSublist(type, index, thisSubIndex)
            } else {
                thisSubIndex = subIndex
            }
        }
        // console.log(name.zh_cn, type, expandClass)

        let ships = await db.ships.cfind({ type: type })
            .sort({ 'class': 1, 'class_no': 1, 'time_created': 1, 'name.suffix': 1, series: 1, suffix: 1, id: 1 })
            .exec()

        // console.log(ships.map(ship => ship.id))
        ships.forEach(ship => {
            const series = ship.series
            let listSeries

            if (typeof shipSeriesInCollection[index][thisSubIndex][series] === 'undefined') {
                const i = shipCollections[index].list[thisSubIndex].ships.length
                shipSeriesInCollection[index][thisSubIndex][series] = i
                shipCollections[index].list[thisSubIndex].ships[i] = []
                listSeries = shipCollections[index].list[thisSubIndex].ships[i]
            } else {
                listSeries = shipCollections[index].list[thisSubIndex].ships[shipSeriesInCollection[index][thisSubIndex][series]]
                // console.log(shipSeries[series])
                // if (ship.remodel && ship.remodel.prev) {
                //     let indexInsert
                //     listSeries.forEach((thatShip, indexThatShip) => {
                //         if (thatShip.id === ship.remodel.prev)
                //             indexInsert = indexThatShip + 1
                //     })
                //     if (typeof listSeries !== 'undefined')
                //         listSeries.splice(indexInsert, 0, ship)
                // } else {
                //     listSeries.push(ship)
                // }
            }

            listSeries[shipSeries[series].indexOf(ship.id)] = ship
        })

        // shipCollections[index].list[thisSubIndex].ships =
        //     shipCollections[index].list[thisSubIndex].ships.concat(ships.map(ship => ship.id))
        // shipCollectionsPretty[index].list[thisSubIndex].ships =
        //     shipCollectionsPretty[index].list[thisSubIndex].ships.concat(ships.map(ship => `${ship.name.ja_jp} (ID: ${ship.id}, Suffix: ${ship.name.suffix}, Series: ${ship.series})`))

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
    db.shipSeries = new Datastore({
        filename: path.resolve(dbpath, 'ship_series.nedb'),
        autoload: true
    })
    let shipTypeCollections = await db.shipTypeCollections
        .cfind({})
        .sort({ id: 1 })
        .projection({ name: 1, types: 1, _id: 0 })
        .exec()
    // shipSeries = 
    let series = await db.shipSeries.cfind({}).exec()
    series.forEach(doc => {
        shipSeries[parseInt(doc.id)] = doc.ships.map(ship => ship.id)
    })
    await Promise.all(shipTypeCollections.map(async (collection, index) => new Promise(async function (resolve, reject) {
        await appendCollection(index, collection.name, collection.types)
        resolve()
    })))
    shipCollections.forEach((collection, indexCollection) => {
        shipCollectionsPretty[indexCollection] = {
            name: collection.name.ja_jp,
            list: []
        }
        collection.list.forEach((shipType, indexShipType) => {
            shipCollectionsPretty[indexCollection].list[indexShipType] = {
                type: shipType.type,
                ships: []
            }
            shipType.ships.forEach((series, indexSeries) => {
                shipCollectionsPretty[indexCollection].list[indexShipType].ships[indexSeries]
                    = series.filter(ship => ship ? true : false).map(ship => `${ship.name.ja_jp} (ID: ${ship.id}, Suffix: ${ship.name.suffix}, Series: ${ship.series})`)
                shipCollections[indexCollection].list[indexShipType].ships[indexSeries] = series.filter(ship => ship ? true : false).map(ship => ship.id)
            })
        })
    })
    // 其他舰娘
    // ...
    fs.writeFile(
        path.resolve(topath, 'ship_collections.json'),
        // LZString.compressToEncodedURIComponent(shipCollections),
        JSON.stringify(shipCollections),
        'utf-8'
    )
    fs.writeFile(
        path.resolve(topath, 'ship_collections_pretty.json'),
        // LZString.compressToEncodedURIComponent(shipCollections),
        jsonPretty(shipCollectionsPretty),
        'utf-8'
    )

    console.log('COMPLETE: creating ship collections')
}

run()