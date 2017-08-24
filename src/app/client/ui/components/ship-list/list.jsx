import React from 'react'
// import { connect } from 'react-redux'
// import classNames from 'classnames'

// import {
//     compareAdd,
//     compareRemove
// } from '@appLogic/ship-list/api.js'
// import getShip from '@appUtils/get-ship.js'

import ListShips from '@appUI/components/list/ships'
// import LinkShip from '@appUI/components/link/ship.jsx'
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