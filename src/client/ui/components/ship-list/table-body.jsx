import React from 'react'
import { connect } from 'react-redux'

import LinkShip from '../link-ship.jsx'
import DataTable from '../datatable.jsx'
import {
    compareScroll
} from 'Logic/ship-list/api.js'

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
    sortOrder: state.shipList[ownProps.id].compareSort[1],
    scrollLeft: state.shipList[ownProps.id].compareScrollLeft
}))
export default class ShipListTableBody extends React.Component {
    getData() {
        if (!Array.isArray(this.props.ships)) return []
        // console.log(this.props.ships)

        let statSort = {}

        stats.forEach(stat => {
            if (stat === 'speed' || stat === 'range') return
            if (!statSort[stat]) statSort[stat] = []

            this.props.ships.forEach(ship => {
                const value = ship.getAttribute(stat, 99) || -1
                if (statSort[stat].indexOf(value) > -1) return
                statSort[stat].push(value)
            })

            statSort[stat].sort((a, b) => {
                if (stat === 'fuel' || stat === 'ammo')
                    return a - b
                return b - a
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
                    if (statSort[stat] && statSort[stat].length > 1) {
                        if (statSort[stat][0] === value) {
                            className = 'top-first'
                        } else if (statSort[stat].length > 3 && statSort[stat][1] === value) {
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
            // console.log(cells)

            return cells
        })
    }

    onScroll(evt) {
        this.props.dispatch(
            compareScroll(this.props.id, evt.target.scrollLeft)
        )
    }

    render() {
        return (
            <DataTable
                className={this.props.className + ' comparetable'}
                tag="div"
                data={this.getData()}
                onScroll={this.onScroll.bind(this)}
                scrollLeft={this.props.scrollLeft}
            />
        )
    }
}