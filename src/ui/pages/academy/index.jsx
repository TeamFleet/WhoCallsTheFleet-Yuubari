import React from 'react'
import { connect } from 'react-redux'
// import { ImportStyle } from 'sp-css-import'
import { pageinfo } from 'koot'

import htmlHead from '@utils/html-head'

import Page from '@ui/containers/page'
import Title from '@ui/components/title'

@connect()
@pageinfo((state) => htmlHead(state, {
    title: __('nav.academy')
}))
// @ImportStyle(style)
export default class extends React.Component {
    render() {
        return (
            <Page
                className={this.props.className}
            >
                <Title component="h2" children={__('nav.academy')} />
                <p><i>{__('under_construction')}...</i></p>
            </Page>
        )
    }
}
