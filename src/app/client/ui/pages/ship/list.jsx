import React from 'react'
import { connect } from 'react-redux'

import translate from 'sp-i18n'
import PageContainer from 'sp-ui-pagecontainer'
import htmlHead from '@appUtils/html-head.js'
import {
    reset as shipListReset
} from '@appLogic/ship-list/api.js'

import ShipList from '@appUI/components/ship-list'

import { ImportStyle } from 'sp-css-import'
import style from './list.less'

const shipListId = 'pageShipList'

@connect(state => ({
    isShipListInit: (typeof state.shipList[shipListId] !== 'undefined')
}))
@ImportStyle(style)
export default class PageShipList extends React.Component {
    static onServerRenderHtmlExtend(ext, store) {
        const head = htmlHead({
            store,
            title: translate('nav.ships')
        })

        ext.metas = ext.metas.concat(head.meta)
        ext.title = head.title
    }

    componentWillMount() {
        // console.log('PageShipList - componentWillMount', (this.props.isShipListInit && this.props.location.action === 'PUSH'))
        if (this.props.isShipListInit && this.props.location.action === 'PUSH')
            this.props.dispatch(shipListReset(shipListId))
    }

    render() {
        return (
            <PageContainer className={this.props.className} >
                <ShipList
                    id={shipListId}
                    extraButton='compare'
                />
            </PageContainer>
        )
    }
}