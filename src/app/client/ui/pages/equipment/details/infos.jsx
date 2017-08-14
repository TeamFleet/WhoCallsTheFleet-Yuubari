import React from 'react'
// import { Link } from 'react-router'

import translate from 'sp-i18n'
// import db from '@appLogic/database'

import { ImportStyle } from 'sp-css-import'
import styles from './infos.less'

// @connect()
@ImportStyle(styles)
export default class EquipmentDetailsContentInfos extends React.Component {
    render() {
        return (
            <div className={this.props.className}>
                <h3>INFOS</h3>
                {translate('under_construction')}
            </div>
        )
    }
}