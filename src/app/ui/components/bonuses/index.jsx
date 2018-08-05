import React from 'react'
import { ImportStyle } from 'sp-css-import'

import ComponentContainer from '@ui/containers/infos-component'

export default ImportStyle(require('./styles.less'))(({
    className,
    bonuses = [],
}) => {
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
                    ? "SINGLE"
                    : <span className="disabled">{__("none")}</span>
                }
            </ComponentContainer>
            <ComponentContainer
                className="bonuses bonuses-sets"
                title={__("bonuses.sets")}
            >
                {set.length 
                    ? "SETS"
                    : <span className="disabled">{__("none")}</span>
                }
            </ComponentContainer>
        </div>
    )
})
