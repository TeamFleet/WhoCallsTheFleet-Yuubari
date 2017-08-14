import React from 'react'
// import { Link } from 'react-router'

import translate from 'sp-i18n'
// import db from '@appLogic/database'

import { ImportStyle } from 'sp-css-import'
import styles from './refittable.less'

// @connect()
@ImportStyle(styles)
export default class EquipmentDetailsRefittable extends React.Component {
    render() {
        return (
            <div className={this.props.className}>
                <h3>REFITTABLE</h3>
                {translate('under_construction')}
            </div>
        )
    }
}