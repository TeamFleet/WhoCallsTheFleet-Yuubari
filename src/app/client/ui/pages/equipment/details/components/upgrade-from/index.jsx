import React from 'react'

import ComponentContainer from '@appUI/containers/infos-component'
import ListEquipments from '@appUI/components/list/equipments'

import translate from 'sp-i18n'

// import { ImportStyle } from 'sp-css-import'
// import styles from './styles.less'

// @connect()
// @ImportStyle(styles)
export default class EquipmentDetailsComponentUpgradeFrom extends React.Component {
    render() {
        return (
            <ComponentContainer className={this.props.className} title={translate("equipment_details.upgrade_from")}>
                <ListEquipments list={this.props.equipment.upgrade_from || []} />
            </ComponentContainer>
        )
    }
}