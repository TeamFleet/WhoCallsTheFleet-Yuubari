import React from 'react'
// import { Link } from 'react-router'

import Reffitable from './components/refittable'

import { ImportStyle } from 'sp-css-import'

// @connect()
@ImportStyle(require('./refittable.less'))
export default class EquipmentDetailsRefittable extends React.Component {
    render() {
        return (
            <div className={this.props.className}>
                <Reffitable equipment={this.props.equipment} />
            </div>
        )
    }
}