import React from 'react'
import { connect } from 'react-redux'

import translate from 'sp-i18n'
import PageContainer from 'sp-ui-pagecontainer'
import htmlHead from 'Utils/html-head.js'
import db from '../../logic/database'

import { ImportStyle } from 'sp-css-import'
import style from './ship.less'

@connect()
@ImportStyle(style)
export default class About extends React.Component {
    static htmlExtends(ext, store) {
        const head = htmlHead({
            state: store.getState(),
            title: translate('ships.title') + ' - ' + translate('title')
        })

        ext.meta = ext.meta.concat(head.meta)
        ext.title = head.title
    }

    render() {
        return (
            <PageContainer
                className={this.props.className}
            >
                <h2>SHIP: {this.props.routeParams.id}</h2>
                {JSON.stringify(db.ships[this.props.routeParams.id])}
            </PageContainer>
        )
    }
}