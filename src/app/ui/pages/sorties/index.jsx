import React from 'react'
// import { ImportStyle } from 'sp-css-import'
import { extend } from 'koot'

import htmlHead from '@utils/html-head'

import Page from '@ui/containers/page'

import Title from '@ui/components/title'

@extend({
    connect: true,
    pageinfo: (state) => htmlHead(state, {
        title: __('nav.sorties')
    }),
    // styles: 
})
class PageSorties extends React.Component {
    render() {
        return (
            <Page
                className={this.props.className}
            >
                <Title component="h2" children={__('nav.sorties')} />
                <p><i>{__('under_construction')}...</i></p>
            </Page>
        )
    }
}

export default PageSorties
