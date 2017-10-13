import React from 'react'

import db from '@appLogic/database'
import getEquipment from '@appUtils/get-equipment'

import { ImportStyle } from 'sp-css-import'
import style from './styles.less'

@ImportStyle(style)
export default class IconEquipment extends React.Component {
    render() {
        const {
            tag,
            icon,
            type,
            equipment,
            children,
            ...props
        } = this.props

        const TagName = tag || 'span'
        let _icon = icon

        if (typeof _icon === 'undefined') {
            if (equipment) {
                _icon = getEquipment(equipment)._icon
            } else if (type) {
                _icon = db.equipmentTypes[type].icon
            }
        }

        const iconID = parseInt(_icon)

        return (
            <TagName
                data-icon={isNaN(iconID) ? undefined : iconID}
                data-suffix={('' + _icon).replace(iconID, '').toUpperCase() || undefined}
                {...props}
            >
                {children}
            </TagName>
        )
    }
}
