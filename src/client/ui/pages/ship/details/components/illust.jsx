import React from 'react'

import ComponentContainer from '../commons/component-container.jsx'

import translate from 'sp-i18n'

import { ImportStyle } from 'sp-css-import'
import styles from './illust.less'

// @connect()
@ImportStyle(styles)
export default class ShipDetailsComponentSlotEquipments extends React.Component {
    render() {
        return (
            <ComponentContainer className={this.props.className}>
                ILLUSTRATIONS
            </ComponentContainer>
        )
    }
}