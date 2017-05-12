import React from 'react'
import { connect } from 'react-redux'

import translate from 'sp-i18n'
import PageContainer from 'sp-ui-pagecontainer'
import htmlHead from 'Utils/html-head.js'

import { ImportStyle } from 'sp-css-import'
import style from './entity-list.less'

@connect()
@ImportStyle(style)
export default class extends React.Component {
    static htmlExtends(ext, store) {
        const head = htmlHead({
            store,
            title: translate('nav.entities')
        })

        ext.meta = ext.meta.concat(head.meta)
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