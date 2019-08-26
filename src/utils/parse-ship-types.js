/**
 * @typedef {number} ShipTypeId
 */
/**
 * @typedef {string} ShipTypeName
 */

const shipTypes = require('kckit/src/types/ships');

const ensureArray = require('./ensure-array');

/**
 * 处理输入，返回舰娘类型列表
 * @param {ShipTypeId|ShipTypeId[]|ShipTypeName|ShipTypeName[]} shipType
 * @returns {ShipTypeId[]} 类型ID列表
 */
const parseShipTypes = shipType => {
    if (typeof shipType === 'undefined') return [];

    return ensureArray(shipType).reduce((arr, type) => {
        if (isNaN(type)) {
            if (shipTypes.includes(type))
                return [...new Set([...arr, ...shipTypes[type]])];
        } else {
            arr.push(parseInt(type));
        }
        return arr;
    }, []);
};

module.exports = parseShipTypes;
