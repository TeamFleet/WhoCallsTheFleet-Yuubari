import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import translate from 'sp-i18n'
import PageContainer from 'sp-ui-pagecontainer'
import htmlHead from 'Utils/html-head.js'
import db from '../../logic/database'
import shipList from '../../logic/database/list-ships.js'

import { ImportStyle } from 'sp-css-import'
import style from './ships.less'

let shipsByOrder = []

@connect()
@ImportStyle(style)
export default class extends React.Component {
    static htmlExtends(ext, store) {
        const head = htmlHead({
            state: store.getState(),
            title: translate('nav.ships') + ' - ' + translate('title')
        })

        ext.meta = ext.meta.concat(head.meta)
        ext.title = head.title
    }

    componentWillMount() {
        if (!shipsByOrder.length) {
            for (let id in db.ships) {
                shipsByOrder[id] = db.ships[id]
            }
        }
    }

    render() {
        return (
            <PageContainer
                className={this.props.className}
            >
                {shipList.map((collection, index) => (
                    <div key={index}>
                        <h3>{collection.name.zh_cn}</h3>
                        {collection.list.map((type, index2) => (
                            <div key={index + '-' + index2}>
                                <h5>[{db.shipTypes[type.type].code}] {db.shipTypes[type.type].full_zh}</h5>
                                <ul>
                                    {type.ships.map((ships, index3) => (
                                        <li key={index + '-' + index2 + '-' + index3}>
                                            {ships.map((ship, index4) => (
                                                <span key={index + '-' + index2 + '-' + index3 + '-' + index4}>
                                                    <Link to={'/ships/' + ship.id}>
                                                        [{ship.id}] {ship._name}
                                                    </Link>
                                                    {index4 < ships.length - 1 ? " | " : null}
                                                </span>
                                            ))}
                                        </li>
                                    ))}
                                </ul>
                                <div></div>
                            </div>
                        ))}
                        {index < shipList.length - 1 ? (<hr />) : null}
                        {index < shipList.length - 1 ? (<div></div>) : null}
                    </div>
                ))}
            </PageContainer>
        )
    }
}
/*

                <ul>
                    {shipsByOrder.filter(ship => typeof ship !== 'undefined').map((ship, index) => (
                        <li key={index}>
                            <Link to={'/ships/' + ship.id}>
                                [{ship.id}] {ship._name}
                            </Link>
                        </li>
                    ))}
                </ul>
                */