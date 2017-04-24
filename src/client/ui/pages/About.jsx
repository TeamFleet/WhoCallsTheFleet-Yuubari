import React from 'react'
import { connect } from 'react-redux'

import translate from 'sp-i18n'
import PageContainer from 'sp-ui-pagecontainer'
import htmlHead from 'Utils/html-head.js'

import { ImportStyle } from 'sp-css-import'
import style from './About.less'

@connect(mapStateToProps)
@ImportStyle(style)
export default class About extends React.Component {
    static htmlExtends(ext, store) {
        const head = htmlHead({
            state: store.getState(),
            title: translate('nav.about') + ' - Super Project'
        })

        ext.meta = ext.meta.concat(head.meta)
        ext.title = head.title
    }

    render() {
        return (
            <PageContainer
                className={this.props.className}
            >
                <h2>About page</h2>
            </PageContainer>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    prop: state.prop
})