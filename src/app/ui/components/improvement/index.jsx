import React from 'react'
import { extend } from 'koot'

import Link from '@ui/components/link'
import Stat from '@ui/components/stat'
import LinkEquipment from '@ui/components/link/equipment'
// import Star from './star'

import getTimeJST from '@utils/get-time-jst'
import getLink from '@utils/get-link'
import getShip from '@utils/get-ship'
import sortShips from '@utils/sort-ships'
import arrResources from '@const/resources'
import db from '@database'

const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thurday",
    "Friday",
    "Saturday"
]

class Improvement extends React.Component {
    render() {
        return null
    }
}
export default Improvement

@extend({
    styles: require('./styles-dayandship.less')
})
class DayAndShip extends React.Component {
    renderItem(data, index) {
        let [dataDays, dataShips] = data
        if (dataShips)
            dataShips = sortShips(dataShips.map(shipId => getShip(shipId)))/*.sort((a, b) => a.order - b.order)*/
        return (
            <div className="item" key={index}>
                <div className="days">
                    {days.map((day, index) => (
                        <span className={'day' + (dataDays[index] ? ' on' : '')} key={index}>{__(`day_abbr`, day)}</span>
                    ))}
                </div>
                <div className={"ships" + (!dataShips ? ' is-any' : '')}>
                    {dataShips && dataShips.map((ship, index) => (
                        <Link className="ship color-alt" key={index} to={getLink('ship', ship.id)}>
                            {ship.getName(__('shipname_dash_none'))}
                        </Link>
                    ))}
                    {!dataShips && __('improvement.any_2nd_ship')}
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
            <div className={this.props.className} data-day={getTimeJST().getDay()}>
                {data.map(this.renderItem.bind(this))}
            </div>
        )
    }
}
export { DayAndShip }

const isUndefined = value => (typeof value === 'undefined' || value === -1)
import _getValue from '@utils/get-value'
const getValue = value => {
    if (isUndefined(value)) value = undefined
    return _getValue(value)
}

class _Resources extends React.Component {
    constructor(props) {
        super(props)

        this.data = props.data || props.resource || props.resources
        this.upgradable = props.upgradable

        if (typeof this.data === 'object' && this.data.resource) {
            if (typeof this.upgradable === 'undefined' &&
                Array.isArray(this.data.upgrade) && this.data.upgrade.length
            )
                this.upgradable = true
            this.data = this.data.resource
        }
        if (!Array.isArray(this.data))
            this.data = []

        if (this.data.length < 3) this.upgradable = false
    }
}

@extend({
    styles: require('./styles-resources.less')
})
class Resources extends _Resources {
    renderCategory(category, data) {
        const title = typeof category === 'string'
            ? __(`improvement`, category)
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
        return (
            <div className={this.props.className}>
                {this.renderCategory('resources', this.data[0] || [undefined, undefined, undefined, undefined])}
                {this.renderCategory(0, this.data[1] || [undefined, undefined, undefined, undefined, undefined])}
                {this.renderCategory(6, this.data[2] || [undefined, undefined, undefined, undefined, undefined])}
                {this.upgradable && this.renderCategory('upgrading', this.data[3])}
                {!this.upgradable && this.renderCategory('upgrading', false)}
            </div>
        )
    }
}
export { Resources }

import Star from './star'
export { Star }
