import React from 'react'
import classNames from 'classnames'

import equipmentStats from '@const/equipment-stats'

import Stat from '@ui/components/stat'

export default ({
    bonus
}) => {
    if (typeof bonus !== 'object') return null

    const isSet = typeof bonus.equipments === 'object'
    let infoText = isSet ? __('bonuses.based_set') : ''
    let stats

    if (typeof bonus.bonusCount === 'object') {
        if (!isSet) infoText = __('bonuses.based_on_number')
        stats = Object.keys(bonus.bonusCount)
            .sort((a, b) => parseInt(a) - parseInt(b))
            .map(count => (
                <div className="stats-line stats-has-extra" key={count}>
                    <div className="extra extra-type-count" data-count={count}>{count}</div>
                    <BonusStats stats={bonus.bonusCount[count]} />
                </div>
            ))
    } else if (typeof bonus.bonusImprove === 'object') {
        if (!isSet) infoText = __('bonuses.based_on_star')
        stats = Object.keys(bonus.bonusImprove)
            .sort((a, b) => parseInt(a) - parseInt(b))
            .map(star => (
                <div className="stats-line stats-has-extra" key={star}>
                    <div className="extra extra-type-star" data-star={star}>{star}</div>
                    <BonusStats stats={bonus.bonusImprove[star]} />
                </div>
            ))
    } else if (typeof bonus.bonusArea === 'object') {
        if (!isSet) infoText = __('bonuses.based_on_area')
        stats = Object.keys(bonus.bonusArea)
            .map(area => (
                <div className="stats-line stats-has-extra" key={area}>
                    <div className="extra extra-type-area" data-area={area}>{__(`area.${area.toLowerCase()}`)}</div>
                    <BonusStats stats={bonus.bonusArea[area]} />
                </div>
            ))
    } else if (typeof bonus.bonus === 'object') {
        if (!isSet) infoText = __('bonuses.based_on_nothing')
        stats = <BonusStats stats={bonus.bonus} />
    }

    return (
        <React.Fragment>
            {infoText ? <div className="infos" children={infoText} /> : null}
            <div className="stats">
                {stats}
            </div>
        </React.Fragment>
    )
}

const BonusStats = ({
    stats,
}) => {
    if (typeof stats !== 'object') return null

    return (
        <React.Fragment>
            {equipmentStats
                .filter(stat => !isNaN(stats[stat]) && stats[stat])
                .map((stat, index) => {
                    const value = stats[stat]
                    let text = ''
                    const classes = ['stat']

                    switch (stat) {
                        case 'range': {
                            if (value <= 1) text = __('bonuses.range_increase')
                                + ' (' + __('bonuses.stat_donot_stack') + ')'
                            break
                        }
                        default: {
                            if (typeof value === 'string')
                                text = `+${value} ${__('bonuses.stat_donot_stack')}`
                            else if (value < 0) {
                                text = value
                                classes.push('negative')
                            } else
                                text = `+${value}`
                        }
                    }

                    return (
                        <Stat
                            key={index}
                            type={undefined}
                            className={classNames(classes)}
                            stat={stat}
                            children={text}
                            type={stat !== 'range' ? __(`stat`, stat) : undefined}
                        />
                    )
                })}
        </React.Fragment>
    )
}
