import React from 'react';

import db from '@database';

import IconEquipment from '@ui/components/icon-equipment';
import Bullet from '@ui/components/bullet';
import Requirements from './_requirements';

export default ({ ship }) => {
    if (ship.isType('carrier')) {
        const {
            count_as_night_operation_aviation_personnel,
            participate_night_battle_when_equip_swordfish
        } = ship.getCapability();
        const equipmentSwordfish = db.equipments[242];
        const equipmentNightOperationAviationPersonnel = db.equipments[258];

        return (
            <React.Fragment>
                {ship.stat.fire || ship.stat.torpedo ? (
                    <Bullet
                        title={__('combat_phases.night.participate')}
                        level={true}
                    >
                        {__('ship_details.carrier_default_night_battle')}
                    </Bullet>
                ) : null}
                {participate_night_battle_when_equip_swordfish ? (
                    <Bullet
                        title={__(
                            'combat_phases.night.night_swordfish_assault'
                        )}
                        level="indeterminate"
                    >
                        {__('ship_details.carrier_swordfish_night_battle')}
                        <br />
                        {__('require.equipment', { type: '' })}
                        <IconEquipment
                            className="equipment"
                            icon={equipmentSwordfish._icon}
                        >
                            {__('equipment_series', {
                                equipment: equipmentSwordfish._name
                            })}
                        </IconEquipment>
                    </Bullet>
                ) : null}
                <Bullet
                    title={__('combat_phases.night_air_assault')}
                    level="indeterminate"
                >
                    {count_as_night_operation_aviation_personnel ? null : (
                        <span>
                            {__('require.equipment', { type: '' })}
                            <IconEquipment
                                className="equipment"
                                icon={
                                    equipmentNightOperationAviationPersonnel._icon
                                }
                            >
                                {equipmentNightOperationAviationPersonnel._name}
                            </IconEquipment>
                        </span>
                    )}
                    <span className="no-margin-top">
                        <Requirements
                            requirements={{
                                equipments: {
                                    hasOneOf: [
                                        'CarrierFighterNight',
                                        'TorpedoBomberNight'
                                    ]
                                }
                            }}
                            ship={ship}
                        />
                    </span>
                </Bullet>
            </React.Fragment>
        );
    } else {
        return (
            <Bullet
                title={__('combat_phases.night.participate')}
                level={Boolean(ship.stat.fire + ship.stat.torpedo > 0)}
            />
        );
    }
};
