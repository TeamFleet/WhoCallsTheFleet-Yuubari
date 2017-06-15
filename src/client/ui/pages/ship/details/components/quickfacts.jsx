import React from 'react'
import { Link } from 'react-router'

import ComponentContainer from '../layout/component-container.jsx'

import translate from 'sp-i18n'
import db from 'Logic/database'

import { ImportStyle } from 'sp-css-import'
import styles from './quickfacts.less'

// @connect()
@ImportStyle(styles)
export default class ShipDetailsComponentSlotEquipments extends React.Component {
    render() {
        return (
            <ComponentContainer className={this.props.className} title={translate("ship_details.quickfacts")}>
                [PH] QUICK FACTS
            </ComponentContainer>
        )
    }
}