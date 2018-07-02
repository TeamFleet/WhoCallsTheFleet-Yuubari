import React from 'react'
// import { connect } from 'react-redux'

import { ImportStyle } from 'sp-css-import'

import db from '@api/database'

import IconEquipment from '@ui/components/icon-equipment'
import Title from '@ui/components/title'

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
