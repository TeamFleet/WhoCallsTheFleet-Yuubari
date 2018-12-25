import React from 'react'
import classNames from 'classnames'
import { extend } from 'koot'

import Link from '@ui/components/link'

import getShip from '@utils/get-ship'
import getEquipment from '@utils/get-equipment'
import getEntity from '@utils/get-entity'
import getPic from '@utils/get-pic'
import getLink from '@utils/get-link'

const LinkMini = extend({
    styles: require('./styles.less')
})(
    ({
        ship: _ship,
        equipment: _equipment,
        entity: _entity,
        id: _id,

        to: _to,
        href: _href,

        className: _className,
        badge,

        children,
        ...props
    }) => {
        const to = _to || _href || undefined
        const ship = getShip(_ship || _id)
        const className = classNames({
            [_className]: true,
            'mod-badge': !!badge
        })

        if (ship)
            return (
                <Link
                    className={className}
                    to={to || getLink('ship', ship.id)}
                    {...props}
                >
                    <span className="avatar" style={{
                        backgroundImage: `url(${getPic('ship', ship.id, '0-2')})`
                    }} />
                    {ship._name}
                    {children}
                </Link>
            )

        if (_equipment) {
            const equipment = getEquipment(_equipment)
            return (
                <Link
                    className={className}
                    to={to || getLink('equipment', equipment.id)}
                    {...props}
                >
                    {equipment._name}
                    {children}
                </Link>
            )
        }

        if (_entity) {
            const entity = getEntity(_entity)
            return (
                <Link
                    className={className}
                    to={to || getLink('entity', entity.id)}
                    {...props}
                >
                    {entity._name}
                    {children}
                </Link>
            )
        }

        if (to)
            return (
                <Link
                    className={className}
                    to={to}
                    {...props}
                >
                    {children}
                </Link>
            )

        return (
            <span
                className={className}
                {...props}
            >
                {children}
            </span>
        )
    }
)

export default LinkMini
