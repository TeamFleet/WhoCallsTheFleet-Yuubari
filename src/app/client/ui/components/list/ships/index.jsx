import React from 'react'
// import { ImportStyle } from 'sp-css-import'

import ListContainer from '@appUI/containers/list'
import LinkShip from '@appUI/components/link/ship'
import getShip from '@appUtils/get-ship.js'
import sortShips from '@appUtils/sort-ships.js'

const getList = (list, sort) => (
    sort
        ? sortShips(list.map(shipId => (
            getShip(shipId)
        )))
        : list.map(shipId => (
            getShip(shipId)
        )).sort((a, b) => (
            a.order - b.order
        ))
)

// @connect()
// @ImportStyle(styles)
export default class ListShips extends React.Component {
    render() {
        const {
            className,
            list: _list,
            array: _array,
            empty,
            type,
            children,
            ...props
        } = this.props
        const list = _list || _array || []
        const hasItem = list.length ? true : false
        return (
            <ListContainer className={className}>
                {hasItem && getList(list)
                    .map(ship => (
                        <LinkShip
                            ship={ship}
                            key={ship.id}
                            className="item"
                            type={typeof type === 'undefined' ? true : type}
                            {...props}
                        />
                    ))
                }
                {!hasItem && !!(empty) && <span className="list-empty">{empty}</span>}
                {children}
            </ListContainer>
        )
    }
}