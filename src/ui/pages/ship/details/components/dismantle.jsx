import React from 'react'
import classNames from 'classnames'
import { extend } from 'koot'

import ComponentContainer from '@ui/containers/infos-component'
import Stat from '@ui/components/stat'
import getValue from '@utils/get-value'
import resources from '@const/resources'

const ShipDetailsComponentDismantle = extend({
    styles: require('./modernization.less')
})(
    ({ className, ship }) => {
        const hasDismantle = Array.isArray(ship.scrap)
        return (
            <ComponentContainer className={className} title={__("ship_details.dismantle")}>
                {!hasDismantle && __("none")}
                {hasDismantle && resources.map((stat, index) => {
                    const value = getValue(ship.scrap[index])
                    return (
                        <Stat
                            className={
                                classNames(['item', {
                                    disabled: !value
                                }])
                            }
                            key={index}
                            stat={stat}
                        >
                            {value}
                        </Stat>
                    )
                })}
            </ComponentContainer>
        )
    }
)

export default ShipDetailsComponentDismantle
