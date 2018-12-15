import React from 'react'
import { extend } from 'koot'
import classNames from 'classnames'

import bonusIsSet from './bonus-is-set'
import ComponentContainer from '@ui/containers/infos-component'
import BonusSingle from './bonus-single'
import BonusSet from './bonus-set'

export default extend({
    styles: require('./styles.less')
})(({
    className, ['data-class-name']: classNameThis,
    bonuses,
    ship, equipment,
}) => {
    if (!Array.isArray(bonuses) && (ship || equipment))
        bonuses = (ship || equipment).getBonuses()

    const single = []
    const set = []
    bonuses.forEach(bonus => {
        if (bonusIsSet(bonus))
            set.push(bonus)
        else
            single.push(bonus)
    })

    if (__CLIENT__ && __DEV__) console.log('Bonuses', single, set)

    // const classNameBonuses = classNameThis + '-bonuses'
    const classNameList = classNameThis + '-list'
    const classNameItem = classNameThis + '-bonus'

    return (
        <div className={className}>
            <ComponentContainer
                // className={classNameBonuses}
                title={__("bonuses.single")}
                titleType="line-append"
            >
                {single.length
                    ? (
                        <div className={classNames({
                            [classNameList]: true,
                            'mod-gird': single.length > 1,
                            'is-single': true,
                            'is-ship': !!ship,
                            'is-equipment': !!equipment,
                        })}>
                            {single.map((bonus, index) => (
                                <BonusSingle
                                    key={index}
                                    className={classNameItem}
                                    bonus={bonus}
                                    thisShip={ship}
                                    thisEquipment={equipment}
                                />
                            ))}
                        </div>
                    )
                    : <span className="disabled">{__("none")}</span>
                }
            </ComponentContainer>
            <ComponentContainer
                // className={classNames([classNameBonuses, "is-sets"])}
                title={__("bonuses.sets")}
                titleType="line-append"
            >
                {set.length
                    ? (
                        <div className={classNames({
                            [classNameList]: true,
                            'is-set': true,
                            'is-ship': !!ship,
                            'is-equipment': !!equipment,
                        })}>
                            {set.map((bonus, index) => (
                                <BonusSet
                                    key={index}
                                    className={classNameItem}
                                    bonus={bonus}
                                    thisShip={ship}
                                    thisEquipment={equipment}
                                />
                            ))}
                        </div>
                    )
                    : <span className="disabled">{__("none")}</span>
                }
            </ComponentContainer>
        </div>
    )
})
