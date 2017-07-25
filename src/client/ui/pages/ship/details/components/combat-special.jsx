import React from 'react'
// import classNames from 'classnames'

import checkShip from 'kckit/src/check/ship'
import checkAACI from 'kckit/src/check/aaci'
import checkOASW from 'kckit/src/check/oasw'
import checkOTS from 'kckit/src/check/ots'

import db from 'Logic/database'
import getEquipmentTypesFromCondition from 'Utils/get-equipment-types-from-condition'

import ComponentContainer from '../commons/component-container.jsx'
import Special from '../commons/special.jsx'
import IconEquipment from 'UI/components/icon-equipment'

import translate from 'sp-i18n'

// import { ImportStyle } from 'sp-css-import'
// import styles from './combat-special.less'

// @connect()
// @ImportStyle(styles)
export default class ShipDetailsSpecialCombat extends React.Component {
    renderOASW() {
        const oaswTable = checkOASW(this.props.ship.id) || []
        const canAlways = oaswTable === true
        const canOASW = canAlways || (Array.isArray(oaswTable) && oaswTable.length) ? true : false
        return (
            <Special
                title={translate("combat_phases.oasw")}
                level={canOASW ? (canAlways ? 2 : 1) : 0}
            >
                {canOASW && canAlways && translate("ship_details.can_always_perform")}
                {canOASW && !canAlways && oaswTable.length > 1 && translate("ship_details.meet_one_requirements_below")}
                {canOASW && !canAlways && oaswTable.map((OASW, index) => {
                    const statsWithEquipments = []
                    let equipmentRequired = []
                    if (OASW.shipWithEquipments && OASW.shipWithEquipments.hasStat) {
                        for (let stat in OASW.shipWithEquipments.hasStat) {
                            if (this.props.ship.getAttribute(stat, this.props.ship_minLv) < OASW.shipWithEquipments.hasStat[stat])
                                statsWithEquipments.push([stat, OASW.shipWithEquipments.hasStat[stat]])
                        }
                    }
                    if (OASW.equipments) {
                        equipmentRequired = getEquipmentTypesFromCondition(OASW.equipments)
                    }
                    return (
                        <ul key={index} className="requirement">
                            {oaswTable.length > 1 && (`#${index + 1}`)}
                            {statsWithEquipments.map((stat, indexStat) => <li key={`${index}-${indexStat}`}>
                                {translate("require.ship_stat_with_equipments", {
                                    stat: translate(`stat.${stat[0]}`),
                                    value: stat[1]
                                })}
                            </li>)}
                            {equipmentRequired.map((type, indexType) => <li key={`${index}-${indexType}`} data-type={type}>
                                {translate("require.equipment_type", { type: "" })}
                                <IconEquipment className="equipment" icon={db.equipmentTypes[type].icon}>
                                    {db.equipmentTypes[type]._name}
                                </IconEquipment>
                            </li>)}
                            {OASW.minLv && <li>{translate("require.min_possible_level", {
                                level: OASW.minLv || this.props.ship._minLv
                            })}</li>}
                        </ul>
                    )
                })}
            </Special>
        )
    }
    renderOTS() {
        const otsTable = checkOTS(this.props.ship.id) || []
        const canAlways = otsTable === true
        const canOTS = canAlways || (Array.isArray(otsTable) && otsTable.length) ? true : false
        return (
            <Special
                title={translate("combat_phases.ots")}
                level={canOTS ? (canAlways ? 2 : 1) : 0}
            >
                {canOTS && canAlways && translate("ship_details.can_always_perform")}
                {canOTS && !canAlways && otsTable.length > 1 && translate("ship_details.meet_one_requirements_below")}
                {canOTS && !canAlways && otsTable.map((OTS, index) => {
                    let equipmentRequired = []
                    if (OTS.equipments) {
                        equipmentRequired = getEquipmentTypesFromCondition(OTS.equipments)
                    }
                    return (
                        <ul key={index} className="requirement">
                            {otsTable.length > 1 && (`#${index + 1}`)}
                            {equipmentRequired.map((type, indexType) => <li key={`${index}-${indexType}`} data-type={type}>
                                {translate("require.equipment_type", { type: "" })}
                                <IconEquipment className="equipment" icon={db.equipmentTypes[type].icon}>
                                    {db.equipmentTypes[type]._name}
                                </IconEquipment>
                            </li>)}
                            {OTS.ship && OTS.ship.minLevel && <li>{translate("require.level", {
                                level: OTS.ship.minLevel
                            })}</li>}
                        </ul>
                    )
                })}
            </Special>
        )
    }
    render() {
        const isBattleship = this.props.ship.isType('battleship')
        const isCarrier = this.props.ship.isType('carrier')

        const statTorpedo99 = this.props.ship.getAttribute('torpedo', 99)

        const aaciTypes = checkAACI(this.props.ship.id)

        const canJetAssault = checkShip(this.props.ship, {
            isID: [
                461, // 翔鶴・改二
                466, // 翔鶴・改二甲
                462, // 瑞鶴・改二
                467, // 瑞鶴・改二甲
            ]
        })
        const canAACI = (Array.isArray(aaciTypes) && aaciTypes.length) ? true : false

        return (
            <ComponentContainer className={this.props.className} title={translate("ship_details.combat_special")}>
                {isCarrier && <Special
                    title={translate("combat_phases.jet")}
                    level={canJetAssault ? 1 : 0}
                >
                    {canJetAssault && translate("require.equipment_type", {
                        type: translate("equipment_types.jet")
                    })}
                </Special>}
                <Special
                    title={translate("aaci.title")}
                    level={canAACI ? 1 : 0}
                >
                    {canAACI && translate("ship_details.see_below_for_required_equipment_types")}
                </Special>
                {this.props.ship.getAttribute('asw', 99) !== false && this.renderOASW()}
                {statTorpedo99 !== false && this.renderOTS()}
                {isBattleship && statTorpedo99 !== false && <Special
                    title={translate("combat_phases.torpedo")}
                    level={2}
                />}
                {isCarrier && <Special
                    title={translate("combat_phases.night")}
                    level={this.props.ship.additional_night_shelling ? 2 : 0}
                />}
            </ComponentContainer>
        )
    }
}