import React from 'react'
import classNames from 'classnames'
import kckit from 'kckit'
import { extend } from 'koot'

import db from '@database'
import dataTP from 'kckit/src/data/tp'
import equipmentTypes from 'kckit/src/types/equipments'
import getShip from '@utils/get-ship'
import getPic from '@utils/get-pic.js'

import Markdown from '@ui/components/markdown'
import ComponentContainer from '@ui/containers/infos-component'
import Image from '@ui/components/image'
import Bullet from '@ui/components/bullet'

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

        const {
            count_as_landing_craft,
            attack_surface_ship_prioritised
        } = thisShip.getCapability()

        // 运输舰
        if (count_as_landing_craft) {
            return (
                <ComponentContainer
                    className={classNames([className, 'count-as-landing-craft'])}
                    title={__("ship_specials.transportation.title")}
                >
                    <Bullet
                        title={__("ship_details.tp_bonus", {
                            bonus: count_as_landing_craft * dataTP.equipmentType[equipmentTypes.LandingCraft]
                        })}
                        level={2}
                    />
                    <Bullet
                        title={__("ship_details.expedition_bonus", {
                            bonus: `${5 * count_as_landing_craft}%`
                        })}
                        level={2}
                    >
                        {__("ship_details.expedition_bonus_daihatsu_description", {
                            daihatsu: db.equipments[68]._name
                        })}
                        <br />
                        {__("ship_details.expedition_bonus_daihatsu_description2", {
                            daihatsu: db.equipments[68]._name
                        })}
                    </Bullet>
                </ComponentContainer>
            )
        }

        // 攻击航母
        if (ship.isType('cv') && attack_surface_ship_prioritised) {
            return (
                <ComponentContainer
                    className={classNames([className, 'attack-surface-ship-prioritised'])}
                    title={db.shipTypes[30]._name}
                >
                    <Bullet
                        title={__("ship_details.light_attack_carrier_asw_title")}
                        level={2}
                    >
                        {__("ship_details.light_attack_carrier_asw_note")}
                    </Bullet>
                </ComponentContainer>
            )

        }

        // 无内容
        return null

    }
)

export default SpecialCapability
