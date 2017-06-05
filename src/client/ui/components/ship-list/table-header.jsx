import React from 'react'
import { connect } from 'react-redux'

import translate from 'sp-i18n'
import DataTable from '../datatable.jsx'
import {
    compareScroll,
    compareSort
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
        this.props.dispatch(
            compareSort(
                this.props.id,
                type
            )
        )
    }

    getHeaders() {
        return headers.map((stat, index) => {
            const type = stat.replace(/^consum\./, '')
            return (
                <span
                    key={index}
                    onClick={() => { this.sort(type) }}
                    className={'btn-sort' +
                        (this.props.sortType === type ? ` is-sorting-${this.props.sortOrder}` : '')
                    }
                >
                    {stat && translate('stat.' + stat)}
                </span>
            )
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