import React from 'react'
import { extend } from 'koot'

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
@extend({
    connect: true,
    pageinfo: (state) => htmlHead(state, {
        title: __('nav.ships')
    }),
    styles: require('./list.less')
})
class PageShipList extends React.Component {

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

export default PageShipList
