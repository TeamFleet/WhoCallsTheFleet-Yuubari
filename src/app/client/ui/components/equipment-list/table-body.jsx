import React from 'react'
import { connect } from 'react-redux'
// import { browserHistory } from 'react-router'

import DataTable from '../datatable.jsx'
import Link from '@appUI/components/link'
import { get } from 'kckit'
import {
    highlightColumn
} from '@appLogic/equipment-list/api.js'
import getFromState from '@appLogic/equipment-list/get-from-state.js'
import arrStats from '@appData/equipment-stats'
import routerPush from '@appUtils/router-push'
import getLink from '@appUtils/get-link'
// import DataTableFlex, { Row, Cell } from '@appUI/components/datatable-flex'

import { ImportStyle } from 'sp-css-import'
import { observerItem } from '@appUI/hoc/observer'
// import style from './table-body.less'

export const stats = [
    ...arrStats,
    'equipment.craftable',
    'equipment.improvable'
]

@connect((state, ownProps) => ({
    collection: getFromState(state, ownProps).collection,
    observer: getFromState(state, ownProps).observer
    // columnHighlight: state.equipmentList[ownProps.id].column
}))
@ImportStyle(require('./table-body.less'))
@observerItem()
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

            stats.forEach((stat, indexStat) => {
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
                } else if (value < 0) {
                    className += ' negative'
                } else if (!value) {
                    className += ' empty'
                    content = '-'
                } else {
                    if (stat === 'range' || stat === 'speed') {
                        trueValue = value
                        content = get[stat](trueValue)
                    }
                }

                if (this.props.sortType === stat)
                    className += ' is-sorting'

                // if (!index && this.props.columnHighlight === stat)
                //     className += ' is-hover'

                cells.push([
                    content,
                    {
                        className: className,
                        "data-stat": stat.replace(/^equipment\./, '') || undefined,
                        value: trueValue,
                        onMouseEnter: () => {
                            // this.getContainer(evt.target).setAttribute('data-highlighting', indexStat)
                            this.props.dispatch(
                                highlightColumn(this.props.id, indexStat, stat)
                                // highlightColumn(this.props.id, indexStat)
                                // highlightColumn(this.props.id, stat)
                            )
                        },
                        onMouseLeave: () => {
                            // this.getContainer(evt.target).removeAttribute('data-highlighting')
                            this.props.dispatch(
                                highlightColumn(this.props.id, undefined, undefined)
                            )
                        }
                    }
                ])
            })

            return {
                key: equipment.id,
                cells,
                props: {
                    onClick: () => {
                        if (__CLIENT__)
                            routerPush(getLink('equipment', equipment.id));
                    }
                }
            }
        })

        return results
    }

    // getContainer(target) {
    //     if (!this._container) {
    //         while (!target.dataset.equipmentlistId) {
    //             target = target.parentNode
    //         }
    //         this._container = target
    //     }
    //     return this._container
    // }

    render() {
        // console.log(this.props.columnHighlight)
        return (
            <DataTable
                className={this.props.className}
                tag="div"
                data={this.getData()}
            />
        )
    }

    /*
    getList() {
        return this.props.equipments
    }

    renderRow(equipment) {
        return (
            <Row
                className="row"
                key={equipment.id}
                onClick={() => {
                    if (__CLIENT__)
                        routerPush(getLink('equipment', equipment.id));
                }}
            >
                <Cell className="cell cell-name">
                    <Link to={getLink('equipment', equipment.id)}>{equipment._name}</Link>
                </Cell>
                {stats.map(stat => this.renderCellStat(equipment, stat))}
            </Row>
        )
    }

    renderCellStat(equipment, stat) {
        if (this.props.collection === 2 && stat === 'range')
            stat = 'distance'

        const value = equipment.stat[stat]
        let content = value
        let className = 'cell stat-' + stat
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
        } else if (value < 0) {
            className += ' negative'
        } else if (!value) {
            className += ' empty'
            content = '-'
        } else {
            if (stat === 'range' || stat === 'speed') {
                trueValue = value
                content = get[stat](trueValue)
            }
        }

        if (this.props.sortType === stat)
            className += ' is-sorting'

        // if (!index && this.props.columnHighlight === stat)
        //     className += ' is-hover'

        return (
            <Cell
                key={stat}
                className={className}
                data-stat={stat.replace(/^equipment\./, '') || undefined}
                value={trueValue}
                onMouseEnter={() => {
                    // this.getContainer(evt.target).setAttribute('data-highlighting', indexStat)
                    this.props.dispatch(
                        // highlightColumn(this.props.id, indexStat)
                        highlightColumn(this.props.id, stat)
                    )
                }}
                onMouseLeave={() => {
                    // this.getContainer(evt.target).removeAttribute('data-highlighting')
                    this.props.dispatch(
                        highlightColumn(this.props.id, undefined)
                    )
                }}
            >
                {content}
            </Cell>
        )
    }

    render() {
        return (
            <DataTableFlex className={this.props.className}>
                {this.getList().map(this.renderRow.bind(this))}
            </DataTableFlex>
        )
    }
    */
}