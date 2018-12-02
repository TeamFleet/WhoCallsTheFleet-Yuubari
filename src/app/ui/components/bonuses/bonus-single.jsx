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
        condition = (
            <LinkEquipment
                equipment={bonus.equipment}
                size="large"
                className="equipment color-alt"
            />
        )
    } else if (typeof equipment === 'object') {
        condition = 'EQUIPMENT'
        infoText = __('bonuses.info_prefix_when_equipped')
    }

    if (typeof bonus.bonusCount === 'object') {
        infoText += __('bonuses.based_on_number')
        arrStats = Object.keys(bonus.bonusCount)
            .sort((a, b) => parseInt(a) - parseInt(b))
            .map(count => (
                <div className="stats-line stats-has-extra" key={count}>
                    <div className="extra extra-type-count" data-count={count}>{count}</div>
                    <BonusStats stats={bonus.bonusCount[count]} />
                </div>
            ))
    } else if (typeof bonus.bonusImprove === 'object') {
        infoText += __('bonuses.based_on_star')
        arrStats = Object.keys(bonus.bonusImprove)
            .sort((a, b) => parseInt(a) - parseInt(b))
            .map(star => (
                <div className="stats-line stats-has-extra" key={star}>
                    <div className="extra extra-type-star" data-star={star}>{star}</div>
                    <BonusStats stats={bonus.bonusImprove[star]} />
                </div>
            ))
    } else if (typeof bonus.bonusArea === 'object') {
        infoText += __('bonuses.based_on_area')
        arrStats = Object.keys(bonus.bonusArea)
            .map(area => (
                <div className="stats-line stats-has-extra" key={area}>
                    <div className="extra extra-type-area" data-area={area}>{__(`area.${area.toLowerCase()}`)}</div>
                    <BonusStats stats={bonus.bonusArea[area]} />
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
