import React from 'react'
import { Link } from 'react-router'

import ComponentContainer from '../commons/component-container.jsx'

import translate from 'sp-i18n'
import db from 'Logic/database'

import { ImportStyle } from 'sp-css-import'
import styles from './slot-equipments.less'

const times = n => f => {
    let iter = i => {
        if (i === n) return
        f(i)
        iter(i + 1)
    }
    return iter(0)
}

// @connect()
@ImportStyle(styles)
export default class ShipDetailsComponentSlotEquipments extends React.Component {
    render() {
        let renderArr = []
        times(4)(index => {
            const slot = this.props.ship.slot[index]
            const equipmentId = typeof slot !== 'undefined' ? this.props.ship.equip[index] : undefined
            renderArr.push(
                <dl key={index} className="item">
                    <dt className="slot">{typeof slot !== 'undefined' ? slot : "-"}</dt>
                    <dd className="equipment">
                        {equipmentId &&
                            <Link to={`/equipments/${equipmentId}`}>
                                {db.equipments[equipmentId]._name}
                            </Link>
                        }
                        {!equipmentId && "-"}
                    </dd>
                </dl>
            )
        })
        return (
            <ComponentContainer className={this.props.className} title={translate("ship_details.slot_equipments")}>
                <table>
                    <tbody>
                        {renderArr}
                    </tbody>
                </table>
            </ComponentContainer>
        )
    }
}