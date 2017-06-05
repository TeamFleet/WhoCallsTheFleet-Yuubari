import React from 'react'
import { connect } from 'react-redux'

import LinkShip from '../link-ship.jsx'
import DataTable from '../datatable.jsx'

import { ImportStyle } from 'sp-css-import'
import style from './table-body.less'

const stats = [
    'fire',
    'torpedo',
    'night',
    'aa',
    'asw',
    'hp',
    'armor',
    'evasion',
    'carry',
    'speed',
    'range',
    'los',
    'luck',
    'fuel',
    'ammo'
]

@ImportStyle(style)
@connect((state, ownProps) => ({
    sortType: state.shipList[ownProps.id].compareSort[0],
    sortOrder: state.shipList[ownProps.id].compareSort[1]
}))
export default class ShipListTableBody extends React.Component {
    getData() {
        if (!Array.isArray(this.props.ships)) return []
        console.log(this.props.ships)

        let statTop = {}

        this.props.ships.forEach(ship => {
            stats.forEach(stat => {
                if (stat === 'speed' || stat === 'range') return
                if (!statTop[stat]) statTop[stat] = []

                const value = ship.getAttribute(stat, 99) || -1
                if (statTop[stat].indexOf(value) > -1) return

                let insertIndex = statTop[stat].length
                statTop[stat].forEach((current, index) => {
                    if (stat === 'fuel' || stat === 'ammo') {
                        if (value < current)
                            insertIndex = index
                    } else {
                        if (value > current)
                            insertIndex = index
                    }
                })

                statTop[stat].splice(insertIndex, 0, value)
                // statTop[stat] = statTop[stat].slice(0, 2)
            })
        })

        if (this.props.sortType) {

        }

        return this.props.ships.map(ship => {
            let cells = [
                <LinkShip ship={ship} />
            ]

            stats.forEach(stat => {
                const value = ship.getAttribute(stat, 99)
                let content = value
                let className = ''
                if (value === false) {
                    className = 'empty'
                    content = '-'
                } else if (value === undefined) {
                    className = 'undefined'
                    content = '?'
                } else {
                    if (stat === 'luck') {
                        content = (<span className="stat-luck">{ship.getAttribute('luck')}<sup>{ship.stat.luck_max}</sup></span>)
                    } else if (stat === 'fuel' || stat === 'ammo') {
                        content = 0 - content
                    }
                    if (statTop[stat] && statTop[stat].length > 1) {
                        if (statTop[stat][0] === value) {
                            className = 'top-first'
                        } else if (statTop[stat].length > 3 && statTop[stat][1] === value) {
                            className = 'top-second'
                        }
                    }
                }
                cells.push([
                    content,
                    {
                        className: className
                    }
                ])
            })
            console.log(cells)

            return cells
        })
    }
    render() {
        return (
            <DataTable className={this.props.className + ' comparetable'} tag="div" data={this.getData()} />
        )
    }
}