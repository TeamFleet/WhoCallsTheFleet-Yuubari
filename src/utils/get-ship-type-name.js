import { get } from 'kckit';
import db from '@database';
import getShipSubType from '@api/get-ship-sub-type';

/**
 * @typedef {Object} Ship
 */

/**
 * 获取舰种名。附属舰种会返回主舰种名，如
 * - 防空驱逐舰 -> 驱逐舰
 * - 特设航空母舰 -> 轻型航母
 * @param {Ship} ship
 * @returns {string}
 */
const getShipTypeName = (ship) => {
    if (!ship) return '';

    ship = get.ship(ship);

    if (!ship) return '';

    const subType = getShipSubType(ship);
    // console.log({ subType });
    if (subType) return __('ship_sub_types', subType);

    // if (ship.type && ship.type_display && ship.type !== ship.type_display)
    //     return db.shipTypes[ship.type_display]._name + ' (' + ship._type + ')'
    if (ship.type === 19) return db.shipTypes[1]._name;
    if (ship.type && ship.type_display && ship.type !== ship.type_display)
        // return db.shipTypes[ship.type_display]._name + ' (' + ship._type + ')'
        return db.shipTypes[ship.type_display]._name;
    if (ship.type) return ship._type;
    return '';
};

export default getShipTypeName;
