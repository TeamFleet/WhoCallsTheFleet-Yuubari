import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import translate from 'sp-i18n'
import DataTable from '../datatable.jsx'
// import {
//     compareScroll,
//     compareSort
// } from '@appLogic/equipment-list/api.js'

// import IconStat from '@appUI/components/icon-stat.jsx'

import { ImportStyle } from 'sp-css-import'
import style from './table-header.less'

const headers = [
    '',
    'fire',
    'torpedo',
    'aa',
    'asw',
    'bomb',
    'hit',
    'armor',
    'evasion',
    'los',
    'range',

    'equipment.craftable',
    'equipment.improvable'
]

@ImportStyle(style)
@connect((state, ownProps) => ({
    collection: state.equipmentList[ownProps.id].collection,
    //     sortType: state.shipList[ownProps.id].compareSort[0],
    //     sortOrder: state.shipList[ownProps.id].compareSort[1],
    //     scrollLeft: state.shipList[ownProps.id].compareScrollLeft
    columnHighlight: state.equipmentList[ownProps.id].column
}))
export default class ShipListTableHeader extends React.Component {
    getHeader(stat) {
        if (this.props.collection === 2 && stat === 'range')
            stat = 'distance'
        return [
            stat ? translate('stat.' + stat) : null,
            {
                className: classNames({
                    'cell-name': (!stat),
                    'is-highlight': this.props.columnHighlight === stat
                }),
                "data-stat": stat.replace(/^equipment\./, '') || undefined
            }
        ]
    }

    render() {
        // onScroll={this.onScroll.bind(this)}
        // scrollLeft={this.props.scrollLeft}
        return (
            <DataTable
                className={this.props.className}
                tag="div"
                headers={headers.map(this.getHeader.bind(this))}
            />
        )
    }
}