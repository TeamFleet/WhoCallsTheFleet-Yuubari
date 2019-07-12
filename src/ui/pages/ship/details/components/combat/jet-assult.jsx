import React from 'react';

import Bullet from '@ui/components/bullet';
import IconEquipment from '@ui/components/icon-equipment';

const checkAbility = (ship, ability) => {
    if (typeof ship.__ABILITIES !== 'object') ship.__ABILITIES = {};

    const abilities = ship.__ABILITIES;
    console.log(abilities);

    if (typeof abilities[ability] === 'undefined') {
        switch (ability) {
            case 'jetAssult': {
                abilities[ability] =
                    ship.isType('carrier') && ship.canEquip('Jets');
                break;
            }
            default: {
                abilities[ability] = false;
            }
        }
    }

    return abilities[ability];
};

export default ({ ship }) => {
    const able = checkAbility(ship, 'jetAssult');
    return (
        <Bullet
            title={__('combat_phases.jet.cv')}
            level={able ? 'indeterminate' : 0}
        >
            {able && __('require.equipment', { type: '' })}
            {able && (
                <IconEquipment className="equipment" icon={39}>
                    {__('equipment_types.jet')}
                </IconEquipment>
            )}
        </Bullet>
    );
};
