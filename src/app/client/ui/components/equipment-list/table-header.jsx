import React from 'react'
import { connect } from 'react-redux'

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
    collection: state.equipmentList[ownProps.id].collection
    //     sortType: state.shipList[ownProps.id].compareSort[0],
    //     sortOrder: state.shipList[ownProps.id].compareSort[1],
    //     scrollLeft: state.shipList[ownProps.id].compareScrollLeft
}))
export default class ShipListTableHeader extends React.Component {
    // sort(type) {
    //     this.props.dispatch(
    //         compareSort(
    //             this.props.id,
    //             type
    //         )
    //     )
    //     this.props.dispatch(
    //         compareScroll(this.props.id, 0)
    //     )
    // }

    // getHeaders() {
    //     return headers.map(stat => {
    //         const type = stat.replace(/^consum\./, '')
    //         return stat ? translate('stat.' + stat) : null
    //         return [
    //             stat
    //                 ? translate('stat.' + stat)
    //                 // ? (<IconStat className="icon" stat={stat} />)
    //                 : null,
    //             {
    //                 className: 'btn-sort' + (this.props.sortType === type ? ` is-sorting is-sorting-${this.props.sortOrder}` : ''),
    //                 onClick: () => { this.sort(type) }
    //             }
    //         ]
    //     })
    // }

    // onScroll(evt) {
    //     this.scrollLeft = evt.target.scrollLeft
    //     this.scrolling = true
    //     setTimeout(() => {
    //         this.scrolling = false
    //     })
    //     this.props.dispatch(
    //         compareScroll(this.props.id, this.scrollLeft)
    //     )
    // }

    // shouldComponentUpdate(nextProps) {
    //     if (this.scrolling && nextProps.scrollLeft === this.scrollLeft) return false
    //     return true
    // }

    getHeader(stat) {
        if (this.props.collection === 2 && stat === 'range')
            stat = 'radius'
        return [
            stat ? translate('stat.' + stat) : null,
            {
                className: !stat ? 'cell-name' : undefined,
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