import React from 'react'
import { connect } from 'react-redux'

import translate from 'sp-i18n'
import PageContainer from 'sp-ui-pagecontainer'
import htmlHead from 'Utils/html-head.js'

import ShipList from 'UI/components/ship-list.jsx'

import { ImportStyle } from 'sp-css-import'
import style from './list.less'

if (__CLIENT__) self.__pageShipListLastCollection = 0

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

    onCollectionChange(evt, to) {
        self.__pageShipListLastCollection = to
    }

    render() {
        return (
            <PageContainer
                className={this.props.className}
            >
                <ShipList
                    collection={__CLIENT__ ? self.__pageShipListLastCollection : null}
                    callbacks={{
                        onCollectionChange: this.onCollectionChange.bind(this)
                    }}
                />
            </PageContainer>
        )
    }
}