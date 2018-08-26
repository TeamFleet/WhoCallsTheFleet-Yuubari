import React from 'react'
import { connect } from 'react-redux'
import { ImportStyle } from 'sp-css-import'
import { pageinfo } from 'koot'

import htmlHead from '@utils/html-head'
import {
    reset as shipListReset
} from '@api/ship-list/api'

import Page from '@ui/containers/page'

import ShipList from '@ui/components/ship-list'

const shipListId = 'pageShipList'

// @connect(state => ({
//     isShipListInit: (typeof state.shipList[shipListId] !== 'undefined')
// }))
@connect()
@pageinfo(() => htmlHead({
    title: __('nav.ships')
}))
@ImportStyle(require('./list.less'))
export default class PageShipList extends React.Component {

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
