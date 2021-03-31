/**
 * @typedef {"NightCarrier"|"ModernizedCarrier"|"EscortCarrier"|"AssultCarrier"} ShipSubType
 */

const kckit = require('kckit');

const getShip = kckit.get.ship;

/**
 * 获取给定舰娘的子舰种
 * @param {number|Ship} ship
 * @returns {void|ShipSubType} 子舰种特征值
 */
const getShipSubType = (_ship, capability, equipments) =>
    getShip(_ship)._subType;

module.exports = getShipSubType;
