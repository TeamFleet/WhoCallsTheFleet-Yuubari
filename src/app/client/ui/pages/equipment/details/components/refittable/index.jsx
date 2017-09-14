import React from 'react'

import ComponentContainer from '@appUI/containers/infos-component'

import { db } from 'kckit'
const {
    equipmentTypes,
    shipCollections,
    shipTypes,
    ships,
    shipsSpecial
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

        const extraShips = []
        const cached = []
        const types = data.list.map(thisType => {
            const id = thisType.type
            if (!id) return
            if (cached.includes(id)) return
            cached.push[id]

            // extraShips = thisType.ships.filter(ship => (
            //     availableExtraShips.includes(ship.id)
            // ))
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
        })

        return (
            <div className={className} {...props}>
                <h2>{data.name}</h2>
                <p>{JSON.stringify(types)}</p>
                <p>{extraShips.map(ship => ship._name).join(' / ')}</p>
            </div>
        )
    }
}