import React from 'react';
import { extend } from 'koot';

import ComponentContainer from '@ui/containers/infos-component';

import styles from './index.less';

import Legend from './legend';
import CombatRange from './range';
import JetAssult from './jet-assult';
import AerialFighter from './aerial-fighter';
import AerialBombing from './aerial-bombing';
import AAPropellantBarrage from './anti-air-propellant-barrage';
import OASW from './oasw';
import OTS from './ots';
import Shelling from './shelling';
import Unlock2ndRoundShelling from './unlock-2nd-round-shelling';
import TorpedoSalvo from './torpedo-salvo';
import NightBattle from './night-battle';

const { wrapper: moduleClassName } = styles;

//

const Combat = extend({
    styles
})(({ className, ship }) => (
    <ComponentContainer
        className={className}
        title={__('ship_details.combat_capabilities')}
    >
        <Legend />

        <CombatRange ship={ship} />

        <Section title={__('combat_phases.jet.title')}>
            <JetAssult ship={ship} />
        </Section>

        <Section title={__('combat_phases.aerial.title')}>
            <AerialFighter ship={ship} />
            <AerialBombing ship={ship} />
            <AAPropellantBarrage ship={ship} />
        </Section>

        <Section title={__('combat_phases.day.title')}>
            <OASW ship={ship} />
            <OTS ship={ship} />
            <Shelling ship={ship} />
            <Unlock2ndRoundShelling ship={ship} />
            <TorpedoSalvo ship={ship} />
        </Section>

        <Section title={__('combat_phases.night.title')}>
            <NightBattle ship={ship} />
        </Section>
    </ComponentContainer>
));
export default Combat;

//

const Section = ({ title, children }) => (
    <div className={`${moduleClassName}-section`}>
        <h4 className="title">{title}</h4>
        <div className="content">{children}</div>
    </div>
);
