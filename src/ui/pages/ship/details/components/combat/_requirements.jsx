import React from 'react';

import db from '@database';
import getEquipmentTypesFromCondition from '@utils/get-equipment-types-from-condition';

import IconEquipment from '@ui/components/icon-equipment';

/** 完整需求 */
const Requirements = ({ requirements = [], ship }) => {
    const arrRequirements = Array.isArray(requirements)
        ? requirements
        : [requirements];

    return (
        <React.Fragment>
            {arrRequirements.length > 1 &&
                __('ship_details.meet_one_requirements_below')}
            {arrRequirements.map((requirement, index) => {
                const {
                    shipWithEquipments = {},
                    equipments = {}
                } = requirement;

                /** 需要达到的属性值 (计算装备) */
                const statsRequired = {};
                if (shipWithEquipments.hasStat)
                    Object.entries(shipWithEquipments.hasStat).forEach(
                        ([stat, value]) => {
                            if (ship.getAttribute(stat, ship._minLv) < value)
                                statsRequired[stat] = value;
                        }
                    );

                /** 需要的特定装备和/或装备类型 */
                const equipmentsRequired = Object.entries(equipments).map(
                    ([condition, value]) => {
                        const getEquipmentRequirement = (condition, value) => {
                            const o = {};
                            const types = getEquipmentTypesFromCondition({
                                [condition]: value
                            });
                            if (Array.isArray(types)) {
                                if (types.length > 1) o.types = types;
                                else if (types.length) o.type = types[0];
                            }
                            if (
                                typeof value === 'object' &&
                                typeof value.hasStat === 'object'
                            ) {
                                o.hasStat = value.hasStat;
                            } else if (typeof value === 'number') {
                                o.count = value;
                            }
                            return o;
                        };
                        if (
                            condition === 'hasOneOf' &&
                            Array.isArray(value) &&
                            value.length
                        ) {
                            return {
                                oneOf: value.map(e =>
                                    getEquipmentRequirement(
                                        ...Object.entries(e)[0]
                                    )
                                )
                            };
                        }
                        return getEquipmentRequirement(condition, value);
                    }
                );

                return (
                    <ul
                        key={index}
                        className="requirement"
                        data-index={index + 1}
                    >
                        {arrRequirements.length > 1 && <em>#{index + 1}</em>}

                        {Object.entries(statsRequired).map(
                            ([stat, value], indexStat) => (
                                <li key={`${index}-${indexStat}`}>
                                    {__('require.ship_stat_with_equipments', {
                                        stat: __(`stat`, stat),
                                        value
                                    })}
                                </li>
                            )
                        )}

                        {equipmentsRequired.map((equipment = {}, indexType) => (
                            <li key={`${index}-${indexType}`}>
                                <EquipmentRequirement {...equipment} />
                            </li>
                        ))}

                        {requirement.minLv && (
                            <li>
                                {__('require.min_possible_level', {
                                    level: requirement.minLv || ship._minLv
                                })}
                            </li>
                        )}

                        {requirement.ship &&
                            requirement.ship.minLevel > ship._minLv && (
                                <li>
                                    {__('require.level', {
                                        level: requirement.ship.minLevel
                                    })}
                                </li>
                            )}
                    </ul>
                );
            })}
        </React.Fragment>
    );
};

export default Requirements;

//

const EquipmentRequirement = ({ type, types, oneOf, ...props }) => {
    if (!!type) {
        return (
            <React.Fragment>
                {__('require.equipment', { type: '' })}
                <EquipmentRequirementItem type={type} {...props} />
            </React.Fragment>
        );
    }

    if (Array.isArray(types) && types.length) {
        return (
            <React.Fragment>
                {__('require.equipment_at_least_one', { type: '' })}
                {types.map((type, index) => (
                    <React.Fragment key={index}>
                        <br />
                        <EquipmentRequirementItem type={type} {...props} />
                    </React.Fragment>
                ))}
            </React.Fragment>
        );
    }

    if (Array.isArray(oneOf) && oneOf.length) {
        return (
            <React.Fragment>
                {__('require.equipment_at_least_one', { type: '' })}
                {oneOf.map((props, index) => (
                    <React.Fragment key={index}>
                        <br />
                        <EquipmentRequirementItem {...props} />
                    </React.Fragment>
                ))}
            </React.Fragment>
        );
    }

    return null;
};

const EquipmentRequirementItem = ({ type, hasStat, count }) => (
    <React.Fragment>
        {typeof type === 'number' && (
            <IconEquipment
                className="equipment"
                icon={db.equipmentTypes[type].icon}
            >
                {db.equipmentTypes[type]._name}
            </IconEquipment>
        )}
        {typeof type === 'string' && type}
        {typeof hasStat === 'object' &&
            ` (${Object.entries(hasStat)
                .map(([stat, value]) =>
                    __('require.has_stat', {
                        stat: __(`stat`, stat),
                        value
                    })
                )
                .join(', ')})`}
        {typeof count === 'number' && ` x ${count}`}
    </React.Fragment>
);
