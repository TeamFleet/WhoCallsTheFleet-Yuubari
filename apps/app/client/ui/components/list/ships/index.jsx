import React from 'react'
import classNames from 'classnames'
import { ImportStyle } from 'sp-css-import'

import getShip from '@appUtils/get-ship.js'
import sortShips from '@appUtils/sort-ships.js'

import ListContainer from '@appUI/containers/list'

import LinkShip from '@appUI/components/link/ship'
import LinkMini from '@appUI/components/link-mini'

const getList = (list, sort) => (
    sort
        ? sortShips(list.map(shipId => (
            getShip(shipId)
        )))
        : list.map(shipId => (
            getShip(shipId)
        ))/*.sort((a, b) => (
            a.order - b.order
        ))*/
)

// @connect()
@ImportStyle(require('./styles.less'))
export default class ListShips extends React.Component {
    render() {
        const {
            className,

            list: _list,
            array: _array,
            ships: _ships,

            empty,

            grid = true,
            size,
            gutter,

            type,
            sort = true,

            children,
            ...props
        } = this.props

        const list = _list || _array || _ships || []
        const hasItem = list.length ? true : false

        return (
            <ListContainer
                className={classNames({
                    [className]: true,
                    'no-grid': !grid,
                })}
                grid={grid}
                gutter={gutter}
            >
                {hasItem && getList(list, sort)
                    .map(ship => (
                        size === 'mini'
                            ? (
                                <LinkMini
                                    ship={ship}
                                    key={ship.id}
                                    className="item"
                                    {...props}
                                />
                            )
                            : (
                                <LinkShip
                                    ship={ship}
                                    key={ship.id}
                                    className="item"
                                    type={typeof type === 'undefined' ? true : type}
                                    {...props}
                                />
                            )
                    ))
                }
                {!hasItem && !!(empty) && <span className="list-empty">{empty}</span>}
                {children}
            </ListContainer>
        )
    }
}