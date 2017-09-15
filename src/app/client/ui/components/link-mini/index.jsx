import React from 'react'

import Link from '@appUI/components/link'

import getShip from '@appUtils/get-ship.js'
import getPic from '@appUtils/get-pic.js'
import getLink from '@appUtils/get-link.js'

import { ImportStyle } from 'sp-css-import'

@ImportStyle(require('./styles.less'))
export default class LinkMini extends React.Component {
    render() {
        const {
            ship: _ship,
            equipment: _equipment,
            id: _id,

            to: _to,
            href: _href,

            className,
            children,
            ...props
        } = this.props

        const to = _to || _href || undefined
        const ship = getShip(_ship || _id)
        const equipment = getShip(_equipment || _id)

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

        if (equipment)
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