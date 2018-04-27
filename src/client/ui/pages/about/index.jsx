import React from 'react'
import { connect } from 'react-redux'

import { ImportStyle } from 'sp-css-import'
import translate from 'super-i18n'

import htmlHead from '@appUtils/html-head.js'

import Page from '@appUI/containers/page'

import Title from '@appUI/components/title'

@connect()
@ImportStyle(require('./styles.less'))
export default class About extends React.Component {
    static onServerRenderHtmlExtend({ htmlTool: ext, store }) {
        const head = htmlHead({
            store,
            title: translate('nav.about')
        })

        ext.metas = ext.metas.concat(head.meta)
        ext.title = head.title
    }

    render() {
        return (
            <Page
                className={this.props.className}
            >
                <Title component="h2" children={translate('nav.about')} />
                <p><i>{translate('under_construction')}...</i></p>
                <p>
                    Based on <a href="https://github.com/websage-team/super-project" target="_blank">Super Project</a> v{require('super-project/package.json').version}
                    <br />
                    Fork on <a href="https://github.com/TeamFleet/WhoCallsTheFleet-Yuubari" target="_blank">GitHub</a>
                </p>
            </Page>
        )
    }
}
