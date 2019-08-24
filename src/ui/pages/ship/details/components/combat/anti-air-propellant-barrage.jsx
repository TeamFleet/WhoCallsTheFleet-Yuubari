import React from 'react';

import checkShipCapability from '@api/check-ship-capability';
import Bullet from '@ui/components/bullet';
import Requirements from './_requirements';

export default ({ ship }) => {
    const able = checkShipCapability(ship, 'AAPropellantBarrage');
    const { chance = 'normal' } = able;
    return (
        <Bullet
            title={__('combat_phases.aerial.anti_air_propellant_barrage')}
            level={able ? 'indeterminate' : 0}
        >
            {able && <Requirements requirements={able} ship={ship} />}
            {able && chance && (
                <span
                    dangerouslySetInnerHTML={{
                        __html: __('activation_chance_tobe', {
                            chance: `<strong${
                                chance === 'high'
                                    ? ' class="color-positive"'
                                    : chance === 'low'
                                    ? ' class="color-negative"'
                                    : ''
                            }>${__('chance', chance)}</strong>`
                        })
                    }}
                ></span>
            )}
        </Bullet>
    );
};
