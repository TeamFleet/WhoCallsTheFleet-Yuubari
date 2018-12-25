import React from 'react'
import { Link } from 'react-router'
import { extend } from 'koot'

import IconEquipment from '@ui/components/icon-equipment'
import ImprovementStar from '@ui/components/improvement/star'

import getEquipment from '@utils/get-equipment'
import getLink from '@utils/get-link'

const LinkEquipment = extend({
    styles: require('./styles.less')
})(
    ({
        className,
        tag, component,
        equipment, equipmentName,
        children,
        iconSize,
        star,
        ...props
    }) => {
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
                {star ? <ImprovementStar star={star} className="star" /> : null}
                {children}
            </Component>
        )
    }
)

export default LinkEquipment
