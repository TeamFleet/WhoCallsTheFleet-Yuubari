import React from 'react'
import classNames from 'classnames'
import kckit from 'kckit'
import { extend } from 'koot'

import getShip from '@utils/get-ship'
import getPic from '@utils/get-pic.js'

import ComponentContainer from '@ui/containers/infos-component'
import Image from '@ui/components/image'

const SpecialCapability = extend({
    styles: require('./special-capability.less')
})(
    ({ className, ship }) => {
        const thisShip = getShip(ship)
        if (!thisShip) return null

        // 特殊攻击
        let specialAttack
        kckit.data.specialAttack.some(sa => {
            if (kckit.check.ship(thisShip, sa.ship || {})) {
                specialAttack = sa
                return true
            }
            return false
        })
        if (specialAttack) {
            return (
                <ComponentContainer className={classNames([className, 'special-attack'])} title={specialAttack.name}>
                    <div className="wrapper">
                        <div className="description">123</div>
                        <Image className="image" src={getPic(thisShip, 'special')} />
                    </div>
                </ComponentContainer>
            )
        }

        // 运输舰

        // 无内容
        return null
    }
)

export default SpecialCapability
