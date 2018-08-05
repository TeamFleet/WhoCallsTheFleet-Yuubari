import React from 'react'
// import { ImportStyle } from 'sp-css-import'

import Bonuses from '@ui/components/bonuses'

export default ({
    className,
    ship,
}) =>
    <Bonuses
        className={className}
        bonuses={ship.getBonuses()}
    />
