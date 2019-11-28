import React from 'react';
import classNames from 'classnames';
import { extend } from 'koot';

const navies = [
    'ijn', // 日本帝国海军
    'km', // 纳粹德国海军"
    'rm', // 意大利皇家海军"
    'mn', // 法国海军"
    'rn', // 英国皇家海军"
    'usn', // 美国海军"
    'vmf', // 苏联海军"
    'sm' // 瑞典海军"
];

const getNavyIndex = navy => {
    switch (navy) {
        case 'ran': {
            // 澳大利亚皇家海军"
            return navies.indexOf('rn');
        }
        default: {
            return navies.indexOf(navy);
        }
    }
};

const FlagNavy = extend({
    styles: require('./flag-navy.less')
})(({ tag, component, element, className, shadow, navy, ...props }) => {
    const Component = tag || component || element || 'span';
    return (
        <Component
            {...props}
            className={classNames({
                [className]: true,
                'has-shadow': !!shadow
            })}
            data-navy-id={getNavyIndex(navy)}
        />
    );
});
export default FlagNavy;
