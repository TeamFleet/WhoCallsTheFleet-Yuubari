import React from 'react'
import { Link } from 'react-router'

import ComponentContainer from './components/component-container.jsx'

import translate from 'sp-i18n'
import db from 'Logic/database'

// import { ImportStyle } from 'sp-css-import'
// import styles from './header.less'

// @connect()
// @ImportStyle(styles)
export default class ShipDetailsContentInfos extends React.Component {
    get ship() {
        if (!this._data && this.props.ship)
            this._data = this.props.ship
        return this._data || {}
    }

    renderSeries() {
        const serieses = this.ship._series
        return (
            <ComponentContainer title={translate("ship_details.remodels")}>
                <table>
                    <tbody>
                        {serieses.map((series, i) => (
                            <tr key={i}>
                                <th style={{
                                    textAlign: 'right'
                                }}><i>
                                        {i == 0 && "-"}
                                        {i > 0 && serieses[i - 1].next_lvl}
                                        {i > 0 && serieses[i - 1].next_blueprint === 'on' && <small><br />+ Blueprint</small>}
                                        {i > 0 && serieses[i - 1].next_catapult === 'on' && <small><br />+ Catapult</small>}
                                        {i > 0 && serieses[i - 1].next_loop === 'on' && ' (Switchable)'}
                                    </i></th>
                                <td>
                                    {this.ship.id === series.id && db.ships[series.id]._name}
                                    {this.ship.id !== series.id && <Link to={`/ships/${series.id}`}>
                                        {db.ships[series.id]._name}
                                    </Link>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </ComponentContainer>
        )
    }

    renderSlotEquipments() {
        let i = 0
        let renderArr = []
        while (i < 4) {
            const slot = this.ship.slot[i]
            const equipmentId = typeof slot !== 'undefined' ? this.ship.equip[i] : undefined
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
            <ComponentContainer title={translate("ship_details.slot_equipments")}>
                <table>
                    <tbody>
                        {renderArr}
                    </tbody>
                </table>
            </ComponentContainer>
        )
    }

    render() {
        return (
            <div className={this.props.className}>
                {this.renderSeries()}
                {this.renderSlotEquipments()}
            </div>
        )
    }
}