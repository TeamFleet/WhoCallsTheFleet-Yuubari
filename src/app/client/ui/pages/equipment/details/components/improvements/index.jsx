import React from 'react'

import ComponentContainer from '@appUI/containers/infos-component'
import { DayAndShip, Resources } from '@appUI/components/improvement'
import Bullet from '@appUI/components/bullet'
import LinkEquipment from '@appUI/components/link/equipment'

import translate from 'sp-i18n'

import { ImportStyle } from 'sp-css-import'

// @connect()
@ImportStyle(require('./styles.less'))
export default class EquipmentDetailsComponentImprovements extends React.Component {
    render() {
        const list = this.props.equipment.improvement || []
        const hasItem = !!(list.length)
        const upgradable = (Array.isArray(this.props.equipment.upgrade_to) && this.props.equipment.upgrade_to.length)
        return (
            <ComponentContainer className={this.props.className} title={translate("equipment_details.improvements")}>
                {hasItem && list.map((data, index) => (
                    <EquipmentDetailsComponentImprovementsImprovement data={data} key={index} upgradable={upgradable} />
                ))}
                {!hasItem && <span className="disabled">{translate("none")}</span>}
            </ComponentContainer>
        )
    }
}

@ImportStyle(require('./styles-improvement.less'))
class EquipmentDetailsComponentImprovementsImprovement extends React.Component {
    render() {
        const { className, data, upgradable } = this.props
        const { upgrade, req, resource } = data
        return (
            <div className={className}>
                <Bullet
                    className="upgradability"
                    title={upgrade ? translate(`equipment_details.upgrade_to`) : translate(`equipment_details.facts_unupgradable`)}
                    level={upgrade ? 2 : 0}
                >
                    {upgrade && <LinkEquipment
                        equipment={upgrade[0]}
                        className="equipment color-alt"
                    />}
                    {upgrade && !!(upgrade[1]) && <span className="default-star">
                        +{upgrade[1]}
                    </span>}
                </Bullet>
                <DayAndShip className="dayships" data={req} />
                <Resources className="resources" data={resource} upgradable={upgradable} />
            </div>
        )
    }
}