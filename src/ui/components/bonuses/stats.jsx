import React from 'react'
import classNames from 'classnames'

import equipmentStats from '@const/equipment-stats'

import Stat from '@ui/components/stat'

export default ({
    stats: bonusStats,
}) => {
    if (typeof bonusStats !== 'object') return null

    return (
        <React.Fragment>
            {equipmentStats
                .filter(stat => !isNaN(bonusStats[stat]) && bonusStats[stat])
                .map((stat, index) => {
                    const value = bonusStats[stat]
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
