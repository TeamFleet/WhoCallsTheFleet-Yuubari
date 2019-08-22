import React from 'react';
import kckit from 'kckit';
import equipmentTypes from 'kckit/src/types/equipments';

import db from '@database';
import getEquipmentTypesFromCondition from '@utils/get-equipment-types-from-condition';

import IconEquipment from '@ui/components/icon-equipment';
import LinkEquipment from '@ui/components/link/equipment';

const getEquipmentType = kckit.get.equipmentType;

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
                const equipmentsRequired = Array.isArray(equipments)
                    ? equipments.length > 1
                        ? [
                              {
                                  oneOf: [...equipments]
                              }
                          ]
                        : [
                              {
                                  is: equipments[0]
                              }
                          ]
                    : Object.entries(equipments).map(([condition, value]) => {
                          const getEquipmentRequirement = (
                              condition,
                              value
                          ) => {
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
                                      typeof e === 'object'
                                          ? getEquipmentRequirement(
                                                ...Object.entries(e)[0]
                                            )
                                          : e
                                  )
                              };
                          }
                          return getEquipmentRequirement(condition, value);
                      });

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

const EquipmentRequirement = ({
    equipment,
    type,
    types,
    oneOf,
    is,
    ...props
}) => {
    if (/^_[0-9]+$/.test(equipment)) {
        return (
            <LinkEquipment
                className="color-alt-lighter link-equipment"
                equipment={equipment.substr(1)}
            />
        );
    } else if (!isNaN(equipment)) {
        type = getEquipmentType(equipment);
    } else if (equipment) {
        const t = equipmentTypes[equipment];
        if (Array.isArray(t)) {
            const t0 = getEquipmentType(t[0]);
            const types = __('equipment_types');
            let name = types[equipment];
            if (equipment === 'Jets') name = types.jet;
            return (
                <IconEquipment className="equipment" icon={t0.icon}>
                    {name}
                </IconEquipment>
            );
        }

        if (!isNaN(t)) {
            const tt = getEquipmentType(t);
            return (
                <IconEquipment className="equipment" icon={tt.icon}>
                    {tt._name}
                </IconEquipment>
            );
        }
    }

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
                        {typeof props === 'string' ? (
                            <EquipmentRequirement equipment={props} />
                        ) : (
                            <EquipmentRequirementItem {...props} />
                        )}
                    </React.Fragment>
                ))}
            </React.Fragment>
        );
    }

    if (is) {
        return (
            <React.Fragment>
                {__('require.equipment', { type: '' })}
                <EquipmentRequirement equipment={is} />
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
