import React from 'react'

import PageContainer from 'sp-ui-pagecontainer'

import { ImportStyle } from 'sp-css-import'

@ImportStyle(require('./styles.less'))
export default class InfosPageContainer extends React.Component {
    render() {
        const { children, ...props } = this.props
        return (
            <PageContainer {...props}>
                {children}
            </PageContainer>
        )
    }
}