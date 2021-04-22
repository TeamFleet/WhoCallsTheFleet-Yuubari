import { memo } from 'react';
import { extend } from 'koot';

import IconStat from '@ui/components/icon-stat';

const Stat = extend({
    styles: require('./styles.less'),
})(
    memo(
        ({
            className,
            type,
            title,
            stat,
            value,
            max,
            disableResourceColor,
            children,
        }) => {
            const statType = type || title;
            const Component = stat ? IconStat : 'dl';

            const componentProps = {
                className: className,
            };

            if (stat) {
                componentProps.tag = 'dl';
                componentProps.stat = stat;
                componentProps.disableResourceColor = disableResourceColor;
            }

            if (typeof value !== 'undefined' && value < 0) {
                componentProps.className += ' is-negative';
            }

            return (
                <Component {...componentProps}>
                    {statType && <dt className="type">{statType}</dt>}
                    <dd className="value">
                        {value}
                        {children}
                        {max && <sup className="value-max">{max}</sup>}
                    </dd>
                </Component>
            );
        }
    )
);

export default Stat;
