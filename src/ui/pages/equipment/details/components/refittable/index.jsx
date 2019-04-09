import React from 'react'
import classNames from 'classnames'
import { extend } from 'koot'

import sortShips from '@utils/sort-ships'
import db from '@database'

import ComponentContainer from '@ui/containers/infos-component'
import Bullet from '@ui/components/bullet'
// import ListShips from '@ui/components/list/ships'
import LinkMini from '@ui/components/link-mini'
// import times from '@utils/times'



//


const EquipmentDetailsComponentRefittable = extend({
    styles: require('./styles.less')
})(
    ({ className, equipment }) => {
        const { equipmentTypes, shipCollections } = db
        const type = equipmentTypes[equipment.type] || {}
        const typeName = equipment.getType()
        const isEquipableExSlot = equipment.isEquipableExSlot()

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
                `[${equipment.id}]`
            ]*/)
            console.log('type', type)
        }

        return (
            <ComponentContainer className={className}>
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
                    isEquipableExSlot={equipment.isEquipableExSlot()}
                    listExSlotShips={equipment.exslot_on_ship}
                />
            </ComponentContainer>
        )
    }
)
export default EquipmentDetailsComponentRefittable


//


const Legends = extend({
    styles: require('./styles-shipcollection.less')
})(
    ({ className }) =>
        <div className={className + ' legends'}>
            <div className="list types">
                <LinkMini className="item off">
                    {__("equipment_details.refittable_legend_no")}
                </LinkMini>
                <LinkMini className="item on">
                    {__("equipment_details.refittable_legend_yes")}
                </LinkMini>
            </div>
        </div>
)


//


const ShipCollection = extend({
    styles: require('./styles-shipcollection.less')
})(
    ({
        className,
        data,
        availableShipTypes,
        availableExtraShips,
        ...props
    }) => {
        const { shipTypes } = db
        const cachedTypes = []
        // const cachedShips = []

        let extraShips = []
        const types = data.list.map(thisType => {
            const id = thisType.type
            if (!id) return

            thisType.ships.forEach(series => {
                series.forEach(ship => {
                    if (
                        (
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
)


//


const ShipTypeTag = extend({
    styles: require('./styles-shiptypetag.less')
})(
    ({ className, on, name, code }) =>
        <LinkMini className={classNames({
            [className]: true,
            'item': true,
            'on': !!(on),
            'off': !on
        })}>
            {name} <small className="code">[{code}]</small>
        </LinkMini>
)


//


const ExSlot = extend({
    styles: require('./styles-shipcollection.less')
})(
    ({
        className,
        isEquipableExSlot,
        listExSlotShips,
        ...props
    }) => {
        const list = sortShips(listExSlotShips || [])

        return (
            <ComponentContainer
                className={className + ' exslot'}
                title={__('exslot')}
                {...props}
            >
                {!!(isEquipableExSlot) && <Bullet
                    className="bullet"
                    title={__(`equipment_details.can_equip_in_ex_slot`)}
                    level={2}
                />}

                {!(isEquipableExSlot) && !!(list.length) && <Bullet
                    className="bullet"
                    title={__(`equipment_details.cannot_equip_in_ex_slot_but_ex_ships`)}
                    level={1}
                />}

                {!(isEquipableExSlot) && !(list.length) && <Bullet
                    className="bullet"
                    title={__(`equipment_details.cannot_equip_in_ex_slot`)}
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
)
