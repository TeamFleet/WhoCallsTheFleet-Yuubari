import React from 'react'
import classNames from 'classnames'

import kckit from 'kckit'
const checkAACI = kckit.check.aaci

import ComponentContainer from '@appUI/containers/infos-component'
import IconEquipment from '@appUI/components/icon-equipment'
// import Icon from '@appUI/components/icon'
import Bullet from '@appUI/components/bullet'

import { ImportStyle } from 'sp-css-import'
import styles from './aaci.less'

// @connect()
@ImportStyle(styles)
export default class ShipDetailsAACI extends React.Component {
    renderAACI(aaci, index) {
        return (
            <dl className={classNames(['item', {
                'is-limited': aaci.ship.isID || aaci.ship.isClass || aaci.ship.isType || aaci.ship.isBB
            }])} key={index}>
                <dt className="id">
                    #{aaci.id}
                    {aaci.ship.isID && <small>{__("ship_details.aaci_req.ship")}</small>}
                    {aaci.ship.isClass && <small>{__("ship_details.aaci_req.class")}</small>}
                    {(aaci.ship.isType || aaci.ship.isBB) && <small>{__("ship_details.aaci_req.type")}</small>}
                </dt>
                <dd className="icons">
                    {aaci.icons.map((icon, index) => <IconEquipment key={index} icon={icon} />)}
                </dd>
                <dd className="fixed">
                    +{aaci.fixed}
                </dd>
                <dd className="modifier">
                    x{aaci.modifier}
                </dd>
            </dl>
        )
    }
    render() {
        const aaciTypes = checkAACI(this.props.ship.id)
        const ableToAACI = (Array.isArray(aaciTypes) && aaciTypes.length) ? true : false
        if (__DEV__ && __CLIENT__) console.log('thisShip > AACI', aaciTypes)
        return (
            <ComponentContainer className={this.props.className} title={__("ship_details.aaci")}>
                {!ableToAACI && <Bullet
                    title={__("ship_details.aaci_unable")}
                    level={0}
                />}
                {ableToAACI && <dl className="item header">
                    <dt className="id" />
                    <dd className="icons" />
                    <dd className="fixed">{__("aaci.fixed")}</dd>
                    <dd className="modifier">{__("aaci.modifier")}</dd>
                </dl>}
                {ableToAACI && aaciTypes.map(this.renderAACI.bind(this))}
            </ComponentContainer>
        )
    }
}
