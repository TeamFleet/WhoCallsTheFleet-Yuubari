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
        const ship = this.props.ship
        return (
            <ComponentContainer className={this.props.className} title={translate("ship_details.quickfacts")}>
                [{ship.navy.toUpperCase()}] {ship._navyName}
                {" | "}
                [{ship.rels.cv}] {ship._cv}
                {" | "}
                [{ship.rels.illustrator}] {ship._illustrator}
            </ComponentContainer>
        )
    }
}