import React from 'react';

import checkShipCapability from '@api/check-ship-capability';
import Bullet from '@ui/components/bullet';
import ReqE from './_req-equipments';

export default ({
    ship,
    capabilityName,
    capabilityKey,
    equipments,
    children
}) => {
    const able = checkShipCapability(ship, capabilityKey, equipments);
    return (
        <Bullet title={capabilityName} level={able ? 'indeterminate' : 0}>
            {able && <ReqE requirements={able.equipments} />}
            {children}
        </Bullet>
    );
};
