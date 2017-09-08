import React from 'react'

import LinkEquipment from '@appUI/components/link/equipment'
import getEquipment from '@appUtils/get-equipment.js'

import { ImportStyle } from 'sp-css-import'
import styles from './styles.less'

// @connect()
@ImportStyle(styles)
export default class ListShips extends React.Component {
    render() {
        const { className, list, array, type, ...props } = this.props
        const _list = list || array || []
        const hasItem = _list.length ? true : false
        return (
            <div className={className}>
                {hasItem && _list.map(equipmentId => (
                    getEquipment(equipmentId)
                )).sort((a, b) => (
                    a.order - b.order
                )).map(equipment => (
                    <LinkEquipment
                        equipment={equipment}
                        key={equipment.id}
                        className="item color-alt"
                        {...props}
                    />
                ))}
                {this.props.children}
            </div>
        )
    }
}