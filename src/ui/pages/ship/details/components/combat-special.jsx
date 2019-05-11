import React from 'react';
// import classNames from 'classnames'
import { extend } from 'koot';
import kckit from 'kckit';

import db from '@database';
import getEquipmentTypesFromCondition from '@utils/get-equipment-types-from-condition';

import ComponentContainer from '@ui/containers/infos-component';
import Bullet from '@ui/components/bullet';
import IconEquipment from '@ui/components/icon-equipment';
import LinkEquipment from '@ui/components/link/equipment';

// const checkShip = kckit.check.ship
const checkAACI = kckit.check.aaci;
const checkOASW = kckit.check.oasw;
const checkOTS = kckit.check.ots;

const shipTypeRangeNormal = {
    BB: 3,
    CV: 1,
    CL: 2,
    CA: 2,
    DD: 1
};

//

const CombatSpecial = extend({
    styles: require('./combat-special.less')
})(({ className, ship }) => (
    <ComponentContainer
        className={className}
        title={__('ship_details.combat_capabilities')}
    >
        {/* <h4>航空战</h4> */}
        {/* 参与航空战 */}
        {/* - 需装备 */}
        <CapabilityJetAssult ship={ship} />
        {/* 空袭 */}
        {/* - 需装备 */}
        {/* <h4>防空</h4> */}
        <CapabilityAACI ship={ship} />
        <CapabilityAARocketBarrage ship={ship} />
        {/* <h4>昼战</h4> */}
        <CapabilityOASW ship={ship} />
        <CapabilityOTS ship={ship} />
        {/* 参与炮击战 */}
        {/* - 射程 */}
        <CapabilitySpecialRange ship={ship} />
        {/* 参与雷击战 */}
        <CapabilityTorpedo ship={ship} />
        {/* <h4>夜战</h4> */}
        {/* 参与夜战 */}
        <CapabilityNightAirAssult ship={ship} />
        <CapabilityNoNightBattle ship={ship} />
    </ComponentContainer>
));
export default CombatSpecial;

//

const CapabilityJetAssult = ({ ship }) => {
    const able = ship.isType('carrier') && ship.canEquip('Jets');
    return (
        <Bullet title={__('combat_phases.jet')} level={able ? true : 0}>
            {able && __('require.equipment', { type: '' })}
            {able && (
                <IconEquipment className="equipment" icon={39}>
                    {__('equipment_types.jet')}
                </IconEquipment>
            )}
        </Bullet>
    );
};

const CapabilityAACI = ({ ship }) => {
    const aaciTypes = checkAACI(ship.id);
    const able = Array.isArray(aaciTypes) && aaciTypes.length ? true : false;

    return (
        <Bullet title={__('aaci.title')} level={able ? true : 0}>
            {/* {able && __("ship_details.see_below_for_required_equipment_types")} */}
        </Bullet>
    );
};

const CapabilityAARocketBarrage = ({ ship }) => {
    let level = ship.getCapability('anti_air_rocket_barrage');
    switch (level) {
        case true: {
            level = 1;
            break;
        }
        case 'high': {
            level = 2;
            break;
        }
        default: {
        }
    }
    const able = level ? true : false;
    return (
        <Bullet
            title={__('combat_phases.anti_air_rocket_barrage')}
            level={level || 0}
        >
            {able && __('require.equipment', { type: '' })}
            {able && (
                <LinkEquipment
                    className="color-alt link-equipment"
                    equipment={274}
                />
            )}
        </Bullet>
    );
};

const CapabilitySpecialRange = ({ ship }) => {
    let defaultRange;

    Object.keys(shipTypeRangeNormal).some(type => {
        if (
            ship.isType(type) &&
            ship.stat.range !== shipTypeRangeNormal[type]
        ) {
            defaultRange = shipTypeRangeNormal[type];
            return true;
        }
        return false;
    });

    if (typeof defaultRange === 'undefined') return null;

    return (
        <Bullet
            title={__('ship_details.range_different_title', {
                range: ship._range
            })}
            level={ship.stat.range > defaultRange ? 2 : 1}
        >
            {__('ship_details.range_different_note', {
                range: kckit.get.range(defaultRange),
                type: db.shipTypes[ship.type_display]._name
            })}
        </Bullet>
    );
};

const CapabilityOASW = ({ ship }) => {
    const statASW99 = ship.getAttribute('asw', 99);

    if (statASW99 === false) return null;
    if (statASW99 === undefined)
        return <Bullet title={__('combat_phases.oasw')} level={-1} />;

    const oaswTable = checkOASW(ship.id) || [];
    const canAlways = oaswTable === true;
    const canOASW =
        canAlways || (Array.isArray(oaswTable) && oaswTable.length)
            ? true
            : false;

    return (
        <Bullet
            title={__('combat_phases.oasw')}
            level={canOASW ? (canAlways ? 2 : 1) : 0}
        >
            {canOASW && canAlways && __('ship_details.can_always_perform')}
            {canOASW &&
                !canAlways &&
                oaswTable.length > 1 &&
                __('ship_details.meet_one_requirements_below')}
            {canOASW &&
                !canAlways &&
                oaswTable.map((OASW, index) => {
                    const statsWithEquipments = [];
                    let equipmentRequired = [];
                    if (
                        OASW.shipWithEquipments &&
                        OASW.shipWithEquipments.hasStat
                    ) {
                        for (let stat in OASW.shipWithEquipments.hasStat) {
                            if (
                                ship.getAttribute(stat, ship._minLv) <
                                OASW.shipWithEquipments.hasStat[stat]
                            )
                                statsWithEquipments.push([
                                    stat,
                                    OASW.shipWithEquipments.hasStat[stat]
                                ]);
                        }
                    }
                    if (OASW.equipments) {
                        const equipments = Object.assign({}, OASW.equipments);
                        for (let condition in equipments) {
                            if (
                                typeof equipments[condition] === 'object' &&
                                equipments[condition].hasStat
                            ) {
                                let stat = [];
                                for (let key in equipments[condition].hasStat) {
                                    stat[0] = key;
                                    stat[1] =
                                        equipments[condition].hasStat[key];
                                }
                                const eType = __(
                                    'equipment_types',
                                    condition.substr(3).toLocaleLowerCase()
                                );
                                if (condition.substr(0, 3) === 'has' && eType) {
                                    equipmentRequired.push([eType, stat]);
                                } else {
                                    equipmentRequired.push([
                                        getEquipmentTypesFromCondition({
                                            [condition]: true
                                        })[0],
                                        stat
                                    ]);
                                }
                                delete equipments[condition];
                            }
                        }
                        equipmentRequired = equipmentRequired.concat(
                            getEquipmentTypesFromCondition(equipments)
                        );
                        if (OASW.equipments.hasNameOf === '九三一空')
                            equipmentRequired.push('九三一空');
                    }
                    return (
                        <ul key={index} className="requirement">
                            {oaswTable.length > 1 && `#${index + 1}`}
                            {statsWithEquipments.map((stat, indexStat) => (
                                <li key={`${index}-${indexStat}`}>
                                    {__('require.ship_stat_with_equipments', {
                                        stat: __(`stat`, stat[0]),
                                        value: stat[1]
                                    })}
                                </li>
                            ))}
                            {equipmentRequired.map((type, indexType) => {
                                if (type === '九三一空')
                                    return (
                                        <li key={`${index}-${indexType}`}>
                                            {__('require.equipment', {
                                                type: ''
                                            })}
                                            <IconEquipment
                                                className="equipment"
                                                icon={8}
                                            >
                                                九三一空
                                            </IconEquipment>
                                        </li>
                                    );
                                else if (Array.isArray(type)) {
                                    // console.log(type)
                                    return (
                                        <li key={`${index}-${indexType}`}>
                                            {__('require.equipment', {
                                                type: ''
                                            })}
                                            {typeof type[0] === 'number' && (
                                                <IconEquipment
                                                    className="equipment"
                                                    icon={
                                                        db.equipmentTypes[
                                                            type[0]
                                                        ].icon
                                                    }
                                                >
                                                    {
                                                        db.equipmentTypes[
                                                            type[0]
                                                        ]._name
                                                    }
                                                </IconEquipment>
                                            )}
                                            {typeof type[0] === 'string' &&
                                                type[0]}
                                            {' (' +
                                                __('require.has_stat', {
                                                    stat: __(
                                                        `stat`,
                                                        type[1][0]
                                                    ),
                                                    value: type[1][1]
                                                }) +
                                                ')'}
                                        </li>
                                    );
                                } else
                                    return (
                                        <li key={`${index}-${indexType}`}>
                                            {__('require.equipment_type', {
                                                type: ''
                                            })}
                                            <IconEquipment
                                                className="equipment"
                                                icon={
                                                    db.equipmentTypes[type].icon
                                                }
                                            >
                                                {db.equipmentTypes[type]._name}
                                            </IconEquipment>
                                        </li>
                                    );
                            })}
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

const CapabilityOTS = ({ ship }) => {
    const statTorpedo99 = ship.getAttribute('torpedo', 99);
    if (statTorpedo99 === false) return null;

    const otsTable = checkOTS(ship.id) || [];
    const canAlways = otsTable === true;
    const canOTS =
        canAlways || (Array.isArray(otsTable) && otsTable.length)
            ? true
            : false;
    return (
        <Bullet
            title={__('combat_phases.ots')}
            level={canOTS ? (canAlways ? 2 : 1) : 0}
        >
            {canOTS && canAlways && __('ship_details.can_always_perform')}
            {canOTS &&
                !canAlways &&
                otsTable.length > 1 &&
                __('ship_details.meet_one_requirements_below')}
            {canOTS &&
                !canAlways &&
                otsTable.map((OTS, index) => {
                    let equipmentRequired = [];
                    if (OTS.equipments) {
                        equipmentRequired = getEquipmentTypesFromCondition(
                            OTS.equipments
                        );
                    }
                    return (
                        <ul key={index} className="requirement">
                            {otsTable.length > 1 && `#${index + 1}`}
                            {equipmentRequired.map((type, indexType) => (
                                <li
                                    key={`${index}-${indexType}`}
                                    data-type={type}
                                >
                                    {__('require.equipment_type', { type: '' })}
                                    <IconEquipment
                                        className="equipment"
                                        icon={db.equipmentTypes[type].icon}
                                    >
                                        {db.equipmentTypes[type]._name}
                                    </IconEquipment>
                                </li>
                            ))}
                            {OTS.ship && OTS.ship.minLevel && (
                                <li>
                                    {__('require.level', {
                                        level: OTS.ship.minLevel
                                    })}
                                </li>
                            )}
                        </ul>
                    );
                })}
        </Bullet>
    );
};

const CapabilityTorpedo = ({ ship }) => {
    const isBattleship = ship.isType('battleship');
    const statTorpedo99 = ship.getAttribute('torpedo', 99);
    if (!isBattleship || statTorpedo99 === false) return null;
    return <Bullet title={__('combat_phases.torpedo')} level={2} />;
};

const CapabilityNightAirAssult = ({ ship }) => {
    const isCarrier = ship.isType('carrier');
    if (!isCarrier) return null;

    const {
        count_as_night_operation_aviation_personnel,
        participate_night_battle_when_equip_swordfish
    } = ship.getCapability();

    if (count_as_night_operation_aviation_personnel) {
        const equipment = db.equipments[258]; // 夜間作戦航空要員
        return (
            <Bullet title={__('combat_phases.night_air_assault')} level={2}>
                {__('require.equipment_no_need', { type: '' })}
                <IconEquipment className="equipment" icon={equipment._icon}>
                    {equipment._name}
                </IconEquipment>
            </Bullet>
        );
    }

    if (ship.stat.fire || ship.stat.torpedo) {
        return (
            <Bullet title={__('combat_phases.night')} level={1}>
                {__('ship_details.carrier_default_night_battle')}
            </Bullet>
        );
    }

    if (participate_night_battle_when_equip_swordfish) {
        const equipment = db.equipments[242]; // Swordfish
        return (
            <Bullet title={__('combat_phases.night')} level={1}>
                {__('ship_details.carrier_swordfish_night_battle')}
                <br />
                {__('require.equipment', { type: '' })}
                <IconEquipment className="equipment" icon={equipment._icon}>
                    {__('equipment_series', {
                        equipment: equipment._name
                    })}
                </IconEquipment>
            </Bullet>
        );
    }

    return null;
};

const CapabilityNoNightBattle = ({ ship }) => {
    const isCarrier = ship.isType('carrier');
    if (isCarrier || ship.stat.fire + ship.stat.torpedo > 0) return null;
    return <Bullet title={__('combat_phases.night')} level={0} />;
};

// const Capability = ({ ship }) => {
//     return (
//         '1'
//     )
// }
