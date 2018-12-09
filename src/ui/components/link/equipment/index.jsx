import React from 'react'
import { Link } from 'react-router'
import { extend } from 'koot'

import IconEquipment from '@ui/components/icon-equipment'

import getEquipment from '@utils/get-equipment'
import getLink from '@utils/get-link'

@extend({
    styles: require('./styles.less')
})
class LinkEquipment extends React.Component {
    render() {
        const {
            className,
            tag,
            equipment,
            children,
            size,
            ...props
        } = this.props

        const Component = tag ? tag : Link
        const _equipment = getEquipment(equipment)

        return (
            <Component
                className={
                    className
                    + (size ? ` mod-size-${size}` : '')
                }
                to={!tag || tag !== 'a' ? getLink('equipment', _equipment.id) : undefined}
                {...props}
            >
                <IconEquipment className="icon" icon={_equipment._icon} />
                {_equipment._name}
                {children}
            </Component>
        )
    }
}

export default LinkEquipment
