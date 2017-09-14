import React from 'react'
import classNames from 'classnames'

import PageContainer from 'sp-ui-pagecontainer'

import { ImportStyle } from 'sp-css-import'

@ImportStyle(require('./styles.less'))
export default class InfosPageContainer extends React.Component {
    render() {
        const {
            className,
            ['has-tabs']: hasTabs,
            children,
            ...props
        } = this.props
        console.log(this.props)
        return (
            <PageContainer className={classNames({
                [className]: true,
                'has-tabs': hasTabs || (typeof hasTabs === 'undefined')
            })} {...props}>
                {children}
            </PageContainer>
        )
    }
}