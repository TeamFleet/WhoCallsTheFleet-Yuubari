import React from 'react';

import Basic from './_basic';

export default ({ ship }) => (
    <Basic
        ship={ship}
        capabilityName={__('combat_phases.day.unlock_2nd_round')}
        capabilityKey="unlock2ndRoundShelling"
    />
);
