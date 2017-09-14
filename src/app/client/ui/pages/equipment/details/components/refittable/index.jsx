import React from 'react'
import classNames from 'classnames'

import ComponentContainer from '@appUI/containers/infos-component'
import ListShips from '@appUI/components/list/ships'
import times from '@appUtils/times'

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

@ImportStyle(require('./styles-shipcollection.less'))
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

            thisType.ships.forEach(series => {
                series.forEach(ship => {
                    if ((
                        ship.type_display && ship.type_display !== ship.type
                        && availableShipTypes.includes(ship.type)
                        && !availableShipTypes.includes(ship.type_display)
                    ) || (
                            availableExtraShips.includes(ship.id)
                            && !availableShipTypes.includes(ship.type)
                            && !availableShipTypes.includes(ship.type_display)
                        )
                    ) {
                        extraShips.push(ship)
                    }
                })
            })

            return {
                name: shipTypes[id]._name,
                code: shipTypes[id].code,
                on: availableShipTypes.includes(id)
            }
        }).filter(obj => {
            if (!obj) return false
            if (cachedTypes.includes(obj.name)) return false
            cachedTypes.push(obj.name)
            return true
        })

        const placeholders = []
        times(10)(index => placeholders.push(
            <span className="item placeholder" key={index}></span>
        ))

        return (
            <ComponentContainer
                className={className}
                title={data.name}
                {...props}
            >
                <div className="types">
                    {types.map((obj, index) => (
                        <ShipTypeTag
                            name={obj.name}
                            code={obj.code}
                            on={obj.on}
                            key={index}
                        />
                    ))}
                    {placeholders}
                </div>
                {!!(extraShips.length) &&
                    <ListShips
                        list={extraShips}
                        navy={true}
                    />
                }
            </ComponentContainer>
        )
    }
}

@ImportStyle(require('./styles-shiptypetag.less'))
class ShipTypeTag extends React.Component {
    render() {
        return (
            <span className={classNames({
                [this.props.className]: true,
                'item': true,
                'on': this.props.on
            })}>
                {this.props.name} <small className="code">[{this.props.code}]</small>
            </span>
        )
    }
}