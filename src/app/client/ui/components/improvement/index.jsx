import React from 'react'

import Link from '@appUI/components/link'
import getLink from '@appUtils/get-link'
import getShip from '@appUtils/get-ship'

import translate from 'sp-i18n'
import { ImportStyle } from 'sp-css-import'

const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thurday",
    "Friday",
    "Saturday"
]

export default class Improvement extends React.Component {
    render() {
        return null
    }
}

@ImportStyle(require('./styles-dayandship.less'))
export class DayAndShip extends React.Component {
    renderItem(data, index) {
        let [dataDays, dataShips] = data
        if (dataShips)
            dataShips = dataShips.map(shipId => getShip(shipId)).sort((a, b) => a.order - b.order)
        return (
            <div className="item" key={index}>
                <div className="days">
                    {days.map((day, index) => (
                        <span className={'day' + (dataDays[index] ? ' on' : '')} key={index}>{translate(`day_abbr.${day}`)}</span>
                    ))}
                </div>
                <div className={"ships" + (!dataShips ? ' is-any' : '')}>
                    {dataShips && dataShips.map((ship, index) => (
                        <Link className="ship color-alt" key={index} to={getLink('ship', ship.id)}>
                            {ship.getName(translate('shipname_dash_none'))}
                        </Link>
                    ))}
                    {!dataShips && translate('improvement.any_2nd_ship')}
                </div>
            </div>
        )
    }
    render() {
        let data = this.props.data || this.props.req || this.props.require
        if (typeof data === 'object' && data.req)
            data = data.req
        if (!Array.isArray(data) || !data.length)
            data = [
                [[], false]
            ]

        return (
            <div className={this.props.className}>
                {data.map(this.renderItem.bind(this))}
            </div>
        )
    }
}