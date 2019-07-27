import React from 'react';

import checkShipCapability from '@api/check-ship-capability';
import Bullet from '@ui/components/bullet';
import ReqE from './_req-equipments';

export default ({ ship }) => {
    const able = checkShipCapability(ship, 'AAPropellantBarrage');
    return (
        <Bullet
            title={__('combat_phases.aerial.anti_air_propellant_barrage')}
            level={able ? 'indeterminate' : 0}
        >
            {able && <ReqE requirements={able.equipments} />}
            {able && able.chance && (
                <span
                    dangerouslySetInnerHTML={{
                        __html: __('activation_chance_tobe', {
                            chance: `<strong${
                                able.chance === 'high'
                                    ? ' class="color-positive"'
                                    : able.chance === 'low'
                                    ? ' class="color-negative"'
                                    : ''
                            }>${__('chance', able.chance)}</strong>`
                        })
                    }}
                ></span>
            )}
        </Bullet>
    );
};
