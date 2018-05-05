const jsonPretty = require('json-pretty')
const Datastore = require('nedb-promise')
const path = require('path')
const fs = require('fs-extra')

let db = {}
let equipmentCollections = []
let equipmentCollectionsPretty = []
let equipmentTypesAppended = []

const appendCollection = async (index, name, types) => {
    if (!name.ja_jp) name.ja_jp = name.zh_cn
    if (!name.en_us) name.en_us = name.ja_jp

    const initSublist = (type, index, subIndex) => {
        equipmentCollections[index].list[subIndex] = {
            type: type,
            equipments: []
        }
    }

    let subIndex = undefined
    if (Array.isArray(index)) {
        subIndex = index[1]
        index = index[0]
    }
    if (typeof equipmentCollections[index] === 'undefined') {
        equipmentCollections[index] = {
            name, list: []
        }
    }

    let promises = types.map(async type => new Promise(async function (resolve, reject) {
        let thisSubIndex
        // console.log(subIndex)
        if (typeof subIndex === 'undefined') {
            thisSubIndex = equipmentCollections[index].list.length
            initSublist(type, index, thisSubIndex)
        } else {
            thisSubIndex = subIndex
        }

        // console.log(name.zh_cn, type, expandClass, index, thisSubIndex)

        let equipmentType = (await db.equipmentTypes.cfind({ id: type }).exec())[0]
        // equipmentType = equipmentType[0]
        let equipments = await db.equipments.cfind({ type: type })
            .sort({ [`stat.${equipmentType.main_attribute || 'fire'}`]: 1, 'rarity': 1, id: 1 })
            .exec()

        // console.log(ships.map(ship => ship.id))
        equipments.forEach(equipment => {
            const l = equipmentCollections[index].list[thisSubIndex].equipments
            // console.log(l.length)
            // console.log(name.zh_cn, equipmentType.name.zh_cn, index, thisSubIndex, l.length, equipment.name.zh_cn)
            l.push(equipment)
        })

        equipmentTypesAppended.push(type)

        resolve()
    }));

    await Promise.all(promises)
}

module.exports = async (dbpath, topath) => {
    // console.log('  > Creating equipment collections...')

    // 初始化db
    db.equipments = new Datastore({
        filename: path.resolve(dbpath, 'items.nedb'),
        autoload: true
    })
    db.equipmentTypes = new Datastore({
        filename: path.resolve(dbpath, 'item_types.nedb'),
        autoload: true
    })
    db.equipmentTypeCollections = new Datastore({
        filename: path.resolve(dbpath, 'item_type_collections.nedb'),
        autoload: true
    })

    // 载入所有 equipmentTypeCollections 数据，生成简易表
    let equipmentTypeCollections = await db.equipmentTypeCollections
        .cfind({})
        .sort({ id: 1 })
        .projection({ name: 1, types: 1, _id: 0 })
        .exec()

    // 根据已载入数据生成 collection
    await Promise.all(equipmentTypeCollections.map(
        async (collection, index) => new Promise(async function (resolve, reject) {
            await appendCollection(index, collection.name, collection.types)
            resolve()
        }))
    )

    // 从db载入未处理过的装备，加入到collection中
    let equipmentsRemains = await db.equipments
        .cfind({
            type: { $nin: equipmentTypesAppended }
        })
        .exec()
    if (Array.isArray(equipmentsRemains) && equipmentsRemains.length) {
        // console.log(equipmentsRemains, equipmentsRemains.map(ship => [ship]))
        equipmentCollections[equipmentCollections.length - 1].list.push({
            type: null,
            equipments: equipmentsRemains.map(equipment => [equipment])
        })
    }

    // 将空数据过滤删除
    equipmentCollections = equipmentCollections.filter(collection => {
        collection.list = collection.list.filter(types => types.equipments.length > 0)
        return (collection.list.length > 0)
    })

    // 遍历全部collection，将ship object替换为shipId，并生成可读版
    equipmentCollections.forEach((collection, indexCollection) => {
        equipmentCollectionsPretty[indexCollection] = {
            name: collection.name.ja_jp,
            list: []
        }
        collection.list.forEach((equipmentType, indexEquipmentType) => {
            equipmentCollectionsPretty[indexCollection].list[indexEquipmentType] = {
                type: `[${equipmentType.type}]`,
                equipments: equipmentType.equipments.map(equipment => `[${equipment.id}] ${equipment.name.ja_jp}`)
            }
            equipmentCollections[indexCollection].list[indexEquipmentType] = {
                type: equipmentType.type,
                equipments: equipmentType.equipments.map(equipment => equipment.id)
            }
        })
    })

    // 写入文件
    fs.writeFileSync(
        path.resolve(topath, 'equipment_collections.json'),
        JSON.stringify(equipmentCollections),
        'utf-8'
    )
    fs.writeFileSync(
        path.resolve(topath, 'equipment_collections_pretty.json'),
        jsonPretty(equipmentCollectionsPretty),
        'utf-8'
    )

    // console.log('    > COMPLETE')
}
