import React from 'react'
import { extend } from 'koot'

import getEquipment from '@utils/get-equipment'

import LinkEquipment from '@ui/components/link/equipment'

const ListEquipments = extend({
    styles: require('./styles.less')
})(
    ({ className, list, array, children, ...props }) => {
        const _list = list || array || []
        const hasItem = _list.length ? true : false
        delete props.type
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
                {children}
            </div>
        )
    }
)
export default ListEquipments
