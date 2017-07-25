import React from 'react'
import classNames from 'classnames'

import kckit from 'kckit'
const checkAACI = kckit.check.aaci

import ComponentContainer from '../commons/component-container.jsx'
import IconEquipment from 'UI/components/icon-equipment'
import Icon from 'UI/components/icon'
import Special from '../commons/special.jsx'

import translate from 'sp-i18n'

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
                    {aaci.ship.isID && <small>{translate("ship_details.aaci_req.ship")}</small>}
                    {aaci.ship.isClass && <small>{translate("ship_details.aaci_req.class")}</small>}
                    {(aaci.ship.isType || aaci.ship.isBB) && <small>{translate("ship_details.aaci_req.type")}</small>}
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
        if (__DEV__) console.log('thisShip > AACI', aaciTypes)
        return (
            <ComponentContainer className={this.props.className} title={translate("ship_details.aaci")}>
                {!ableToAACI && <Special
                    title={translate("ship_details.aaci_unable")}
                    level={0}
                />}
                {ableToAACI && <dl className="item header">
                    <dt className="id" />
                    <dd className="icons" />
                    <dd className="fixed">{translate("aaci.fixed")}</dd>
                    <dd className="modifier">{translate("aaci.modifier")}</dd>
                </dl>}
                {ableToAACI && aaciTypes.map(this.renderAACI.bind(this))}
            </ComponentContainer>
        )
    }
}