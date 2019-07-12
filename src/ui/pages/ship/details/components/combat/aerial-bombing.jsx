import React from 'react';

import Basic from './_basic';

export default ({ ship }) => (
    <Basic
        ship={ship}
        capabilityName={__('combat_phases.aerial.bombing')}
        capabilityKey="aerialBombing"
        equipments={['SeaplaneBomber', 'DiveBomber', 'TorpedoBomber', 'Jets']}
    />
);
