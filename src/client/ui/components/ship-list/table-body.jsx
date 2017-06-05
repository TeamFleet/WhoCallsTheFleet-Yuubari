import React from 'react'
import { connect } from 'react-redux'

import LinkShip from '../link-ship.jsx'
import DataTable from '../datatable.jsx'

import { ImportStyle } from 'sp-css-import'
import style from './table-body.less'

@ImportStyle(style)
@connect((state, ownProps) => ({
    sortType: state.shipList[ownProps.id].compareSort[0],
    sortOrder: state.shipList[ownProps.id].compareSort[1]
}))
export default class ShipListTableBody extends React.Component {
    getData() {
        if (!Array.isArray(this.props.ships)) return []
        console.log(this.props.ships)
        return this.props.ships.map(ship => [
            <LinkShip ship={ship} />,

            ship.getAttribute('fire'),
            ship.getAttribute('torpedo'),
            ship.getAttribute('night'),
            ship.getAttribute('aa'),
            ship.getAttribute('asw', 99),
            ship.getAttribute('hp'),
            ship.getAttribute('armor'),
            ship.getAttribute('evasion', 99),
            ship.getAttribute('carry'),
            ship.getAttribute('speed'),
            ship.getAttribute('range'),
            ship.getAttribute('los', 99),
            (<span>{ship.getAttribute('luck')}<sup>{ship.stat.luck_max}</sup></span>),
            (0 - ship.consum.fuel),
            (0 - ship.consum.ammo)
        ])
    }
    render() {
        return (
            <DataTable className={this.props.className + ' comparetable'} tag="div" data={this.getData()} />
        )
    }
}