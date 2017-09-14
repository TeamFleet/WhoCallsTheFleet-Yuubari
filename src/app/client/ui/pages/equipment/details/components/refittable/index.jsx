import React from 'react'
import classNames from 'classnames'

import ComponentContainer from '@appUI/containers/infos-component'

import { db } from 'kckit'
const {
    equipmentTypes,
    shipCollections,
    shipTypes,
    ships
} = db

import translate from 'sp-i18n'
import { ImportStyle } from 'sp-css-import'

// @connect()
@ImportStyle(require('./styles.less'))
export default class EquipmentDetailsComponentRefittable extends React.Component {
    render() {
        const type = equipmentTypes[this.props.equipment.type] || {}
        const typeName = this.props.equipment.getType()
        const isEquipableExSlot = this.props.equipment.isEquipableExSlot()

        const {
            equipable_on_type: availableShipTypes = [],
            equipable_extra_ship: availableExtraShips = [],
        } = type

        if (__DEV__) {
            console.table({
                typeName,
                // type,
                isEquipableExSlot,
                availableShipTypes: availableShipTypes.join(', '),
                availableExtraShips: availableExtraShips.join(', ')
            }/*, [
                `[${this.props.equipment.id}]`
            ]*/)
            console.log('type', type)
        }

        return (
            <ComponentContainer className={this.props.className}>
                {shipCollections.map((shipCollection, index) => (
                    <ShipCollection
                        data={shipCollection}
                        availableShipTypes={availableShipTypes}
                        availableExtraShips={availableExtraShips}
                        key={index}
                    />
                ))}

                <h2>ExSlot</h2>
                <p>{translate('under_construction')}</p>

                <h2>ExSlot SHIPS</h2>
                <p>{translate('under_construction')}</p>
            </ComponentContainer>
        )
    }
}

class ShipCollection extends React.Component {
    render() {
        const {
            className,
            data,
            availableShipTypes,
            availableExtraShips,
            ...props
        } = this.props

        const cachedTypes = []
        // const cachedShips = []

        const extraShips = []
        const types = data.list.map(thisType => {
            const id = thisType.type
            if (!id) return
            if (cachedTypes.includes(id)) return
            cachedTypes.push(id)

            thisType.ships.forEach(series => {
                series.forEach(ship => {
                    if (availableExtraShips.includes(ship.id))
                        extraShips.push(ship)
                })
            })

            return {
                name: shipTypes[id]._name,
                code: shipTypes[id].code,
                on: availableShipTypes.includes(id)
            }
        }).filter(obj => obj)

        return (
            <div className={className} {...props}>
                <h2>{data.name}</h2>
                <div className="types">
                    {types.map((obj, index) => (
                        <ShipTypeTag
                            name={obj.name}
                            code={obj.code}
                            on={obj.on}
                            key={index}
                        />
                    ))}
                </div>
                {!!(extraShips.length) && <div className="extra-ships">
                    {extraShips.map((ship, index) => (
                        <ShipExtra ship={ship} key={index} />
                    ))}
                </div>}
            </div>
        )
    }
}

@ImportStyle(require('./styles-shiptypetag.less'))
class ShipTypeTag extends React.Component {
    render() {
        return (
            <span className={classNames({
                [this.props.className]: true,
                'on': this.props.on
            })}>
                {this.props.name}
                <small className="code">[{this.props.code}]</small>
            </span>
        )
    }
}

class ShipExtra extends React.Component {
    render() {
        return (
            <span>
                {this.props.ship._name}
            </span>
        )
    }
}