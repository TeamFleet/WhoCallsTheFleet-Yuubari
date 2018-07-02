import React from 'react'
import { connect } from 'react-redux'
import { ImportStyle } from 'sp-css-import'
import { pageinfo } from 'super-project'

import htmlHead from '@utils/html-head'

import Page from '@ui/containers/page'
import Title from '@ui/components/title'

@connect()
@pageinfo(() => htmlHead({
    title: __('nav.about')
}))
@ImportStyle(require('./styles.less'))
export default class About extends React.Component {
    render() {
        return (
            <Page
                className={this.props.className}
            >
                <Title component="h2" children={__('nav.about')} />
                <p><i>{__('under_construction')}...</i></p>
                <p>
                    Based on <a href="https://github.com/websage-team/super-project" target="_blank">Super Project</a> v{require('super-project/package.json').version}
                    <br />
                    Fork on <a href="https://github.com/TeamFleet/WhoCallsTheFleet-Yuubari" target="_blank">GitHub</a>
                </p>
            </Page>
        )
    }
}
