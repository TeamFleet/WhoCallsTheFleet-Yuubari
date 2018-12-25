import React from 'react'
import { extend } from 'koot'
import { get } from 'kckit'

import { highlightColumn } from '@api/equipment-list/api'
import getFromState from '@api/equipment-list/get-from-state'
import arrStats from '@const/equipment-stats'
import routerPush from '@utils/router-push'
import getLink from '@utils/get-link'

import DataTable from '@ui/components/datatable'
import Link from '@ui/components/link'
import { observerItem } from '@ui/hoc/observer'

export const stats = [
    ...arrStats,
    'equipment.craftable',
    'equipment.improvable'
]

const getData = (props) => {
    if (!Array.isArray(props.equipments)) return []
    // console.log(props.equipments)

    let results = props.equipments.map(equipment => {
        let cells = [
            [<Link to={getLink('equipment', equipment.id)}>{equipment._name}</Link>, {
                className: 'cell-name'
            }]
        ]

        stats.forEach((stat, indexStat) => {
            if (props.collection === 2 && stat === 'range')
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

            if (props.sortType === stat)
                className += ' is-sorting'

            // if (!index && props.columnHighlight === stat)
            //     className += ' is-hover'

            cells.push([
                content,
                {
                    className: className,
                    "data-stat": stat.replace(/^equipment\./, '') || undefined,
                    value: trueValue,
                    onMouseEnter: () => {
                        // this.getContainer(evt.target).setAttribute('data-highlighting', indexStat)
                        props.dispatch(
                            highlightColumn(props.id, indexStat, stat)
                            // highlightColumn(props.id, indexStat)
                            // highlightColumn(props.id, stat)
                        )
                    },
                    onMouseLeave: () => {
                        // this.getContainer(evt.target).removeAttribute('data-highlighting')
                        props.dispatch(
                            highlightColumn(props.id, undefined, undefined)
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

const EquipmentListTableBody = extend({
    connect: (state, ownProps) => ({
        collection: getFromState(state, ownProps).collection,
        observer: getFromState(state, ownProps).observer
        // columnHighlight: state.equipmentList[ownProps.id].column
    }),
    styles: require('./table-body.less')
})(observerItem()(
    ({ className, ...props }) => (
        <DataTable
            className={className}
            tag="div"
            data={getData(props)}
        />
    )
))

export default EquipmentListTableBody
