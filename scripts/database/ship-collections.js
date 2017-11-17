const jsonPretty = require('json-pretty')
const Datastore = require('nedb-promise')
const path = require('path')
const fs = require('fs-extra')

let db = {}
let shipCollections = []
let shipCollectionsPretty = []
let shipSeriesInCollection = []
let shipTypesAppended = []
let shipSeries = {}
let shipClassInited = {}

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

        // console.log(name.zh_cn, type, expandClass, index, thisSubIndex)

        let ships = await db.ships.cfind({ type: type })
            .sort({
                'class': 1,
                'class_no': 1,
                'name.ja_jp': 1,
                'name.suffix': 1,
                series: 1,
                suffix: 1,
                id: 1,
                'time_created': 1,
            })
            .exec()

        if (!shipClassInited[index]) shipClassInited[index] = []
        // if (expandClass) thisSubIndex = -1

        // console.log(ships.map(ship => ship.id))
        ships.forEach(ship => {
            const series = ship.series
            let listSeries

            if (expandClass && shipClassInited[index].indexOf(ship.class) < 0) {
                // console.log(ship.class)
                thisSubIndex = shipClassInited[index].length
                // thisSubIndex++
                // classIndex[ship.class_no] = thisSubIndex
                shipCollections[index].list[thisSubIndex] = {
                    type: type,
                    class: ship.class,
                    ships: []
                }
                shipSeriesInCollection[index][thisSubIndex] = {}
                shipClassInited[index].push(ship.class)
            }

            if (typeof shipSeriesInCollection[index][thisSubIndex][series] === 'undefined') {
                const i = shipCollections[index].list[thisSubIndex].ships.length
                shipSeriesInCollection[index][thisSubIndex][series] = i
                shipCollections[index].list[thisSubIndex].ships[i] = []
                listSeries = shipCollections[index].list[thisSubIndex].ships[i]
            } else {
                listSeries = shipCollections[index].list[thisSubIndex].ships[shipSeriesInCollection[index][thisSubIndex][series]]
            }

            listSeries[shipSeries[series].indexOf(ship.id)] = ship
        })

        shipTypesAppended.push(type)

        resolve()
    }));

    await Promise.all(promises)
}

module.exports = async (dbpath, topath) => {
    console.log('creating ship collections...')

    // 初始化db
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

    // 载入所有shipTypeCollections数据，生成简易表
    let shipTypeCollections = await db.shipTypeCollections
        .cfind({})
        .sort({ id: 1 })
        .projection({ name: 1, types: 1, _id: 0 })
        .exec()

    // 载入所有shipSeries数据，生成简易表
    let series = await db.shipSeries.cfind({}).exec()
    series.forEach(doc => {
        shipSeries[parseInt(doc.id)] = doc.ships.map(ship => ship.id)
    })

    // 根据已载入数据生成collection
    await Promise.all(shipTypeCollections.map(async (collection, index) => new Promise(async function (resolve, reject) {
        await appendCollection(index, collection.name, collection.types)
        resolve()
    })))

    // 从db载入未处理过的舰娘，加入到collection中
    let shipsRemains = await db.ships
        .cfind({
            type: { $nin: shipTypesAppended }
        })
        .exec()
    if (Array.isArray(shipsRemains) && shipsRemains.length) {
        // console.log(shipsRemains, shipsRemains.map(ship => [ship]))
        shipCollections[shipCollections.length - 1].list.push({
            type: null,
            ships: shipsRemains.map(ship => [ship])
        })
    }

    // 将空数据过滤删除
    shipCollections = shipCollections.filter(collection => {
        collection.list = collection.list.filter(types => {
            types.ships = types.ships.filter(series => (series.length > 0))
            return (types.ships.length > 0)
        })
        return (collection.list.length > 0)
    })

    // 遍历全部collection，将ship object替换为shipId，并生成可读版
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
            if (shipType.class) shipCollectionsPretty[indexCollection].list[indexShipType].class = shipType.class
            shipType.ships.forEach((series, indexSeries) => {
                shipCollectionsPretty[indexCollection].list[indexShipType].ships[indexSeries]
                    = series.filter(ship => ship ? true : false).map(ship => `${ship.name.ja_jp} (ID: ${ship.id}, Suffix: ${ship.name.suffix}, Series: ${ship.series})`)
                shipCollections[indexCollection].list[indexShipType].ships[indexSeries] = series.filter(ship => ship ? true : false).map(ship => ship.id)
            })
        })
    })

    // 写入文件
    fs.writeFileSync(
        path.resolve(topath, 'ship_collections.json'),
        // LZString.compressToEncodedURIComponent(shipCollections),
        JSON.stringify(shipCollections),
        'utf-8'
    )
    fs.writeFileSync(
        path.resolve(topath, 'ship_collections_pretty.json'),
        // LZString.compressToEncodedURIComponent(shipCollections),
        jsonPretty(shipCollectionsPretty),
        'utf-8'
    )

    console.log('COMPLETE: creating ship collections')
}