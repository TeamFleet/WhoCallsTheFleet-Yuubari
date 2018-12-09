import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import DataTable from '../datatable.jsx'
// import arrStats from '@appData/equipment-stats'
import { stats } from './table-body'
// import {
//     compareScroll,
//     compareSort
// } from '@api/equipment-list/api.js'

// import IconStat from '@ui/components/icon-stat.jsx'

import { ImportStyle } from 'sp-css-import'
import style from './table-header.less'

const headers = [
    '',
    ...stats
]

@ImportStyle(style)
@connect((state, ownProps) => ({
    collection: state.equipmentList[ownProps.id].collection,
    //     sortType: state.shipList[ownProps.id].compareSort[0],
    //     sortOrder: state.shipList[ownProps.id].compareSort[1],
    //     scrollLeft: state.shipList[ownProps.id].compareScrollLeft
    // columnHighlight: state.equipmentList[ownProps.id].column
}))
export default class ShipListTableHeader extends React.Component {
    getHeader(stat) {
        if (this.props.collection === 2 && stat === 'range')
            stat = 'distance'
        return [
            stat ? __('stat', stat) : null,
            {
                className: classNames({
                    'cell-name': (!stat),
                    // 'is-highlight': this.props.columnHighlight === stat
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
