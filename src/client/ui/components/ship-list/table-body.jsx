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
export default class extends React.Component {
    getData() {
        if (!Array.isArray(this.props.ships)) return []
        console.log(this.props.ships)
        return this.props.ships.map(ship => [
            <LinkShip ship={ship} />,

            ship.getAttribute('fire'),
            ship.getAttribute('torpedo'),
            ship.getAttribute('fire') + ship.getAttribute('torpedo'),
            ship.getAttribute('aa'),
            ship.getAttribute('asw'),
            ship.getAttribute('hp'),
            ship.getAttribute('armor'),
            ship.getAttribute('evasion'),
            ship.getAttribute('carry'),
            ship.getAttribute('speed'),
            ship.getAttribute('range'),
            ship.getAttribute('los'),
            `${ship.getAttribute('luck')} (${ship.stat.luck_max})`,
            ship.consum.fuel,
            ship.consum.ammo
        ])
    }
    render() {
        return (
            <DataTable className={this.props.className} tag="div" data={this.getData()} />
        )
    }
}