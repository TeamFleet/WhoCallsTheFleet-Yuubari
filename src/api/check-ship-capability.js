import kckit from 'kckit';

const getShip = kckit.get.ship;
const getEquipment = kckit.get.equipment;

/**
 * 检查给定舰娘是否有某项能力
 * @param {Number|Ship} ship
 * @param {String} capability
 * @param {Array} [equipments]
 * @returns {Boolean|Array} 是否有该项能力，如果有，结果有可能是 Array，其内包含需要的装备类型和额外装备
 */
const checkShipCapability = (_ship, capability, equipments) => {
    const ship = getShip(_ship);

    if (typeof ship.__CAPABILITIES !== 'object') ship.__CAPABILITIES = {};

    const capabilities = ship.__CAPABILITIES;

    if (__DEV__ || typeof capabilities[capability] === 'undefined') {
        switch (capability) {
            case 'AAPropellantBarrage': {
                const level = ship.getCapability('anti_air_rocket_barrage');
                if (level) {
                    capabilities[capability] = {
                        equipments: ['_274']
                    };
                    if (level === 'high')
                        capabilities[capability].chance = 'high';
                } else {
                    capabilities[capability] = false;
                }
                break;
            }
            default: {
                if (equipments) {
                    const req = filterEquipmentTypes(ship, equipments);
                    capabilities[capability] = req.length
                        ? {
                              equipments: req
                          }
                        : false;
                } else {
                    capabilities[capability] = false;
                }
            }
        }
    }

    return capabilities[capability];
};

/**
 * 针对给定舰娘，过滤装备类型，追加满足条件的额外装备
 * @param {Number|Ship} ship
 * @param {Number[]|String[]} equipmentTypes
 * @returns {Array}
 */
const filterEquipmentTypes = (_ship, equipmentTypes) => {
    const ship = getShip(_ship);
    if (!Array.isArray(equipmentTypes)) equipmentTypes = [equipmentTypes];

    // 过滤目标装备类型，保留给定舰娘可装备的
    const result = equipmentTypes.filter(t => ship.canEquip(t, true));

    // 检查额外可配置的装备，如果有目标装备类型的，追加到结果中
    const { additional_items: extra = [] } = ship;
    extra.forEach(e => {
        const equipment = getEquipment(e);
        if (
            equipmentTypes.some(t => {
                if (isNaN(t)) return equipment.isType(t);
                return equipment.type === t;
            })
        ) {
            result.push(`_${equipment.id}`);
        }
    });

    return result;
};

export default checkShipCapability;
