import React from 'react';
import { extend } from 'koot';

import Icon from '@ui/components/icon';
import IconStat from '@ui/components/icon-stat';

const Bullet = extend({
    styles: require('./styles.less')
})(({ level, bullet, stat, className, title, children }) => {
    let theLevel = level;
    if (typeof theLevel === 'undefined') theLevel = bullet;
    return (
        <div
            className={className}
            data-level={typeof stat === 'string' || theLevel || 0}
        >
            {typeof stat === 'string' && (
                <IconStat className="icon" stat={stat} />
            )}
            {theLevel === -1 && <Icon className="icon" icon="question6" />}
            {(theLevel === 0 || theLevel === false) && (
                <Icon className="icon" icon="cross" />
            )}
            {theLevel === true && <Icon className="icon" icon="checkmark4" />}
            {title}
            {children && <span className="des">{children}</span>}
        </div>
    );
});

export default Bullet;
