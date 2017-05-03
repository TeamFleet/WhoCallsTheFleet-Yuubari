import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import translate from 'sp-i18n'
import PageContainer from 'sp-ui-pagecontainer'
import htmlHead from 'Utils/html-head.js'
import db from '../../logic/database'

import { ImportStyle } from 'sp-css-import'
import style from './ships.less'

let shipsByOrder = []

@connect()
@ImportStyle(style)
export default class extends React.Component {
    static htmlExtends(ext, store) {
        const head = htmlHead({
            state: store.getState(),
            title: translate('ships.title') + ' - ' + translate('title')
        })

        ext.meta = ext.meta.concat(head.meta)
        ext.title = head.title
    }

    componentWillMount() {
        if (__CLIENT__) console.log('ships', db)
        if (!shipsByOrder.length) {
            for (let id in db.ships) {
                shipsByOrder[id] = db.ships[id]
            }
        }
}
    
    render() {
        if (__CLIENT__) console.log(db)
        return (
            <PageContainer
                className={this.props.className}
            >
                <h2>{translate('ships.title')}</h2>
                <ul>
                    {shipsByOrder.filter(ship => typeof ship !== 'undefined').map((ship, index) => (
                        <li key={index}>
                            <Link to={'/ships/' + ship.id}>
                                [{ship.id}] {ship._name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </PageContainer>
        )
    }
}