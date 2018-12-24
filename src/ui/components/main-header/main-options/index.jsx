import React from 'react'
import classNames from 'classnames'
import { extend } from 'koot'

import MainHeader from '@ui/components/main-header'

const MainHeaderMainOptions = extend({
    styles: require('./styles.less')
})(
    ({
        className,
        mainClassName,
        optionsClassName,

        main,
        options,
        children,

        ...props
    }) => {
        const isPortal = __CLIENT__
        // const Component = isPortal ? MainHeader : 'div'
        const hasOptions = typeof options !== 'undefined'

        return (
            <MainHeader
                className={classNames([
                    className, {
                        'is-portal': isPortal,
                        'has-options': hasOptions,
                    }
                ])}
                {...props}
            >

                <div className={classNames(['wrapper', mainClassName])}>
                    {main}
                    {children}
                </div>

                {hasOptions && <div className={classNames(['dimmed', optionsClassName])}>{options}</div>}

            </MainHeader>
        )
    }
)

export default MainHeaderMainOptions
