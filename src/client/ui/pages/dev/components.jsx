import React from 'react'
import { connect } from 'react-redux'

import PageContainer from 'sp-ui-pagecontainer'
import htmlHead from 'Utils/html-head.js'
import DevHeader from 'UI/components/dev/header.jsx'

import { ImportStyle } from 'sp-css-import'
import style from './components.less'

@connect()
@ImportStyle(style)
export default class extends React.Component {
    static htmlExtends(ext, store) {
        const head = htmlHead({
            store,
            title: 'Dev (Components)'
        })

        ext.meta = ext.meta.concat(head.meta)
        ext.title = head.title
    }

    render() {
        return (
            <PageContainer className={this.props.className}>
                <DevHeader />
            </PageContainer>
        )
    }
}