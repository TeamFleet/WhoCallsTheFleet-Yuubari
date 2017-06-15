import React from 'react'
import { Link } from 'react-router'

import ComponentContainer from '../layout/component-container.jsx'

import translate from 'sp-i18n'
import db from 'Logic/database'

import { ImportStyle } from 'sp-css-import'
import styles from './slot-equipments.less'

// @connect()
@ImportStyle(styles)
export default class ShipDetailsComponentSlotEquipments extends React.Component {
    render() {
        let i = 0
        let renderArr = []
        while (i < 4) {
            const slot = this.props.ship.slot[i]
            const equipmentId = typeof slot !== 'undefined' ? this.props.ship.equip[i] : undefined
            renderArr.push(
                <tr key={i}>
                    <th style={{
                        textAlign: 'right'
                    }}><i>{typeof slot !== 'undefined' ? slot : "-"}</i></th>
                    <td>
                        {equipmentId &&
                            <Link to={`/equipments/${equipmentId}`}>
                                {db.equipments[equipmentId]._name}
                            </Link>
                        }
                        {!equipmentId && "-"}
                    </td>
                </tr>
            )
            i++
        }
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