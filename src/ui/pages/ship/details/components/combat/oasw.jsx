import React from 'react';

import db from '@database';
import checkShipCapability from '@api/check-ship-capability';
import getEquipmentTypesFromCondition from '@utils/get-equipment-types-from-condition';
import Bullet from '@ui/components/bullet';
import IconEquipment from '@ui/components/icon-equipment';

export default ({ ship }) => {
    const result = checkShipCapability(ship, 'OASW');
    const title = __('combat_phases.oasw');

    if (result === false) return <Bullet title={title} level={0} />;
    if (result === 'unknown') return <Bullet title={title} level="unknown" />;
    if (result === 'always') return <Bullet title={title} level="always" />;

    return (
        <Bullet title={title} level="indeterminate">
            {result.length > 1 &&
                __('ship_details.meet_one_requirements_below')}
            {result.map((OASW, index) => {
                const { shipWithEquipments = {}, equipments = {} } = OASW;

                /** 需要达到的属性值 (计算装备) */
                const statsRequired = {};
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

                console.log({ OASW, statsRequired, equipmentsRequired });
                return (
                    <ul key={index} className="requirement">
                        {result.length > 1 && `#${index + 1}`}

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

                        {OASW.minLv && (
                            <li>
                                {__('require.min_possible_level', {
                                    level: OASW.minLv || ship._minLv
                                })}
                            </li>
                        )}
                    </ul>
                );
            })}
        </Bullet>
    );
};

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
