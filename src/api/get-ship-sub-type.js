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
const getShipSubType = (_ship, capability, equipments) => {
    const ship = getShip(_ship);
    const isCarrier = ship.isType('carrier');
    const isLightCarrier = ship.canEquip(33);

    if (typeof ship.__SUBTYPE === 'string') return ship.__SUBTYPE;

    if (
        isCarrier &&
        typeof ship.capabilities === 'object' &&
        !!ship.capabilities.count_as_night_operation_aviation_personnel
    )
        ship.__SUBTYPE = 'NightCarrier';
    else if (
        isCarrier &&
        !isLightCarrier &&
        typeof ship.stat.asw === 'number' &&
        ship.stat.asw > 0
    )
        ship.__SUBTYPE = 'ModernizedCarrier';
    else if (
        isCarrier &&
        isLightCarrier &&
        typeof ship.stat.asw === 'number' &&
        ship.stat.asw > 0
    )
        ship.__SUBTYPE = 'EscortCarrier';
    else if (
        isCarrier &&
        typeof ship.capabilities === 'object' &&
        !!ship.capabilities.attack_surface_ship_prioritised
    )
        ship.__SUBTYPE = 'AssultCarrier';

    return ship.__SUBTYPE;
};

module.exports = getShipSubType;
