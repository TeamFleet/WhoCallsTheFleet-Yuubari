import React from 'react';
import classNames from 'classnames';
import { extend } from 'koot';

import MainHeader from '@ui/components/main-header';

export const tabClassName = 'main-header-tab-item';

const MainHeaderTabs = extend({
    styles: require('./styles.less'),
})(({ className, tabs = [], children, ...props }) => {
    // const isPortal = __CLIENT__
    // const Component = isPortal ? MainHeader : 'div'

    return (
        <MainHeader
            className={classNames([
                className,
                {
                    // 'is-portal': isPortal,
                    // 'has-options': !!(tabs),
                },
            ])}
            {...props}
        >
            <div className="tabs">
                {tabs}
                {children}
            </div>
        </MainHeader>
    );
});
export default MainHeaderTabs;
