import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import translate from 'sp-i18n'
import PageContainer from 'sp-ui-pagecontainer'
import htmlHead from 'Utils/html-head.js'

import ShipList from '../components/ship-list.jsx'

import { ImportStyle } from 'sp-css-import'
import style from './ship-list.less'

@connect()
@ImportStyle(style)
export default class extends React.Component {
    static htmlExtends(ext, store) {
        const head = htmlHead({
            store,
            title: translate('nav.ships')
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
                <ShipList />
            </PageContainer>
        )
    }
}