import React from 'react'
import classNames from 'classnames'

import Link from '@appUI/components/link'

import getShip from '@appUtils/get-ship.js'
import getEquipment from '@appUtils/get-equipment.js'
import getEntity from '@appUtils/get-entity.js'
import getPic from '@appUtils/get-pic.js'
import getLink from '@appUtils/get-link.js'

import { ImportStyle } from 'sp-css-import'

@ImportStyle(require('./styles.less'))
export default class LinkMini extends React.Component {
    render() {
        const {
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
        } = this.props

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
}