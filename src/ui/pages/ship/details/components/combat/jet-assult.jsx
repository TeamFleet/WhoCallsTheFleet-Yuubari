import React from 'react';

import Bullet from '@ui/components/bullet';
import IconEquipment from '@ui/components/icon-equipment';

export default ({ ship }) => {
    const able = ship.isType('carrier') && ship.canEquip('Jets');
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
