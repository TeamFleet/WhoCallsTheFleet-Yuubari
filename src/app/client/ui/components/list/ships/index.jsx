import React from 'react'

import LinkShip from '@appUI/components/link/ship'
import getShip from '@appUtils/get-ship.js'
import sortShips from '@appUtils/sort-ships.js'

import { ImportStyle } from 'sp-css-import'
import styles from './styles.less'

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
@ImportStyle(styles)
export default class ListShips extends React.Component {
    insertPlaceHolders() {
        let i = 0;
        let arr = []
        while (i++ < 10) arr.push(<span className="item placeholder" key={i}></span>)
        return arr
    }
    render() {
        const { className, list, array, type, ...props } = this.props
        const _list = list || array || []
        const hasItem = _list.length ? true : false
        return (
            <div className={className}>
                {hasItem && getList(_list)
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
                {!hasItem && <span className="list-empty">{this.props.empty}</span>}

                {this.props.children}

                {this.insertPlaceHolders()}
            </div>
        )
    }
}