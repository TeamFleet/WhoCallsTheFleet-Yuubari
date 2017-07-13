import React from 'react'

import db from 'Logic/database'

import { ImportStyle } from 'sp-css-import'
import style from './styles.less'

@ImportStyle(style)
export default class IconEquipment extends React.Component {
    render() {
        const TagName = this.props.tag || 'span'
        let icon = this.props.icon
        if (typeof icon === 'undefined' && typeof this.props.type !== 'undefined')
            icon = db.equipmentTypes[this.props.type].icon

        return (
            <TagName
                className={this.props.className}
                data-icon={icon}
            >
                {this.props.children}
            </TagName>
        )
    }
}