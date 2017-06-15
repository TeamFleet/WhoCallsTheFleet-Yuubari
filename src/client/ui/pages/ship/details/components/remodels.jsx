import React from 'react'
import classNames from 'classnames'

import LinkShip from 'UI/components/link-ship.jsx'
import Icon from 'UI/components/icon'
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
            <LinkShip
                className={classNames(['item', {
                    'on': current.id === this.props.ship.id,
                    'is-switchable': index > 0 && series[index - 1].next_loop === 'on',
                    'is-need-blueprint': index > 0 && series[index - 1].next_blueprint === 'on',
                    'is-need-catapult': index > 0 && series[index - 1].next_catapult === 'on'
                }])}
                key={index}
                // to={`/ships/${current.id}`}
                ship={ship}
                navy={true}
                name={false}
                pic={false}
                extraIllust={true}
            >
                {index > 0 && <span className="lvl">
                    {series[index - 1].next_lvl}
                    {series[index - 1].next_catapult === 'on' && <span className="icon icon-catapult" />}
                    {series[index - 1].next_blueprint === 'on' && <span className="icon icon-blueprint" />}
                </span>}
                <span className="pic" style={{
                    backgroundImage: `url(${getPic('ship', ship.getPic('0-1'))})`
                }} />
                {index > 0 && series[index - 1].next_loop === 'on' && <Icon icon="puzzle" className="icon-switchable" />}
            </LinkShip>
        )
    }

    render() {
        return (
            <ComponentContainer className={this.props.className} title={translate("ship_details.remodels")}>
                <div className="container">
                    {this.props.ship._series.map(this.renderSeries.bind(this))}
                </div>
            </ComponentContainer>
        )
    }
}