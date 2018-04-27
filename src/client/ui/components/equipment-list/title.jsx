import React from 'react'
// import { connect } from 'react-redux'

import { ImportStyle } from 'sp-css-import'
// import translate from 'super-i18n'

import db from '@appLogic/database'

import IconEquipment from '@appUI/components/icon-equipment'
import Title from '@appUI/components/title'

// @connect((state, ownProps) => ({}))
@ImportStyle(require('./title.less'))
export default class ShipListTitle extends React.Component {
    render() {
        if (this.props.type) {
            const type = db.equipmentTypes[this.props.type]
            return (
                <IconEquipment tag="div" className={this.props.className} icon={type.icon}>
                    <Title
                        component="h4"
                        className={this.props.className + '-title'}
                        children={type._name}
                    />
                </IconEquipment>
            )
        } else
            return (
                <h4 className={this.props.className} disabled>--</h4>
            )
    }
}
