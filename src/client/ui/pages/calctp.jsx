import React from 'react'
import { connect } from 'react-redux'

import translate from 'sp-i18n'
import PageContainer from 'sp-ui-pagecontainer'
import htmlHead from 'Utils/html-head.js'

import { ImportStyle } from 'sp-css-import'
import style from './calctp.less'

@connect()
@ImportStyle(style)
export default class extends React.Component {
    static htmlExtends(ext, store) {
        const head = htmlHead({
            state: store.getState(),
            title: translate('nav.calctp') + ' - ' + translate('title')
        })

        ext.meta = ext.meta.concat(head.meta)
        ext.title = head.title
    }

    render() {
        return (
            <PageContainer
                className={this.props.className}
            >
                <h2>{translate('calctp.title')}</h2>
            </PageContainer>
        )
    }
}