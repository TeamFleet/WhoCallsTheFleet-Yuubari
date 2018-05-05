import React from 'react'
import { connect } from 'react-redux'

import DataTable from '../datatable.jsx'
import {
    compareScroll,
    compareSort
} from '@appLogic/ship-list/api.js'

// import IconStat from '@appUI/components/icon-stat.jsx'

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
        this.props.dispatch(
            compareSort(
                this.props.id,
                type
            )
        )
        this.props.dispatch(
            compareScroll(this.props.id, 0)
        )
    }

    getHeaders() {
        return headers.map(stat => {
            const type = stat.replace(/^consum\./, '')
            return [
                stat
                    ? __('stat', stat)
                    // ? (<IconStat className="icon" stat={stat} />)
                    : null,
                {
                    className: 'btn-sort' + (this.props.sortType === type ? ` is-sorting is-sorting-${this.props.sortOrder}` : ''),
                    onClick: () => { this.sort(type) }
                }
            ]
        })
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
        return true
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
