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
        ship,
        equipment,
        entity,
        id,

        to: _to,
        href: _href,
        noLink = false,

        className,
        badge,

        name,
        children,
        ...props
    }) => {

        const to = _to || _href || undefined
        let Component = 'span'

        props.className = classNames({
            [className]: true,
            'mod-badge': !!badge
        })
        props.children = children

        if (ship || id) {
            const thisShip = getShip(ship || id)
            props.children = (
                <React.Fragment>
                    <span className="avatar" style={{
                        backgroundImage: `url(${getPic('ship', thisShip.id, '0-2')})`
                    }} />
                    {name || thisShip._name}
                    {children}
                </React.Fragment>
            )
            if (!noLink) {
                Component = Link
                props.to = to || getLink('ship', thisShip.id)
            }
        } else if (equipment) {
            const thisEquipment = getEquipment(equipment)
            props.children = (
                <React.Fragment>
                    {name || thisEquipment._name}
                    {children}
                </React.Fragment>
            )
            if (!noLink) {
                Component = Link
                props.to = to || getLink('equipment', thisEquipment.id)
            }
        } else if (entity) {
            const thisEntity = getEquipment(entity)
            props.children = (
                <React.Fragment>
                    {name || thisEntity._name}
                    {children}
                </React.Fragment>
            )
            if (!noLink) {
                Component = Link
                props.to = to || getLink('entity', thisEntity.id)
            }
        } else if (to) {
            Component = Link
            props.to = to
        }

        return <Component {...props} />

    }
)

export default LinkMini
