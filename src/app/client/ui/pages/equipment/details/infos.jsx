import React from 'react'

import Facts from './components/facts'
import Stocked from './components/stocked'

// import { ImportStyle } from 'sp-css-import'
// import styles from './infos.less'

// @connect()
// @ImportStyle(styles)
export default class EquipmentDetailsContentInfos extends React.Component {
    render() {
        return (
            <div className={this.props.className}>
                <Facts equipment={this.props.equipment} className="equipmentinfo equipmentinfo-facts" />
                <Stocked equipment={this.props.equipment} className="equipmentinfo equipmentinfo-stocked" />
            </div>
        )
    }
}