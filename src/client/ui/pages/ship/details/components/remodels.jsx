import React from 'react'
import classNames from 'classnames'
import checkCssProp from 'check-css-prop'

import LinkShip from '@appUI/components/link/ship.jsx'
import Icon from '@appUI/components/icon'
import ComponentContainer from '@appUI/containers/infos-component'

import getShip from '@appUtils/get-ship.js'
import getPic from '@appUtils/get-pic.js'

import { ImportStyle } from 'sp-css-import'
import styles from './remodels.less'

// @connect()
@ImportStyle(styles)
export default class ShipDetailsComponentRemodels extends React.Component {
    renderSeries(current, index, series) {
        const ship = getShip(current.id)
        const hasIcon = index > 0 && (
            series[index - 1].next_blueprint === 'on'
            || series[index - 1].next_catapult === 'on'
        )
        return (
            <span
                className={classNames(['item', {
                    'on': current.id === this.props.ship.id,
                    'is-has-icon': hasIcon,
                    'is-switchable': index > 0 && series[index - 1].next_loop === 'on',
                    'is-need-blueprint': index > 0 && series[index - 1].next_blueprint === 'on',
                    'is-need-catapult': index > 0 && series[index - 1].next_catapult === 'on'
                }])}
                key={index}
            >
                <span className={classNames(['lvl', {
                    'is-initial': index <= 0
                }])}>
                    {index > 0 ? series[index - 1].next_lvl : __('ship_details.remodel_initial')}
                    {index > 0 && series[index - 1].next_catapult === 'on' && <span className="icon icon-catapult" />}
                    {index > 0 && series[index - 1].next_blueprint === 'on' && <span className="icon icon-blueprint" />}
                </span>
                <LinkShip
                    className="ship"
                    // to={`/ships/${current.id}`}
                    ship={ship}
                    navy={true}
                    name={false}
                    pic={false}
                    extraIllust={true}
                    replace={true}
                >
                    <span className="pic" style={{
                        backgroundImage: `url(${getPic(ship, checkCssProp('mask') ? '0' : '0-1')})`
                    }} />
                    {index > 0 && series[index - 1].next_loop === 'on' && <Icon icon="loop" className="icon-switchable" />}
                </LinkShip>
            </span>
        )
    }

    render() {
        return (
            <ComponentContainer className={this.props.className} title={__("ship_details.remodels")}>
                <div className="container">
                    {this.props.ship._series.map(this.renderSeries.bind(this))}
                </div>
            </ComponentContainer>
        )
    }
}
