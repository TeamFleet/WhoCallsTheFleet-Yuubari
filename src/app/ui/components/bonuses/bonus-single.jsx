import React from 'react'
import classNames from 'classnames'

import LinkEquipment from '@ui/components/link/equipment'

import BonusStats from './stats'

export default ({
    className,
    bonus,
    ship, equipment,
}) => {
    if (typeof bonus !== 'object') return null

    let condition = null
    let infoText = ''
    let arrStats

    if (typeof ship === 'object') {
        condition = <LinkEquipment equipment={bonus.equipment} />
    } else if (typeof equipment === 'object') {
        condition = 'EQUIPMENT'
        infoText = __('bonuses.info_prefix_when_equipped')
    }

    if (typeof bonus.bonusCount === 'object') {
        infoText += __('bonuses.based_on_number')
        arrStats = Object.keys(bonus.bonusCount)
            .sort((a, b) => parseInt(a) - parseInt(b))
            .map(count => (
                <div className="has-extra" key={count}>
                    <div className="extra count" data-count={count}>{count}</div>
                    <BonusStats stats={bonus.bonusCount[count]} />
                </div>
            ))
    } else if (typeof bonus.bonusImprove === 'object') {
        infoText += __('bonuses.based_on_star')
        arrStats = Object.keys(bonus.bonusImprove)
            .sort((a, b) => parseInt(a) - parseInt(b))
            .map(star => (
                <div className="has-extra" key={star}>
                    <div className="extra star" data-star={star}>{star}</div>
                    <BonusStats stats={bonus.bonusImprove[star]} />
                </div>
            ))
    } else if (typeof bonus.bonus === 'object') {
        infoText += __('bonuses.based_on_nothing')
        arrStats = <BonusStats stats={bonus.bonus} />
    }

    return (
        <div className={classNames([className, 'bonus', 'bonus-single'])}>
            <div className="condition" children={condition} />
            <div className="infos" children={infoText} />
            <div className="stats">
                {arrStats}
            </div>
        </div>
    )
}
