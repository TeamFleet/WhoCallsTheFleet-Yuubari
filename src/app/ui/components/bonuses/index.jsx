import React from 'react'
import { ImportStyle } from 'sp-css-import'

import ComponentContainer from '@ui/containers/infos-component'
import BonusSingle from './bonus-single'

export default ImportStyle(require('./styles.less'))(({
    className,
    bonuses,
    ship, equipment,
}) => {
    if (!Array.isArray(bonuses) && (ship || equipment))
        bonuses = (ship || equipment).getBonuses()

    const single = []
    const set = []
    bonuses.forEach(bonus => {
        if (typeof bonus.equipments === 'object')
            set.push(bonus)
        else
            single.push(bonus)
    })

    console.log(single, set)

    return (
        <div className={className}>
            <ComponentContainer
                className="bonuses bonuses-single"
                title={__("bonuses.single")}
            >

                {single.length
                    ? (
                        <div className="grid">
                            {single.map((bonus, index) => (
                                <BonusSingle key={index} className="item" bonus={bonus} ship={ship} equipment={equipment} />
                            ))}
                        </div>
                    )
                    : <span className="disabled">{__("none")}</span>
                }
            </ComponentContainer>
            <ComponentContainer
                className="bonuses bonuses-sets"
                title={__("bonuses.sets")}
            >
                {set.length
                    ? (
                        <div className="grid">
                            SETS
                        </div>
                    )
                    : <span className="disabled">{__("none")}</span>
                }
            </ComponentContainer>
        </div>
    )
})
