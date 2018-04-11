import React from 'react'
import classNames from 'classnames'

import Page from '@appUI/containers/page'

import { ImportStyle } from 'sp-css-import'

@ImportStyle(require('./styles.less'))
export default class InfosPageContainer extends React.Component {
    render() {
        const {
            className,
            ['has-tabs']: hasTabs = true,
            children,
            ...props
        } = this.props

        return (
            <Page
                className={classNames({
                    [className]: true,
                    'has-tabs': hasTabs
                })}
                {...props}
            >
                {children}
            </Page>
        )
    }
}
