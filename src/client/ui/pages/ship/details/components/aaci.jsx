import React from 'react'
import checkAACI from 'kckit/src/check/aaci'

import ComponentContainer from '../commons/component-container.jsx'
import IconEquipment from 'UI/components/icon-equipment'

import translate from 'sp-i18n'

import { ImportStyle } from 'sp-css-import'
import styles from './aaci.less'

// @connect()
@ImportStyle(styles)
export default class ShipDetailsAACI extends React.Component {
    renderAACI(aaci, index) {
        return (
            <dl className="item" key={index}>
                <dt className="id">#{aaci.id}</dt>
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
        return (
            <ComponentContainer className={this.props.className} title={translate("ship_details.aaci")}>
                <dl className="item header">
                    <dt className="id" />
                    <dd className="icons" />
                    <dd className="fixed">{translate("aaci.fixed")}</dd>
                    <dd className="modifier">{translate("aaci.modifier")}</dd>
                </dl>
                {checkAACI(this.props.ship.id).map(this.renderAACI.bind(this))}
            </ComponentContainer>
        )
    }
}