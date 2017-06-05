import React from 'react'
import { connect } from 'react-redux'

import translate from 'sp-i18n'
import DataTable from '../datatable.jsx'
import {
    compareScroll
} from 'Logic/ship-list/api.js'

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
    'luck',
    'consum.fuel',
    'consum.ammo'
]

@ImportStyle(style)
@connect((state, ownProps) => ({
    sortType: state.shipList[ownProps.id].compareSort[0],
    sortOrder: state.shipList[ownProps.id].compareSort[1],
    scrollLeft: state.shipList[ownProps.id].compareScrollLeft
}))
export default class ShipListTableHeader extends React.Component {
    sort(type) {
        console.log(type)
    }

    getHeaders() {
        return headers.map((stat, index) => (
            <span key={index} onClick={() => { this.sort(stat) }}>
                {stat && translate('stat.' + stat)}
            </span>
        ))
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
                headers={this.getHeaders()}
                onScroll={this.onScroll.bind(this)}
                scrollLeft={this.props.scrollLeft}
            />
        )
    }
}