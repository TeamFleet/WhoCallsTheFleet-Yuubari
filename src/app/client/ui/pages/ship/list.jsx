import React from 'react'
import { connect } from 'react-redux'

import translate from 'sp-i18n'
import PageContainer from 'sp-ui-pagecontainer'
import htmlHead from '@appUtils/html-head.js'
import { init as shipListInit } from '@appLogic/ship-list/api.js'

import ShipList from '@appUI/components/ship-list.jsx'

import { ImportStyle } from 'sp-css-import'
import style from './list.less'

const shipListId = 'pageShipList'

@connect()
@ImportStyle(style)
export default class extends React.Component {
    static onServerRenderStoreExtend(store) {
        return [
            store.dispatch(shipListInit(shipListId))
        ]
    }

    static onServerRenderHtmlExtend(ext, store) {
        const head = htmlHead({
            store,
            title: translate('nav.ships')
        })

        ext.metas = ext.metas.concat(head.meta)
        ext.title = head.title
    }

    render() {
        return (
            <PageContainer
                className={this.props.className}
            >
                <ShipList
                    id={shipListId}
                    extraButton='compare'
                />
            </PageContainer>
        )
    }
}

/*
                <ShipList
                    id={shipListId}
                    collection={__CLIENT__ ? self.__pageShipListLastCollection : null}
                    onCollectionChange={this.onCollectionChange.bind(this)}
                    extraButton='compare'
                />
*/