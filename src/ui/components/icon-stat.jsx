import { memo } from 'react';
import { extend } from 'koot';

import arrResources from '@const/resources';

const stats = [
    'hp',
    'armor',
    'evasion',
    'carry',
    'fire',
    'torpedo',
    'aa',
    'asw',
    'speed',
    'range',
    'los',
    'luck',

    'fuel',
    'ammo',

    'bomb',
    'hit',

    'steel',
    'bauxite',

    'dev',
    'screw',
];

const IconStat = extend({
    styles: require('./icon-stat.less'),
})(
    memo(
        ({
            className,
            component,
            tag,
            disableResourceColor,
            stat,
            children,
        }) => {
            const Component = component || tag || 'span';
            const isResource =
                !disableResourceColor && arrResources.includes(stat);

            let thisStat = stat;
            switch (stat) {
                case 'distance':
                    thisStat = 'range';
                    break;
                case 'antibomber':
                    thisStat = 'hit';
                    break;
                case 'interception':
                    thisStat = 'evasion';
                    break;
                default: {
                }
            }

            return (
                <Component
                    className={className}
                    data-stat={stats.indexOf(thisStat)}
                    data-resource={isResource ? stat : undefined}
                >
                    {children}
                </Component>
            );
        }
    )
);

export default IconStat;
