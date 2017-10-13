import React from 'react'
import { Link } from 'react-router'

import IconEquipment from '@appUI/components/icon-equipment'

// import db from '@appLogic/database'
import getEquipment from '@appUtils/get-equipment'
import getLink from '@appUtils/get-link'

import { ImportStyle } from 'sp-css-import'
import styles from './styles.less'

// @connect()
@ImportStyle(styles)
export default class LinkEquipment extends React.Component {
    render() {
        const {
            className,
            tag,
            equipment,
            children,
            ...props
        } = this.props

        const Component = tag ? tag : Link
        const _equipment = getEquipment(equipment)

        return (
            <Component
                className={className}
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