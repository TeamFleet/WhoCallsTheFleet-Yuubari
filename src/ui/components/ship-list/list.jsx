import React from 'react'
// import { connect } from 'react-redux'
// import classNames from 'classnames'

// import {
//     compareAdd,
//     compareRemove
// } from '@api/ship-list/api.js'
// import getShip from '@utils/get-ship.js'

import ListShips from '@ui/components/list/ships'
// import LinkShip from '@ui/components/link/ship.jsx'
import ListItem from './list-item'

import { ImportStyle } from 'sp-css-import'
import styleList from './list.less'

@ImportStyle(styleList)
export default class ShipListList extends React.Component {
    renderItem(ship, index) {
        return (
            <ListItem
                shipListId={this.props.id}
                ship={ship}
                key={index}

                onCompareSelect={this.props.onCompareSelect}
            />
        )
    }

    render() {
        // console.log(this.props.ships)
        return (
            <ListShips className={this.props.className}>
                {this.props.ships.map(this.renderItem.bind(this))}
            </ListShips>
        )
    }
}
