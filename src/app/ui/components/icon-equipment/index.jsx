import React from 'react'
import { ImportStyle } from 'sp-css-import'

import db from '@api/database'
import getEquipment from '@utils/get-equipment'
import getLink from '@utils/get-link'

import { Link } from 'react-router'

@ImportStyle(require('./styles.less'))
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

        let Component = tag || 'span'
        let iconId, suffix, matches

        // 15[3,]
        // 15[3,8]
        matches = /^([0-9]+)\[([0-9]*),([0-9]*)\]$/.exec(icon)
        if (Array.isArray(matches)) {
            iconId = matches[1]
            if (matches[2] && matches[3])
                suffix = `${matches[2]}~${matches[3]}`
            else if (matches[2])
                suffix = `${matches[2]}+`
            else if (matches[3])
                suffix = `0~${matches[3]}+`
            if (suffix)
                props['data-suffix-type'] = 'stat-range'
        }

        matches = /^([0-9]+):([0-9]+)$/.exec(icon)
        if (Array.isArray(matches)) {
            iconId = matches[1]
            if (matches[2]) {
                suffix = getEquipment(matches[2])._name
                Component = Link
                props.to = getLink('equipment', matches[2])
            }
            if (suffix)
                props['data-suffix-type'] = 'equipment-name'
        }

        // console.log(icon, iconId, suffix)

        if (typeof iconId === 'undefined') {
            if (equipment) {
                iconId = getEquipment(equipment)._icon
            } else if (type) {
                iconId = db.equipmentTypes[type].icon
            } else {
                iconId = parseInt(icon)
            }
        }

        if (isNaN(iconId))
            iconId = undefined

        if (!suffix)
            suffix = ('' + icon).replace(iconId, '').toUpperCase() || undefined

        return (
            <Component
                data-icon={iconId}
                data-suffix={suffix}
                {...props}
            >
                {children}
            </Component>
        )
    }
}
