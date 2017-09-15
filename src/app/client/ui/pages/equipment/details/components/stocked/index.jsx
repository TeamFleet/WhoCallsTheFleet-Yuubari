import React from 'react'

import ComponentContainer from '@appUI/containers/infos-component'
import ListShips from '@appUI/components/list/ships'

import translate from 'sp-i18n'

// import { ImportStyle } from 'sp-css-import'
// import styles from './styles.less'

// @connect()
// @ImportStyle(styles)
export default class EquipmentDetailsComponentStocked extends React.Component {
    render() {
        return (
            <ComponentContainer className={this.props.className} title={translate("equipment_details.stocked")}>
                <ListShips
                    list={this.props.equipment.default_equipped_on || []}
                    empty={translate("equipment_details.stocked_list_empty")}
                    sort={true}

                    navy={true}
                />
            </ComponentContainer>
        )
    }
}