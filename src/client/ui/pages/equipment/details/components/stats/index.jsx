import React from 'react'

import ComponentContainer from '@appUI/containers/infos-component'

import translate from 'super-i18n'

// import { ImportStyle } from 'sp-css-import'
// import styles from './styles.less'

// @connect()
// @ImportStyle(styles)
export default class EquipmentDetailsComponentStats extends React.Component {
    render() {
        return (
            <ComponentContainer className={this.props.className}>
                {translate('under_construction')}
            </ComponentContainer>
        )
    }
}
