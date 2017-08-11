import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import getLink from '@appUtils/get-link'

import DataTable from '../datatable.jsx'
import Link from '@appUI/components/link'
import { get } from 'kckit'
// import {
//     compareScroll
// } from '@appLogic/equipment-list/api.js'

import { ImportStyle } from 'sp-css-import'
import style from './table-body.less'

const stats = [
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

@connect((state, ownProps) => ({
    collection: state.equipmentList[ownProps.id].collection
}))
@ImportStyle(style)
export default class EquipmentListTableBody extends React.Component {
    getData() {
        if (!Array.isArray(this.props.equipments)) return []
        // console.log(this.props.equipments)

        let results = this.props.equipments.map(equipment => {
            let cells = [
                [<Link to={getLink('equipment', equipment.id)}>{equipment._name}</Link>, {
                    className: 'cell-name'
                }]
            ]

            stats.forEach(stat => {
                if (this.props.collection === 2 && stat === 'range')
                    stat = 'distance'

                const value = equipment.stat[stat]
                let content = value
                let className = 'stat-' + stat
                let trueValue

                if (stat.indexOf('equipment.') > -1) {
                    const type = stat.substr('equipment.'.length)
                    if (equipment[type]) {
                        content = '✓'
                        trueValue = 1
                    } else {
                        content = '-'
                        trueValue = 0
                        className += ' empty'
                    }
                } else if (value === false || value === 0) {
                    className += ' empty'
                    content = '-'
                } else if (value === undefined || value === -1) {
                    className += ' undefined'
                    content = '?'
                } else {
                    if (stat === 'range' || stat === 'speed') {
                        trueValue = value
                        content = get[stat](trueValue)
                    }
                }

                if (this.props.sortType === stat)
                    className += ' is-sorting'

                cells.push([
                    content,
                    {
                        className: className,
                        "data-stat": stat.replace(/^equipment\./, '') || undefined,
                        value: trueValue
                    }
                ])
            })

            return {
                key: equipment.id,
                cells,
                props: {
                    onClick: () => {
                        if (__CLIENT__)
                            browserHistory.push(location.pathname + '/' + equipment.id);
                    }
                }
            }
        })

        return results
    }

    render() {
        return (
            <DataTable
                className={this.props.className}
                tag="div"
                data={this.getData()}
            />
        )
    }
}