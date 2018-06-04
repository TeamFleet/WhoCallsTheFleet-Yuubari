import React from 'react'
import { connect } from 'react-redux'

import { ImportStyle } from 'sp-css-import'

import htmlHead from '@utils/html-head'

import Page from '@ui/containers/page'

import Title from '@ui/components/title'

@connect()
// @ImportStyle(style)
export default class extends React.Component {
    static onServerRenderHtmlExtend({ htmlTool: ext, store }) {
        const head = htmlHead({
            store,
            title: __('nav.expeditions')
        })

        ext.metas = ext.metas.concat(head.meta)
        ext.title = head.title
    }

    render() {
        return (
            <Page
                className={this.props.className}
            >
                <Title component="h2" children={__('nav.expeditions')} />
                <p><i>{__('under_construction')}...</i></p>
            </Page>
        )
    }
}
