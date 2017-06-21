import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import LinkShip from '../link/ship.jsx'
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

const extractValue = (obj) => {
    if (typeof obj[1] === 'object' && typeof obj[1].value === 'number')
        return obj[1].value
    if (obj[0] === '?')
        return -1
    if (typeof obj[0] === 'number')
        return obj[0]
    return -1000
}

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

        let results = this.props.ships.map(ship => {
            let cells = [
                <LinkShip ship={ship} />
            ]

            stats.forEach(stat => {
                const value = ship.getAttribute(stat, 99)
                let content = value
                let className = 'stat-' + stat
                let trueValue

                if (value === false) {
                    className += ' empty'
                    content = '-'
                } else if (value === undefined) {
                    className += ' undefined'
                    content = '?'
                } else {
                    if (stat === 'luck') {
                        trueValue = ship.getAttribute('luck')
                        content = (<span className="stat-luck">{trueValue}<sup>{ship.stat.luck_max}</sup></span>)
                    } else if (stat === 'fuel' || stat === 'ammo') {
                        content = 0 - content
                    } else if (stat === 'range' || stat === 'speed') {
                        trueValue = ship.stat[stat]
                    }
                    if (statSort[stat] && statSort[stat].length > 1) {
                        if (statSort[stat][0] === value) {
                            className += ' top-first'
                        } else if (statSort[stat].length > 3 && statSort[stat][1] === value) {
                            className += ' top-second'
                        }
                    }
                }

                if (this.props.sortType === stat)
                    className += ' is-sorting'

                cells.push([
                    content,
                    {
                        className: className,
                        value: trueValue
                    }
                ])
            })

            return {
                key: ship.id,
                cells,
                props: {
                    onClick: () => {
                        if (__CLIENT__)
                            browserHistory.push(location.pathname + '/' + ship.id);
                    }
                }
            }
        })

        if (this.props.sortType) {
            // console.log(this.props.sortType, this.props.sortOrder)
            const index = stats.indexOf(this.props.sortType) + 1
            results.sort((shipA, shipB) => {
                const valueA = extractValue(shipA.cells[index])
                const valueB = extractValue(shipB.cells[index])
                if (this.props.sortOrder === 'desc')
                    return valueB - valueA
                return valueA - valueB
            })
        }

        return results
    }

    onScroll(evt) {
        this.scrollLeft = evt.target.scrollLeft
        this.scrolling = true
        setTimeout(() => {
            this.scrolling = false
        })
        this.props.dispatch(
            compareScroll(this.props.id, this.scrollLeft)
        )
    }

    shouldComponentUpdate(nextProps) {
        if (this.scrolling && nextProps.scrollLeft === this.scrollLeft) return false
        // console.log(nextProps.scrollLeft, this.scrollLeft, this.props.scrollLeft)
        return true
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