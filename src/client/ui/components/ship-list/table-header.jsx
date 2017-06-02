import React from 'react'
import { connect } from 'react-redux'

import DataTable from '../datatable.jsx'

import { ImportStyle } from 'sp-css-import'
import style from './table-header.less'

const headers = [
    '',
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
    'consum.fuel',
    'consum.ammo'
]

@ImportStyle(style)
@connect((state, ownProps) => ({
    sortType: state.shipList[ownProps.id].compareSort[0],
    sortOrder: state.shipList[ownProps.id].compareSort[1]
}))
export default class ShipListTableHeader extends React.Component {
    sort(type) {
        console.log(type)
    }
    getHeaders() {
        return headers.map((stat, index) => (
            <span key={index} onClick={() => {this.sort(stat)}}>
                {stat}
            </span>
        ))
    }
    render() {
        return (
            <DataTable className={this.props.className + ' comparetable'} tag="div" headers={this.getHeaders()} />
        )
    }
}