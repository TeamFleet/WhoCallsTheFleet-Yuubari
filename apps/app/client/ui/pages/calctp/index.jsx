import React from 'react'
import { connect } from 'react-redux'

import translate from 'sp-i18n'
import { ImportStyle } from 'sp-css-import'

import htmlHead from '@appUtils/html-head'

import Page from '@appUI/containers/page'

import Title from '@appUI/components/title'

@connect()
// @ImportStyle(style)
export default class extends React.Component {
    static onServerRenderHtmlExtend(ext, store) {
        const head = htmlHead({
            store,
            title: translate('nav.calctp')
        })

        ext.metas = ext.metas.concat(head.meta)
        ext.title = head.title
    }

    render() {
        return (
            <Page
                className={this.props.className}
            >
                <Title component="h2" children={translate('nav.calctp')} />
                <p><i>{translate('under_construction')}...</i></p>
            </Page>
        )
    }
}