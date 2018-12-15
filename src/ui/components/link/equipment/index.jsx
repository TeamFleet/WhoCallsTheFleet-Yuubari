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
            tag, component,
            equipment, equipmentName,
            children,
            iconSize,
            star,
            ...props
        } = this.props

        const theTag = tag || component
        const Component = theTag ? theTag : Link
        const _equipment = getEquipment(equipment)

        return (
            <Component
                className={
                    className
                    + (iconSize ? ` mod-icon-${iconSize}` : '')
                }
                to={!theTag || theTag !== 'a' ? getLink('equipment', _equipment.id) : undefined}
                {...props}
            >
                <IconEquipment className="icon" icon={_equipment._icon} />
                {equipmentName || _equipment._name}
                {children}
            </Component>
        )
    }
}

export default LinkEquipment
