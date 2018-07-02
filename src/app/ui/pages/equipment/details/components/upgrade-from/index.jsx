import React from 'react'

import ComponentContainer from '@ui/containers/infos-component'
import ListEquipments from '@ui/components/list/equipments'

// import { ImportStyle } from 'sp-css-import'
// import styles from './styles.less'

// @connect()
// @ImportStyle(styles)
export default class EquipmentDetailsComponentUpgradeFrom extends React.Component {
    render() {
        const list = this.props.equipment.upgrade_from || []
        const hasItem = !!(list.length)
        return (
            <ComponentContainer className={this.props.className} title={__("equipment_details.upgrade_from")}>
                {hasItem && <ListEquipments list={list} />}
                {!hasItem && <span className="disabled">{__("none")}</span>}
            </ComponentContainer>
        )
    }
}
