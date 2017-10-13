import React from 'react'

import Link from '@appUI/components/link'
import Stat from '@appUI/components/stat'
import LinkEquipment from '@appUI/components/link/equipment'

import getDateTimezone from '@appUtils/get-date-timezone'
import getLink from '@appUtils/get-link'
import getShip from '@appUtils/get-ship'
import sortShips from '@appUtils/sort-ships'
import arrResources from '@appData/resources'
import db from '@appLogic/database'

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
            dataShips = sortShips(dataShips.map(shipId => getShip(shipId)))/*.sort((a, b) => a.order - b.order)*/
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
            <div className={this.props.className} data-day={getDateTimezone(9).getDay()}>
                {data.map(this.renderItem.bind(this))}
            </div>
        )
    }
}

const isUndefined = value => (typeof value === 'undefined' || value === -1)
import _getValue from '@appUtils/get-value'
const getValue = value => {
    if (isUndefined(value)) value = undefined
    return _getValue(value)
}

@ImportStyle(require('./styles-resources.less'))
export class Resources extends React.Component {
    renderCategory(category, data) {
        const title = typeof category === 'string'
            ? translate(`improvement.${category}`)
            : (`★+${category} ~ ` + (category === 0 ? '+6' : 'MAX'))
        let resources = null
        let equipments = null

        if (!data) {
            resources = <span className="item disabled">-</span>
        } else {
            switch (category) {
                case 'resources': {
                    resources = arrResources.map((resource, index) => {
                        const value = getValue(data[index])
                        return (
                            <Stat
                                className='item item-resource'
                                key={resource}
                                stat={resource}
                            >
                                {value}
                            </Stat>
                        )
                    })
                    break
                }
                default: {
                    resources = [
                        <Stat
                            className='item item-resource'
                            key='dev'
                            stat='dev'
                        >
                            {getValue(data[0])}
                            <span className="guaranteed">({getValue(data[1])})</span>
                        </Stat>,
                        <Stat
                            className='item item-resource'
                            key='screw'
                            stat='screw'
                        >
                            {getValue(data[2])}
                            <span className="guaranteed">({getValue(data[3])})</span>
                        </Stat>
                    ]
                }
            }

            // equipments
            const list = Array.isArray(data[4])
                ? data[4].filter(item => item[1] !== 0)
                : (data[4] ? [[data[4], data[5]]] : [])
            if (list.length) {
                equipments = (<span className="equipments">
                    {list.map(arr => {
                        if (isNaN(arr[0])) {
                            const id = parseInt(arr[0].substr(arr[0].indexOf('_') + 1))
                            return (
                                <span
                                    className="equipment equipment-other color-alt"
                                    key={arr[0]}
                                >
                                    {db.consumables[id]._name}
                                    <span className="guaranteed">x{getValue(arr[1])}</span>
                                </span>
                            )
                        } else {
                            return (
                                <LinkEquipment
                                    equipment={arr[0]}
                                    className="equipment color-alt"
                                    key={arr[0]}
                                >
                                    <span className="guaranteed">x{getValue(arr[1])}</span>
                                </LinkEquipment>
                            )
                        }
                    })}
                </span>)
            }
        }

        return (
            <div className="category">
                <span className="category-title">{title}</span>
                {resources}
                {equipments}
            </div>
        )
    }

    render() {
        let data = this.props.data || this.props.resource || this.props.resources
        if (typeof data === 'object' && data.resource)
            data = data.resource
        if (!Array.isArray(data))
            data = []
        const upgradable = typeof this.props.upgradable !== 'undefined'
            ? this.props.upgradable
            : typeof data[3] !== 'undefined'

        return (
            <div className={this.props.className}>
                {this.renderCategory('resources', data[0] || [undefined, undefined, undefined, undefined])}
                {this.renderCategory(0, data[1] || [undefined, undefined, undefined, undefined, undefined])}
                {this.renderCategory(6, data[2] || [undefined, undefined, undefined, undefined, undefined])}
                {upgradable && this.renderCategory('upgrading', data[3])}
                {!upgradable && this.renderCategory('upgrading', false)}
            </div>
        )
    }
}

@ImportStyle(require('./styles-star.less'))
export class Star extends React.Component {
    render() {
        const { className, star, ...props } = this.props
        return (
            <span className={className} {...props}>
                +{star}
            </span>
        )
    }
}