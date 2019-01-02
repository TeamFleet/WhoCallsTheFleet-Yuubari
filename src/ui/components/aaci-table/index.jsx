import React from 'react'
import { extend } from 'koot'
import classNames from 'classnames'

import getShip from '@utils/get-ship'

import LinkEquipment from '@ui/components/link/equipment'
import Icon from '@ui/components/icon'

const AACITable = extend({
    styles: require('./styles.less')
})(
    ({
        className,
        component, tag, element,
        ship: _ship,
        empty, unable,
    }) => {
        if (!_ship) return null

        const Component = component || tag || element || 'div'

        const ship = getShip(_ship)
        const listAACI = getShip(ship).getAACI()

        if (!Array.isArray(listAACI) || !listAACI.length) {
            return empty || unable || (
                <Component className={classNames([className, 'is-unable'])}>
                    {__("ship_details.aaci_unable")}
                </Component>
            )
        }

        if (__DEV__ && __CLIENT__) console.log('thisShip > AACI', listAACI)

        return (
            <Component className={className}>
                <Row className="header">
                    <dt className="id" />
                    <Cell className="equipments" />
                    <Cell className="fixed" children={__("aaci.fixed")} />
                    <Cell className="modifier" children={'123' + __("aaci.modifier")} />
                </Row>
            </Component>
        )
    }
)

const Row = ({ className, ...props }) => (
    <dl className={classNames('row', className)} {...props} />
)

const Cell = ({ className, ...props }) => (
    <dd className={classNames('cell', className)} {...props} />
)

export default AACITable
