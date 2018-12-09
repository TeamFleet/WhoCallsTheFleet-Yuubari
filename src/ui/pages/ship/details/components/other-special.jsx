import React from 'react'

import db from '@database'
import dataTP from 'kckit/src/data/tp'
import equipmentTypes from 'kckit/src/types/equipments'

import ComponentContainer from '@ui/containers/infos-component'
import Bullet from '@ui/components/bullet'

// import { ImportStyle } from 'sp-css-import'
// import styles from './combat-special.less'

// @connect()
// @ImportStyle(styles)
export default class ShipDetailsSpecialOther extends React.Component {
    render() {
        const {
            count_as_landing_craft
        } = this.props.ship.getCapability()
        return (
            <ComponentContainer className={this.props.className} title={__("ship_details.other_special")}>
                {count_as_landing_craft && <Bullet
                    title={__("ship_details.tp_bonus", {
                        bonus: count_as_landing_craft * dataTP.equipmentType[equipmentTypes.LandingCraft]
                    })}
                    level={2}
                />}
                {count_as_landing_craft && <Bullet
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
                </Bullet>}
                {!count_as_landing_craft && <Bullet
                    title={__("none")}
                    level={0}
                />}
            </ComponentContainer>
        )
    }
}
