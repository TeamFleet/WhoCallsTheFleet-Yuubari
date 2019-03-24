import React from 'react'
import classNames from 'classnames'
import kckit from 'kckit'
import { extend } from 'koot'

import getShip from '@utils/get-ship'
import getPic from '@utils/get-pic.js'

import Markdown from '@ui/components/markdown'
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
            const { requirement, effect } = __(`special_attack["${specialAttack.name}"]`)
            // console.log(__("special_attack", specialAttack.name.replace(/ /g, '')))
            // console.log({ requirement, effect })
            const source = `#### ${__('ship_details.special_attack.requirements')}`
                + `\n\n`
                + requirement.join('\n')
                + `\n\n`
                + `#### ${__('ship_details.special_attack.effects')}`
                + `\n\n`
                + effect.map(line => (
                    /^[ -]+/.test(line) ? line : `\n${line}`
                )).join('\n')
            return (
                <ComponentContainer className={classNames([className, 'special-attack'])} title={specialAttack.name}>
                    <Image className="image" src={getPic(thisShip, 'special')} />
                    <Markdown
                        className="description"
                        source={source}
                        renderers={{
                            heading: ({ level, ...props }) => {
                                const Component = `h${level}`
                                return <Component {...props} />
                            }
                        }}
                    />
                </ComponentContainer>
            )
        }

        // 运输舰

        // 无内容
        return null
    }
)

export default SpecialCapability
