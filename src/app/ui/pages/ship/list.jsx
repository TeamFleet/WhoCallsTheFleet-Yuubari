import React from 'react'
import { connect } from 'react-redux'

import Page from '@ui/containers/page'
import htmlHead from '@utils/html-head.js'
import {
    reset as shipListReset
} from '@api/ship-list/api.js'

import ShipList from '@ui/components/ship-list'

import { ImportStyle } from 'sp-css-import'
import style from './list.less'

const shipListId = 'pageShipList'

// @connect(state => ({
//     isShipListInit: (typeof state.shipList[shipListId] !== 'undefined')
// }))
@connect()
@ImportStyle(style)
export default class PageShipList extends React.Component {
    static onServerRenderHtmlExtend({ htmlTool: ext, store }) {
        const head = htmlHead({
            store,
            title: __('nav.ships')
        })

        ext.metas = ext.metas.concat(head.meta)
        ext.title = head.title
    }

    constructor(props) {
        super(props)

        if (props.location.action === 'PUSH')
            props.dispatch(shipListReset(shipListId))
    }

    render() {
        return (
            <Page className={this.props.className} >
                <ShipList
                    id={shipListId}
                    extraButton='compare'
                />
            </Page>
        )
    }
}
