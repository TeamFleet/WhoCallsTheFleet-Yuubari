import { memo } from 'react';
import { extend } from 'koot';

import Icon from '@ui/components/icon';
import IconStat from '@ui/components/icon-stat';
import IndeterminateBox from '@ui/components/indeterminate-box';

const Bullet = extend({
    styles: require('./styles.less'),
})(
    memo(
        ({
            level,
            bullet,
            stat,
            className,
            title,
            titleHtml,
            html,
            children,
        }) => {
            let theLevel = level;
            if (typeof theLevel === 'undefined') theLevel = bullet;
            if (level === 'unknown') theLevel = -1;
            if (level === 'always') theLevel = true;

            let theTitle = title;
            if (titleHtml || html)
                theTitle = (
                    <span
                        dangerouslySetInnerHTML={{ __html: titleHtml || html }}
                    />
                );

            return (
                <div
                    className={className}
                    data-level={typeof stat === 'string' || theLevel || 0}
                >
                    {typeof stat === 'string' && (
                        <IconStat className="icon" stat={stat} />
                    )}
                    {theLevel === -1 && (
                        <Icon className="icon" icon="question6" />
                    )}
                    {(theLevel === 0 || theLevel === false) && (
                        <Icon className="icon" icon="cross" />
                    )}
                    {theLevel === true && (
                        <Icon className="icon" icon="checkmark4" />
                    )}
                    {theLevel === 'indeterminate' && (
                        <IndeterminateBox className="icon" />
                    )}
                    {theTitle}
                    {children && <span className="des">{children}</span>}
                </div>
            );
        }
    )
);

export default Bullet;
