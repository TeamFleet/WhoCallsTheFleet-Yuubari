import React from 'react'
import { extend } from 'koot'
import classNames from 'classnames'

import getShip from '@utils/get-ship'

import LinkEquipment from '@ui/components/link/equipment'
import Icon from '@ui/components/icon'


// ============================================================================


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
                    <dt className="cell" />
                    <Cell type="equipments" />
                    <Cell type="fixed" children={__("aaci.fixed")} />
                    <Cell type="modifier" children={__("aaci.modifier")} />
                </Row>
                {listAACI.map((aaci, index) => (
                    <Row key={index} className="row-aaci">
                        <dt className="cell">#{aaci.id}</dt>
                        <Cell type="equipments">
                            <Equipments icons={aaci.icons} />
                        </Cell>
                        <Cell type="fixed" children={`+${aaci.fixed}`} />
                        <Cell type="modifier" children={`x${aaci.modifier}`} />
                    </Row>
                ))}
            </Component>
        )
    }
)
export default AACITable


// ============================================================================


const Row = ({ className, ...props }) => (
    <dl className={classNames('row', className)} {...props} />
)

const Cell = ({ className, type, ...props }) => (
    <dd className={classNames('cell', className)} data-cell-type={type} {...props} />
)


// ============================================================================


const Equipments = ({ icons }) => {
    if (!Array.isArray(icons)) return null
    if (!icons.length) return null
    return icons.map((item, index) => (
        <Equipment key={index} icon={item} />
    ))
}
const Equipment = ({ className, icon, children, ...props }) => (
    <span className={classNames('equipment', className)} {...props}>
        {icon}
        {children}
    </span>
)
