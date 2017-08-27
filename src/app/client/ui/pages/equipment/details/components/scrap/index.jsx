import React from 'react'

import ComponentContainer from '@appUI/containers/infos-component'

import translate from 'sp-i18n'

// import { ImportStyle } from 'sp-css-import'
// import styles from './styles.less'

// @connect()
// @ImportStyle(styles)
export default class EquipmentDetailsComponentScrap extends React.Component {
    render() {
        return (
            <ComponentContainer className={this.props.className} title={translate("equipment_details.scrap")}>
                {translate('under_construction')}
            </ComponentContainer>
        )
    }
}