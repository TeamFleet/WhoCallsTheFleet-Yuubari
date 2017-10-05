import React from 'react'
import { connect } from 'react-redux'

import translate from 'sp-i18n'
import PageContainer from 'sp-ui-pagecontainer'
import htmlHead from '@appUtils/html-head.js'

import { ImportStyle } from 'sp-css-import'
import style from './styles.less'

@connect()
@ImportStyle(style)
export default class About extends React.Component {
    static onServerRenderHtmlExtend(ext, store) {
        const head = htmlHead({
            store,
            title: translate('nav.about')
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
                <p>Fork on <a href="https://github.com/TeamFleet/WhoCallsTheFleet-Yuubari" target="_blank">GitHub</a></p>
                <p>Based on <a href="https://github.com/websage-team/super-project" target="_blank">Super Project</a> v{require('super-project/package.json').version}</p>
            </PageContainer>
        )
    }
}
