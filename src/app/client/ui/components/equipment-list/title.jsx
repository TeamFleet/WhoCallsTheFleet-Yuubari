import React from 'react'
// import { connect } from 'react-redux'

// import translate from 'sp-i18n'
import db from '@appLogic/database'

import IconEquipment from '@appUI/components/icon-equipment'

import { ImportStyle } from 'sp-css-import'
import styleTitle from './title.less'

// @connect((state, ownProps) => ({}))
@ImportStyle(styleTitle)
export default class ShipListTitle extends React.Component {
    render() {
        if (this.props.type) {
            const type = db.equipmentTypes[this.props.type]
            return (
                <IconEquipment tag="h4" className={this.props.className} icon={type.icon}>
                    {type._name}
                </IconEquipment>
            )
        } else
            return (
                <h4 className={this.props.className}>--</h4>
            )
    }
}