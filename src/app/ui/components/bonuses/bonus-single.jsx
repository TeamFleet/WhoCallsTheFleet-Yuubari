import React from 'react'
import classNames from 'classnames'

import LinkEquipment from '@ui/components/link/equipment'

import BonusStats from './stats'
import ConditionShip from './condition-ship'

export default ({
    className,
    bonus,
    thisShip, thisEquipment,
}) => {
    if (typeof bonus !== 'object') return null

    let condition = null
    let infoText = ''
    let stats

    // 条件
    if (typeof thisShip === 'object') {
        condition = (
            <LinkEquipment
                equipment={bonus.equipment}
                size="large"
                className="condition is-equipment equipment color-alt"
            />
        )
    } else if (typeof thisEquipment === 'object') {
        /** @type {Array} 舰娘条件 (排除 canequip 条件) */
        // const conditions = typeof bonus.ship === 'object'
        //     ? Object.keys(bonus.ship).filter(key => key.toLowerCase() !== 'canequip')
        //     : []
        // const conditionIsOnlyNotType = (
        //     typeof bonus.ship === 'object' &&
        //     conditions.length === 1 &&
        //     bonus.ship.isNotType !== 'undefined'
        // )
        // infoText = __('bonuses.info_prefix_when_equipped')
        // if (typeof bonus.ship === 'object' && conditions.length === 0) {
        //     // 没有特定条件
        //     infoText = __('bonuses.info_prefix_when_equipped')
        // }
        condition = <ConditionShip condition={bonus.ship} />
    }

    // 加成内容
    if (typeof bonus.bonusCount === 'object') {
        infoText += __('bonuses.based_on_number')
        stats = Object.keys(bonus.bonusCount)
            .sort((a, b) => parseInt(a) - parseInt(b))
            .map(count => (
                <div className="stats-line stats-has-extra" key={count}>
                    <div className="extra extra-type-count" data-count={count}>{count}</div>
                    <BonusStats stats={bonus.bonusCount[count]} />
                </div>
            ))
    } else if (typeof bonus.bonusImprove === 'object') {
        infoText += __('bonuses.based_on_star')
        stats = Object.keys(bonus.bonusImprove)
            .sort((a, b) => parseInt(a) - parseInt(b))
            .map(star => (
                <div className="stats-line stats-has-extra" key={star}>
                    <div className="extra extra-type-star" data-star={star}>{star}</div>
                    <BonusStats stats={bonus.bonusImprove[star]} />
                </div>
            ))
    } else if (typeof bonus.bonusArea === 'object') {
        infoText += __('bonuses.based_on_area')
        stats = Object.keys(bonus.bonusArea)
            .map(area => (
                <div className="stats-line stats-has-extra" key={area}>
                    <div className="extra extra-type-area" data-area={area}>{__(`area.${area.toLowerCase()}`)}</div>
                    <BonusStats stats={bonus.bonusArea[area]} />
                </div>
            ))
    } else if (typeof bonus.bonus === 'object') {
        infoText += __('bonuses.based_on_nothing')
        stats = <BonusStats stats={bonus.bonus} />
    }

    return (
        <div className={classNames([className, 'is-single'])}>
            {condition}
            <div className="infos" children={infoText} />
            <div className="stats">
                {stats}
            </div>
        </div>
    )
}
