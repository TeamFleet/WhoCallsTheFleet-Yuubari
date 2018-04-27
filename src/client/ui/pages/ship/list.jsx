import React from 'react'
import { connect } from 'react-redux'

import translate from 'super-i18n'
import Page from '@appUI/containers/page'
import htmlHead from '@appUtils/html-head.js'
import {
    reset as shipListReset
} from '@appLogic/ship-list/api.js'

import ShipList from '@appUI/components/ship-list'

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
            title: translate('nav.ships')
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
