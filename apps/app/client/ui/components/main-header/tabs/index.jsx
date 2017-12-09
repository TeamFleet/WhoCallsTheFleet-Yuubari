import React from 'react'
// import { connect } from 'react-redux'
import classNames from 'classnames'
import { ImportStyle } from 'sp-css-import'

import MainHeader from '@appUI/components/main-header'

export const tabClassName = 'main-header-tab-item'

// @connect()
@ImportStyle(require('./styles.less'))
export default class MainHeaderTabs extends React.Component {
    render() {
        const isPortal = __CLIENT__
        // const Component = isPortal ? MainHeader : 'div'

        const {
            className,
            tabs = [],
            children,
            ...props
        } = this.props;

        return (
            <MainHeader className={classNames([
                className, {
                    'is-portal': isPortal,
                    // 'has-options': !!(tabs),
                }
            ])} {...props}>

                <div className="tabs">
                    {tabs}
                    {children}
                </div>

            </MainHeader>
        )
    }
}