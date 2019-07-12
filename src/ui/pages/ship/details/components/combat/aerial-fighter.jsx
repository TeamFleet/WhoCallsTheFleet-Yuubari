import React from 'react';

import Basic from './_basic';

export default ({ ship }) => (
    <Basic
        ship={ship}
        capabilityName={__('combat_phases.aerial.fighter')}
        capabilityKey="aerialFighter"
        equipments={[
            'SeaplaneBomber',
            'SeaplaneFighter',
            'CarrierFighter',
            'DiveBomber',
            'TorpedoBomber',
            'Jets'
        ]}
    />
);
