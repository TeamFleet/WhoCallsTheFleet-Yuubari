import React from 'react'
import classNames from 'classnames'

import LinkEquipment from '@ui/components/link/equipment'

import Stats from './stats'
import ConditionShip from './condition-ship'

export default ({
    className,
    bonus,
    thisShip, thisEquipment,
}) => {
    if (typeof bonus !== 'object') return null

    let condition = null

    // 条件
    if (typeof thisShip === 'object') {
        condition = (
            <LinkEquipment
                equipment={bonus.equipment}
                iconSize="large"
                className="condition mod-equipment color-alt"
            />
        )
    } else if (typeof thisEquipment === 'object') {
        condition = <ConditionShip condition={bonus.ship} />
    }

    return (
        <div className={classNames([className, 'is-single'])}>
            {condition}
            <Stats bonus={bonus} />
        </div>
    )
}
