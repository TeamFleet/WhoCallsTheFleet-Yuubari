import React from 'react'
import { Link } from 'react-router'

import ComponentContainer from '../commons/component-container.jsx'
import Stat from '../commons/stat.jsx'

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
                <Stat
                    className="item"
                    title={translate("ship_details.navy")}
                >
                    [{ship.navy.toUpperCase()}] {ship._navyName}
                </Stat>
                <Stat
                    className="item"
                    title={translate("ship_details.cv")}
                >
                    [{ship.rels.cv}] {ship._cv}
                </Stat>
                <Stat
                    className="item"
                    title={translate("ship_details.illustrator")}
                >
                    [{ship.rels.illustrator}] {ship._illustrator}
                </Stat>
            </ComponentContainer>
        )
    }
}