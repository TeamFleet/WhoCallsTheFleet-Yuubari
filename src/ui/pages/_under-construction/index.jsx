import React from 'react'
import { extend } from 'koot'

import htmlHead from '@utils/html-head'

import Page from '@ui/containers/page'
import Title from '@ui/components/title'

const ViewUnderConstruction = extend({
    pageinfo: (state, props) => htmlHead(state, {
        title: props.title
    }),
    // styles: 
})(
    ({ className, title }) => (
        <Page
            className={className}
        >
            <Title component="h2" children={title} />
            <p><i>{__('under_construction')}...</i></p>
        </Page>
    )
)

export default ViewUnderConstruction
