import { parseRaw } from 'kckit';
import getNeDB from '__FLEET_GET_NEDB__';

import ShipCollections from './json/ship_collections.json';
import EquipmentCollections from './json/equipment_collections.json';
import parseLocaleId from './parse-locale-id';

export default (store) => {
    const raw = {
        ships: getNeDB('ships'),
        shipTypes: getNeDB('ship_types'),
        shipClasses: getNeDB('ship_classes'),
        shipNamesuffix: getNeDB('ship_namesuffix'),
        shipSeries: getNeDB('ship_series'),

        exillusts: getNeDB('exillusts'),
        exillustTypes: getNeDB('exillust_types'),

        equipments: getNeDB('items'),
        equipmentTypes: getNeDB('item_types'),

        entities: getNeDB('entities'),

        consumables: getNeDB('consumables'),

        arsenalAll: getNeDB('arsenal_all'),
        arsenalDays: getNeDB('arsenal_weekday').replace(
            /"weekday":([0-9])/g,
            '"weekday":$1,"id":$1'
        ),
    };

    const db = parseRaw(raw);

    // 处理 database
    const requireCollection = (type, defaults) => {
        if (__DEV__ && __SERVER__)
            return require('fs-extra').readJsonSync(
                require('path').resolve(
                    __dirname,
                    `./json/${type}_collections.json`
                )
            );
        return defaults;
    };
    const shipCollections = requireCollection('ship', ShipCollections);
    const equipmentCollections = requireCollection(
        'equipment',
        EquipmentCollections
    );

    // shipCollections
    {
        db.shipsSpecial = {};

        let shipIndex = 0;
        shipCollections.forEach((collection) => {
            collection.names = { ...collection.name };
            Object.defineProperty(collection, 'name', {
                get: () =>
                    collection.names[parseLocaleId(store.getState().localeId)],
            });
            collection.list.forEach((list) => {
                list.ships.forEach((arrShips, index) => {
                    list.ships[index] = arrShips.map((shipId) => {
                        const ship = db.ships[shipId];
                        // if (!ship) return
                        Object.assign(ship, {
                            type_display: list.type,
                            order: shipIndex++,
                        });
                        if (!db.shipsSpecial[list.type])
                            db.shipsSpecial[list.type] = [];
                        if (
                            !db.shipsSpecial[list.type].includes(shipId) &&
                            ((Array.isArray(ship.additional_item_types) &&
                                ship.additional_item_types.length) ||
                                (Array.isArray(
                                    ship.additional_disable_item_types
                                ) &&
                                    ship.additional_disable_item_types.length))
                        ) {
                            db.shipsSpecial[list.type].push(shipId);
                        }
                        return ship;
                    });
                });
            });
        });

        db.shipCollections = shipCollections;
    }

    // equipment collections
    {
        let equipmentTypeIndex = 0;
        let equipmentIndex = 0;
        equipmentCollections.forEach((collection) => {
            collection.names = { ...collection.name };
            Object.defineProperty(collection, 'name', {
                get: () =>
                    collection.names[parseLocaleId(store.getState().localeId)],
            });
            collection.list.forEach((list) => {
                Object.assign(db.equipmentTypes[list.type], {
                    order: equipmentTypeIndex++,
                });
                list.equipments = list.equipments.map((equipmentId) => {
                    // if (!db.equipments[equipmentId]) return {}
                    Object.assign(db.equipments[equipmentId], {
                        order: equipmentIndex++,
                    });
                    return db.equipments[equipmentId];
                });
            });
        });

        db.equipmentCollections = equipmentCollections;
    }

    // equipment types
    {
        db.equipmentTypesExclude = [];
        const cache = [];
        for (const id in db.equipmentTypes) {
            const type = db.equipmentTypes[id];
            if (type.id === 59) continue; // 陸軍戦闘機
            if (cache.includes(type.id_ingame)) {
                db.equipmentTypesExclude.push(type.id);
            } else {
                cache.push(type.id_ingame);
            }
        }
    }

    // arsenal-all
    {
        const arsenalAll = [];
        for (const id in db.arsenalAll) {
            arsenalAll.push(db.arsenalAll[id]);
        }
        arsenalAll.sort((a, b) => a.sort - b.sort);
        db.arsenalAll = arsenalAll.map((obj) => obj.id);
    }

    // arsenal-days
    {
        const days = [];
        for (const id in db.arsenalDays) {
            days[db.arsenalDays[id].weekday] = db.arsenalDays[id].improvements;
        }
        db.arsenalDays = days;
    }

    // CG Maps ================================================================
    db.cgmaps = {
        entities: getNeDB('map_entities', 'json'),
        equipments: getNeDB('map_equipments', 'json'),
        shipsExtra: getNeDB('map_ships_extra', 'json'),
        ships: getNeDB('map_ships', 'json'),
    };

    return {
        raw,
        db,
    };
};
