const fs = require('fs-extra');
const path = require('path');
const jsonPretty = require('json-pretty');
const Datastore = require('nedb-promise');
const kckit = require('kckit');
const Ship = require('kckit/src/class/ship');
const camelCase = require('camelcase');

const getShipSubType = require('../../src/api/get-ship-sub-type');

const subTypes = {
    en_us: require('../../src/locales/ship/en.json').ship_sub_types_in_list,
    ja_jp: require('../../src/locales/ship/ja.json').ship_sub_types_in_list,
    zh_cn: require('../../src/locales/ship/zh.json').ship_sub_types_in_list,
};

const db = {};
let shipCollections = [];
const shipCollectionsPretty = [];
const shipSeriesInCollection = [];
const shipTypesAppended = [];
const shipSeries = {};
const shipClassInited = {};
let data = {};

const sortDD = [
    84, // 神風
    12, // 睦月
    15, // 吹雪
    16, // 綾波
    17, // 暁
    18, // 初春
    19, // 白露
    150, // 改白露
    20, // 朝潮
    21, // 陽炎
    138, // 改装陽炎
    139, // 改陽炎
    22, // 夕雲
    23, // 秋月
    24, // 島風
    131, // 松
];

const appendCollection = async (index, name, types, expandClass) => {
    const initSublist = (type, index, subIndex) => {
        shipCollections[index].list[subIndex] = {
            type: type,
            ships: [],
        };
        shipSeriesInCollection[index][subIndex] = {};
    };

    let subIndex = undefined;
    if (Array.isArray(index)) {
        subIndex = index[1];
        index = index[0];
    }
    if (typeof expandClass === 'undefined') expandClass = types.length < 2;
    if (typeof shipCollections[index] === 'undefined') {
        shipCollections[index] = {
            name,
            list: [],
        };
        shipSeriesInCollection[index] = [];
    }

    const promises = types.map(
        async (type) =>
            new Promise(async function (resolve /*, reject*/) {
                let thisSubIndex;
                if (Array.isArray(type)) {
                    const subIndex = shipCollections[index].list.length;
                    initSublist(type[0], index, subIndex);
                    await appendCollection(
                        [index, subIndex],
                        name,
                        type,
                        expandClass
                    );
                    resolve();
                    return;
                } else {
                    // console.log(subIndex)
                    if (typeof subIndex === 'undefined') {
                        thisSubIndex = shipCollections[index].list.length;
                        initSublist(type, index, thisSubIndex);
                    } else {
                        thisSubIndex = subIndex;
                    }
                }

                // const thisExpandClass = expandClass || type === 31;
                const thisExpandClass = expandClass;

                // console.log(name.zh_cn, type, thisExpandClass, index, thisSubIndex)

                const ships = await db.ships
                    .cfind({ type: type })
                    .sort({
                        class: 1,
                        class_no: 1,
                        'name.ja_jp': 1,
                        'name.suffix': 1,
                        series: 1,
                        suffix: 1,
                        id: 1,
                        time_created: 1,
                    })
                    .exec();

                if (!shipClassInited[index]) shipClassInited[index] = [];
                // if (thisExpandClass) thisSubIndex = -1

                // console.log(ships.map(ship => ship._navy))
                try {
                    ships
                        // .sort((a, b) => (
                        //     data.ships[a.id].series !== data.ships[b.id].series
                        //         ? 1
                        //         : 0
                        //     // getShip(a).series - getShip(b).series
                        // ))
                        // .sort((a, b) => {
                        //     const navyA = data.ships[a.id]._navy || 'ijn'
                        //     const navyB = data.ships[b.id]._navy || 'ijn'
                        //     if (navyA === 'ijn') return -1
                        //     if (navyB === 'ijn') return 1
                        //     if (navyA < navyB) return -1
                        //     if (navyA > navyB) return 1
                        //     return 0;
                        // })
                        .forEach((ship) => {
                            const series = ship.series;
                            let listSeries;

                            if (
                                thisExpandClass &&
                                shipClassInited[index].indexOf(ship.class) < 0
                            ) {
                                // console.log(ship.class)
                                thisSubIndex = shipClassInited[index].length;
                                // thisSubIndex++
                                // classIndex[ship.class_no] = thisSubIndex
                                shipCollections[index].list[thisSubIndex] = {
                                    type: type,
                                    class: ship.class,
                                    ships: [],
                                };
                                shipSeriesInCollection[index][thisSubIndex] =
                                    {};
                                shipClassInited[index].push(ship.class);
                            }

                            if (
                                typeof shipSeriesInCollection[index][
                                    thisSubIndex
                                ][series] === 'undefined'
                            ) {
                                const i =
                                    shipCollections[index].list[thisSubIndex]
                                        .ships.length;
                                shipSeriesInCollection[index][thisSubIndex][
                                    series
                                ] = i;
                                shipCollections[index].list[thisSubIndex].ships[
                                    i
                                ] = [];
                                listSeries =
                                    shipCollections[index].list[thisSubIndex]
                                        .ships[i];
                            } else {
                                listSeries =
                                    shipCollections[index].list[thisSubIndex]
                                        .ships[
                                        shipSeriesInCollection[index][
                                            thisSubIndex
                                        ][series]
                                    ];
                            }

                            listSeries[shipSeries[series].indexOf(ship.id)] =
                                ship;

                            // console.log(listSeries)
                        });
                } catch (e) {
                    console.error(e);
                }

                shipTypesAppended.push(type);

                resolve();
            })
    );

    await Promise.all(promises);
};

const initDatabase = async (dbpath) => {
    const raw = {};
    const dbnames = [
        'ships',
        'ship_types',
        'ship_classes',
        'ship_namesuffix',
        'ship_series',
        'items',
        'item_types',
        'entities',
        'consumables',
        'exillusts',
        'exillust_types',
    ];

    for (const dbname of dbnames) {
        const type = camelCase(dbname);
        raw[type] = await new Promise((resolve, reject) => {
            fs.readFile(
                path.resolve(dbpath, `./${dbname}.nedb`),
                'utf-8',
                (err, data) => {
                    if (err) reject(err);
                    else resolve(data);
                }
            );
        });
    }

    return kckit.parseRaw(raw);
};

module.exports = async (dbpath, topath) => {
    // console.log('  > Creating ship collections...')

    data = await initDatabase(dbpath);
    kckit.register({
        db: data,
    });
    // console.log(data.ships)

    // 初始化db
    db.ships = new Datastore({
        filename: path.resolve(dbpath, 'ships.nedb'),
        autoload: true,
    });
    db.shipTypeCollections = new Datastore({
        filename: path.resolve(dbpath, 'ship_type_collections.nedb'),
        autoload: true,
    });
    db.shipSeries = new Datastore({
        filename: path.resolve(dbpath, 'ship_series.nedb'),
        autoload: true,
    });

    // 载入所有shipTypeCollections数据，生成简易表
    const shipTypeCollections = await db.shipTypeCollections
        .cfind({})
        .sort({ id: 1 })
        .projection({ name: 1, types: 1, _id: 0 })
        .exec();

    // 载入所有shipSeries数据，生成简易表
    const series = await db.shipSeries.cfind({}).exec();
    series.forEach((doc) => {
        shipSeries[parseInt(doc.id)] = doc.ships.map((ship) => ship.id);
    });

    // 根据已载入数据生成collection
    await Promise.all(
        shipTypeCollections.map(
            async (collection, index) =>
                new Promise(async function (resolve /*, reject*/) {
                    await appendCollection(
                        index,
                        collection.name,
                        collection.types
                    );
                    resolve();
                })
        )
    );

    // 从db载入未处理过的舰娘，加入到collection中
    const shipsRemains = await db.ships
        .cfind({
            type: { $nin: shipTypesAppended },
        })
        .exec();
    if (Array.isArray(shipsRemains) && shipsRemains.length) {
        // console.log(shipsRemains, shipsRemains.map(ship => [ship]))
        shipCollections[shipCollections.length - 1].list.push({
            type: null,
            ships: shipsRemains.map((ship) => [ship]),
        });
    }

    // 将空数据过滤删除
    shipCollections = shipCollections.filter((collection) => {
        collection.list = collection.list.filter((types) => {
            types.ships = types.ships.filter((series) => series.length > 0);
            return types.ships.length > 0;
        });
        return collection.list.length > 0;
    });

    // 遍历全部collection，根据海军排序
    shipCollections.forEach((collection, indexCollection) => {
        collection.list.forEach((shipType, indexShipType) => {
            shipType.ships.filter((arr) => Array.isArray(arr) && arr.length);
            shipType.ships.forEach((series, indexSeries) => {
                shipCollections[indexCollection].list[indexShipType].ships[
                    indexSeries
                ] = series.filter((ship) => (ship ? true : false));
            });
        });
        if (collection.list[0].class) {
            collection.list.sort((a, b) => {
                const classA = a.class;
                const classB = b.class;

                if (sortDD.includes(classA) && sortDD.includes(classB)) {
                    return sortDD.indexOf(classA) - sortDD.indexOf(classB);
                }

                const shipA = a.ships[0][0];
                const shipB = b.ships[0][0];
                const navyA = data.ships[shipA.id]._navy || 'ijn';
                const navyB = data.ships[shipB.id]._navy || 'ijn';
                if (navyA === 'ijn' && navyB === 'ijn')
                    return a.class - b.class;
                if (navyA < navyB) return -1;
                if (navyA > navyB) return 1;
                return 0;
            });
        } else {
            collection.list.forEach((shipType) => {
                shipType.ships.sort((a, b) => {
                    // console.log(a)
                    const navyA = data.ships[a[0].id]._navy || 'ijn';
                    const navyB = data.ships[b[0].id]._navy || 'ijn';
                    if (navyA === 'ijn' && navyB === 'ijn')
                        return (
                            data.ships[a[0].id].class -
                            data.ships[b[0].id].class
                        );
                    // if (navyA === 'ijn') return 0
                    // if (navyB === 'ijn') return 0
                    if (navyA < navyB) return -1;
                    if (navyA > navyB) return 1;
                    return 0;
                });
            });
        }
    });

    // 处理子舰种
    async function addSubType(
        searchForCollectionName,
        searchForTypeId,
        subType,
        nameType,
        filterShip
    ) {
        function getSubTypeNameObject(subType) {
            const obj = {};
            for (const [localeId, strings] of Object.entries(subTypes)) {
                obj[localeId] = strings[nameType ?? subType];
            }
            return obj;
        }

        const subTypeName = getSubTypeNameObject(subType);
        // const typeName = await db.shipTypes.find({ id: searchForTypeId }).name;

        if (typeof filterShip !== 'function')
            filterShip = (ship) => getShipSubType(ship) === subType;

        shipCollections.some(({ name, list }) => {
            if (
                Object.values(name).every(
                    (name) => name !== searchForCollectionName
                )
            )
                return false;

            // 名称匹配，继续
            return list.some(({ type, ships, isSubType = false }, index) => {
                if (isSubType) return false;
                if (type !== searchForTypeId) return false;

                // 舰种ID匹配，继续
                const newShips = [];
                ships.forEach((ships) => {
                    const ids = ships.map((ship) => ship.id);
                    const result = [];
                    ships
                        .map((data) => new Ship(data))
                        .filter(filterShip)
                        .forEach((ship) => {
                            result.push(ship);
                            const index = ids.indexOf(ship.id);
                            ids.splice(index, 1);
                            ships.splice(index, 1);
                        });
                    if (result.length) newShips.push(result);
                });
                list[index].ships = ships.filter((ships) => ships.length > 0);

                list.splice(index, 0, {
                    type,
                    name: subTypeName,
                    ships: newShips,
                    isSubType: true,
                });

                return true;
            });
        });
    }
    await addSubType('航空母舰', 10, 'ModernizedCarrier');
    await addSubType('航空母舰', 10, 'NightCarrier');
    await addSubType('航空母舰', 9, 'NightCarrier', 'LightNightCarrier');
    await addSubType('航空母舰', 9, 'LightBattleCarrier');
    await addSubType('航空母舰', 9, 'SpecialRevisedCarrier');
    await addSubType('航空母舰', 9, 'EscortCarrier');
    await addSubType('航空母舰', 9, 'AssultCarrier');

    // 遍历全部collection，将ship object替换为shipId，并生成可读版
    shipCollections.forEach((collection, indexCollection) => {
        shipCollectionsPretty[indexCollection] = {
            name: collection.name.ja_jp,
            list: [],
        };
        collection.list.forEach((shipType, indexShipType) => {
            shipCollectionsPretty[indexCollection].list[indexShipType] = {
                type: shipType.type,
                ships: [],
            };
            if (shipType.class)
                shipCollectionsPretty[indexCollection].list[
                    indexShipType
                ].class = shipType.class;
            shipType.ships.forEach((series, indexSeries) => {
                shipCollectionsPretty[indexCollection].list[
                    indexShipType
                ].ships[indexSeries] = series
                    .filter((ship) => (ship ? true : false))
                    .map(
                        (ship) =>
                            `${ship.name.ja_jp} (ID: ${ship.id}, Suffix: ${ship.name.suffix}, Series: ${ship.series})`
                    );
                shipCollections[indexCollection].list[indexShipType].ships[
                    indexSeries
                ] = series
                    .filter((ship) => (ship ? true : false))
                    .map((ship) => ship.id);
            });
        });
    });

    // 写入文件
    fs.writeFileSync(
        path.resolve(topath, 'ship_collections.json'),
        // LZString.compressToEncodedURIComponent(shipCollections),
        JSON.stringify(shipCollections),
        'utf-8'
    );
    fs.writeFileSync(
        path.resolve(topath, 'ship_collections_pretty.json'),
        // LZString.compressToEncodedURIComponent(shipCollections),
        jsonPretty(shipCollectionsPretty),
        'utf-8'
    );

    // console.log('    > COMPLETE')
};
