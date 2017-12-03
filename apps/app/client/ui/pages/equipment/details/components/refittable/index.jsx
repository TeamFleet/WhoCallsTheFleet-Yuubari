import React from 'react'
import classNames from 'classnames'

import ComponentContainer from '@appUI/containers/infos-component'
import Bullet from '@appUI/components/bullet'
// import ListShips from '@appUI/components/list/ships'
import LinkMini from '@appUI/components/link-mini'
// import times from '@appUtils/times'

import sortShips from '@appUtils/sort-ships'

import { db } from 'kckit'
const {
    equipmentTypes,
    shipCollections,
    shipTypes,
    // ships
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

        if (__DEV__ && __CLIENT__) {
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
                <Legends />

                {shipCollections.map((shipCollection, index) => (
                    <ShipCollection
                        data={shipCollection}
                        availableShipTypes={availableShipTypes}
                        availableExtraShips={availableExtraShips}
                        key={index}
                    />
                ))}

                <ExSlot
                    isEquipableExSlot={this.props.equipment.isEquipableExSlot()}
                    listExSlotShips={this.props.equipment.exslot_on_ship}
                />
            </ComponentContainer>
        )
    }
}

@ImportStyle(require('./styles-shipcollection.less'))
class Legends extends React.Component {
    render() {
        return (
            <div className={this.props.className + ' legends'}>
                <div className="list types">
                    <LinkMini className="item off">
                        {translate("equipment_details.refittable_legend_no")}
                    </LinkMini>
                    <LinkMini className="item on">
                        {translate("equipment_details.refittable_legend_yes")}
                    </LinkMini>
                </div>
            </div>
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

        let extraShips = []
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

        // const placeholders = []
        // times(10)(index => placeholders.push(
        //     <span className="item placeholder" key={index}></span>
        // ))

        // if (extraShips.length > 1) {
        //     console.log(extraShips.map(ship => ship._name))
        //     console.log(sortShips(extraShips).map(ship => ship._name))
        // }

        return (
            <ComponentContainer
                className={className}
                title={data.name}
                {...props}
            >
                <div className="list types">
                    {types.map((obj, index) => (
                        <ShipTypeTag
                            name={obj.name}
                            code={obj.code}
                            on={obj.on}
                            key={index}
                        />
                    ))}
                </div>
                {!!(extraShips.length) && (
                    <div className="list ships">
                        {sortShips(extraShips).map(ship => (
                            <LinkMini className="item" ship={ship} key={ship.id} badge={true} />
                        ))}
                    </div>
                )}
            </ComponentContainer>
        )
    }
}

@ImportStyle(require('./styles-shiptypetag.less'))
class ShipTypeTag extends React.Component {
    render() {
        return (
            <LinkMini className={classNames({
                [this.props.className]: true,
                'item': true,
                'on': !!(this.props.on),
                'off': !this.props.on
            })}>
                {this.props.name} <small className="code">[{this.props.code}]</small>
            </LinkMini>
        )
        // return (
        //     <span className={classNames({
        //         [this.props.className]: true,
        //         'item': true,
        //         'on': this.props.on
        //     })}>
        //         {this.props.name} <small className="code">[{this.props.code}]</small>
        //     </span>
        // )
    }
}

@ImportStyle(require('./styles-shipcollection.less'))
class ExSlot extends React.Component {
    render() {
        const {
            className,
            isEquipableExSlot,
            listExSlotShips,
            ...props
        } = this.props

        const list = sortShips(listExSlotShips || [])

        return (
            <ComponentContainer
                className={className + ' exslot'}
                title={translate('exslot')}
                {...props}
            >
                {!!(isEquipableExSlot) && <Bullet
                    className="bullet"
                    title={translate(`equipment_details.can_equip_in_ex_slot`)}
                    level={2}
                />}

                {!(isEquipableExSlot) && !!(list.length) && <Bullet
                    className="bullet"
                    title={translate(`equipment_details.cannot_equip_in_ex_slot_but_ex_ships`)}
                    level={1}
                />}

                {!(isEquipableExSlot) && !(list.length) && <Bullet
                    className="bullet"
                    title={translate(`equipment_details.cannot_equip_in_ex_slot`)}
                    level={0}
                />}

                {!!(list.length) && (
                    <div className="list ships">
                        {list.map(shipId => (
                            <LinkMini className="item" ship={shipId} key={shipId} />
                        ))}
                    </div>
                )}
            </ComponentContainer>
        )
    }
}