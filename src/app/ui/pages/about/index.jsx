import React from 'react'
import { connect } from 'react-redux'
import { ImportStyle } from 'sp-css-import'
import { pageinfo } from 'koot'

import htmlHead from '@utils/html-head'

import Page from '@ui/containers/page'
import Title from '@ui/components/title'

@connect()
@pageinfo((state) => htmlHead(state, {
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
                    Based on <a href="https://github.com/cmux/koot" target="_blank">Koot.js</a> v{require('koot/package.json').version}
                    <br />
                    Fork on <a href="https://github.com/TeamFleet/WhoCallsTheFleet-Yuubari" target="_blank">GitHub</a>
                </p>
            </Page>
        )
    }
}
