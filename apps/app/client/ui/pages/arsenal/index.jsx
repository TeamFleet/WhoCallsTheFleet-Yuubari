import React from 'react'
import { connect } from 'react-redux'
import { ImportStyle } from 'sp-css-import'
import htmlHead from '@appUtils/html-head.js'
import translate from 'sp-i18n'

import {
    init as infosInit,
    reset as infosReset,
    TABINDEX
} from '@appLogic/infospage/api.js'

import PageContainer from 'sp-ui-pagecontainer'

export const infosId = `ARSENAL`

@connect(state => state.infosPage.infosId || {})
@ImportStyle(require('./arsenal.less'))
export default class PageArsenal extends React.Component {
    static onServerRenderHtmlExtend(ext, store) {
        const head = htmlHead({
            store,
            title: translate('nav.arsenal')
        })

        ext.metas = ext.metas.concat(head.meta)
        ext.title = head.title
    }

    render() {
        return (
            <PageContainer
                className={this.props.className}
            >
                <p><i>{translate('under_construction')}...</i></p>
            </PageContainer>
        )
    }
}