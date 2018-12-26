import React from 'react'
import classNames from 'classnames'
import { extend } from 'koot'

import ComponentContainer from '@ui/containers/infos-component'
import Stat from '@ui/components/stat'
import getValue from '@utils/get-value'

const stats = [
    'fire',
    'torpedo',
    'aa',
    'armor'
]

const ShipDetailsComponentModernization = extend({
    styles: require('./modernization.less')
})(
    ({ className, ship }) => {
        const hasModernization = Array.isArray(ship.modernization)
        return (
            <ComponentContainer className={className} title={__("ship_details.modernization")}>
                {!hasModernization && __("none")}
                {hasModernization && stats.map((stat, index, value) => (
                    <Item key={index} ship={ship} stat={stat} index={index} value={value} />
                ))}
                {ship.id === 163 && <Item ship={ship} stat='luck' value={1.2} />}
                {ship.id === 402 && <Item ship={ship} stat='luck' value={1.6} />}
            </ComponentContainer>
        )
    }
)

export default ShipDetailsComponentModernization

const Item =
    ({ stat, index, value, ship }) => {
        if (Array.isArray(value)) value = getValue(ship.modernization[index])
        return (
            <Stat
                className={
                    classNames(['item', {
                        disabled: !value
                    }])
                }
                stat={stat}
            >
                +{value}
            </Stat>
        )
    }
