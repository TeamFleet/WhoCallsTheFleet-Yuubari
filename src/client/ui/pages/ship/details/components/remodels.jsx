import React from 'react'
import { Link } from 'react-router'

import ComponentContainer from '../layout/component-container.jsx'

import translate from 'sp-i18n'
import getShip from 'Utils/get-ship.js'
import getPic from 'Utils/get-pic.js'

import { ImportStyle } from 'sp-css-import'
import styles from './remodels.less'

// @connect()
@ImportStyle(styles)
export default class ShipDetailsComponentRemodels extends React.Component {
    renderSeries(current, index, series) {
        const ship = getShip(current.id)
        return (
            <tr key={index}>
                <th style={{
                    textAlign: 'right'
                }}><i>
                        {index == 0 && "-"}
                        {index > 0 && series[index - 1].next_lvl}
                        {index > 0 && series[index - 1].next_blueprint === 'on' && <small><br />+ Blueprint</small>}
                        {index > 0 && series[index - 1].next_catapult === 'on' && <small><br />+ Catapult</small>}
                        {index > 0 && series[index - 1].next_loop === 'on' && ' (Switchable)'}
                    </i></th>
                <td>
                    {this.props.ship.id === current.id && ship._name}
                    {this.props.ship.id !== current.id && <Link to={`/ships/${current.id}`}>
                        {ship._name}
                    </Link>}
                    <img src={getPic('ship', ship.getPic('0-1'))} />
                </td>
            </tr>
        )
    }

    render() {
        const serieses = this.props.ship._series
        return (
            <ComponentContainer className={this.props.className} title={translate("ship_details.remodels")}>
                <table>
                    <tbody>
                        {serieses.map(this.renderSeries.bind(this))}
                    </tbody>
                </table>
            </ComponentContainer>
        )
    }
}