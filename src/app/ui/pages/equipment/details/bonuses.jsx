import React from 'react'
// import { ImportStyle } from 'sp-css-import'

import Bonuses from '@ui/components/bonuses'

export default ({
    className,
    equipment,
}) => (
    <Bonuses
        className={className}
        bonuses={equipment.getBonuses()}
    />
)
