import React from 'react'
// import { connect } from 'react-redux'
import classNames from 'classnames'
import { ImportStyle } from 'sp-css-import'

import MainHeader from '@ui/components/main-header'

// @connect()
@ImportStyle(require('./styles.less'))
export default class MainHeaderMainOptions extends React.Component {
    render() {
        const isPortal = __CLIENT__
        // const Component = isPortal ? MainHeader : 'div'

        const {
            className,
            mainClassName,
            optionsClassName,

            main,
            options,
            children,

            ...props
        } = this.props

        const hasOptions = typeof options !== 'undefined'

        return (
            <MainHeader className={classNames([
                className, {
                    'is-portal': isPortal,
                    'has-options': hasOptions,
                }
            ])} {...props}>

                <div className={classNames(['wrapper', mainClassName])}>
                    {main}
                    {children}
                </div>

                {hasOptions && <div className={classNames(['dimmed', optionsClassName])}>{options}</div>}

            </MainHeader>
        )
    }
}
