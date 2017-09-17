import React from 'react'
import { connect } from 'react-redux'
// import classNames from 'classnames'

import kckit from 'kckit'
const checkShip = kckit.check.ship
const checkAACI = kckit.check.aaci
const checkOASW = kckit.check.oasw
const checkOTS = kckit.check.ots

import db from '@appLogic/database'
import getEquipmentTypesFromCondition from '@appUtils/get-equipment-types-from-condition'

import ComponentContainer from '@appUI/containers/infos-component'
import Bullet from '@appUI/components/bullet'
import IconEquipment from '@appUI/components/icon-equipment'

import translate from 'sp-i18n'

const shipTypeRangeNormal = [
    ['BB', 3],
    ['CV', 1],
    ['CL', 2],
    ['CA', 2]
]

// import { ImportStyle } from 'sp-css-import'
// import styles from './combat-special.less'

@connect(state => ({
    locales_equipment_types: state.locales.equipment_types
}))
// @ImportStyle(styles)
export default class ShipDetailsSpecialCombat extends React.Component {
    renderOASW() {
        const oaswTable = checkOASW(this.props.ship.id) || []
        const canAlways = oaswTable === true
        const canOASW = canAlways || (Array.isArray(oaswTable) && oaswTable.length) ? true : false
        return (
            <Bullet
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
                        const equipments = Object.assign({}, OASW.equipments)
                        for (let condition in equipments) {
                            if (typeof equipments[condition] === 'object' && equipments[condition].hasStat) {
                                let stat = []
                                for (let key in equipments[condition].hasStat) {
                                    stat[0] = key
                                    stat[1] = equipments[condition].hasStat[key]
                                }
                                if (condition.substr(0, 3) === 'has' && this.props.locales_equipment_types[condition.substr(3).toLocaleLowerCase()]) {
                                    equipmentRequired.push([
                                        translate(`equipment_types.${condition.substr(3).toLocaleLowerCase()}`),
                                        stat
                                    ])
                                } else {
                                    equipmentRequired.push([
                                        getEquipmentTypesFromCondition({
                                            [condition]: true
                                        })[0],
                                        stat
                                    ])
                                }
                                delete equipments[condition]
                            }
                        }
                        equipmentRequired = equipmentRequired.concat(getEquipmentTypesFromCondition(equipments))
                        if (OASW.equipments.hasNameOf === '九三一空')
                            equipmentRequired.push('九三一空')
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
                            {equipmentRequired.map((type, indexType) => {
                                if (type === '九三一空')
                                    return (<li key={`${index}-${indexType}`}>
                                        {translate("require.equipment", { type: "" })}
                                        <IconEquipment className="equipment" icon={8}>
                                            九三一空
                                        </IconEquipment>
                                    </li>)
                                else if (Array.isArray(type)) {
                                    console.log(type)
                                    return (<li key={`${index}-${indexType}`}>
                                        {translate("require.equipment", { type: "" })}
                                        {typeof type[0] === 'number' && (
                                            <IconEquipment className="equipment" icon={db.equipmentTypes[type[0]].icon}>
                                                {db.equipmentTypes[type[0]]._name}
                                            </IconEquipment>
                                        )}
                                        {typeof type[0] === 'string' && type[0]}
                                        {' (' + translate("require.has_stat", {
                                            stat: translate(`stat.${type[1][0]}`),
                                            value: type[1][1]
                                        }) + ')'}
                                    </li>)
                                }
                                else
                                    return (<li key={`${index}-${indexType}`}>
                                        {translate("require.equipment_type", { type: "" })}
                                        <IconEquipment className="equipment" icon={db.equipmentTypes[type].icon}>
                                            {db.equipmentTypes[type]._name}
                                        </IconEquipment>
                                    </li>)
                            })}
                            {OASW.minLv && <li>{translate("require.min_possible_level", {
                                level: OASW.minLv || this.props.ship._minLv
                            })}</li>}
                        </ul>
                    )
                })}
            </Bullet>
        )
    }
    renderOTS() {
        const otsTable = checkOTS(this.props.ship.id) || []
        const canAlways = otsTable === true
        const canOTS = canAlways || (Array.isArray(otsTable) && otsTable.length) ? true : false
        return (
            <Bullet
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
            </Bullet>
        )
    }
    renderRangeDifferent() {
        const pair = shipTypeRangeNormal.filter(arr => (
            this.props.ship.isType(arr[0]) && this.props.ship.stat.range != arr[1]
        ))
        if (Array.isArray(pair) && pair.length)
            return (
                <Bullet
                    title={translate("ship_details.range_different_title", { range: this.props.ship._range })}
                    level={this.props.ship.stat.range > pair[0][1] ? 2 : 1}
                >
                    {translate("ship_details.range_different_note", {
                        range: kckit.get.range(pair[0][1]),
                        type: db.shipTypes[this.props.ship.type_display]._name
                    })}
                </Bullet>
            )
        return null
    }
    renderNightAirAssault() {
        const {
            count_as_night_operation_aviation_personnel,
            participate_night_battle_when_equip_swordfish
        } = this.props.ship.getCapability()

        if (count_as_night_operation_aviation_personnel) {
            const equipment = db.equipments[258] // 夜間作戦航空要員
            return (
                <Bullet
                    title={translate("combat_phases.night_air_assault")}
                    level={2}
                >
                    {translate('require.equipment_no_need', { type: "" })}
                    <IconEquipment className="equipment" icon={equipment._icon}>
                        {equipment._name}
                    </IconEquipment>
                </Bullet>
            )
        }

        if (this.props.ship.stat.fire || this.props.ship.stat.torpedo) {
            return (
                <Bullet
                    title={translate("combat_phases.night")}
                    level={1}
                >
                    {translate('ship_details.carrier_default_night_battle')}
                </Bullet>
            )
        }

        if (participate_night_battle_when_equip_swordfish) {
            const equipment = db.equipments[242] // Swordfish
            return (
                <Bullet
                    title={translate("combat_phases.night")}
                    level={1}
                >
                    {translate('ship_details.carrier_swordfish_night_battle')}
                    <br />
                    {translate('require.equipment', { type: "" })}
                    <IconEquipment className="equipment" icon={equipment._icon}>
                        {translate("equipment_series", {
                            equipment: equipment._name
                        })}
                    </IconEquipment>
                </Bullet>
            )
        }

        return null
    }
    render() {
        const {
            ship,
            className
        } = this.props

        const isBattleship = ship.isType('battleship')
        const isCarrier = ship.isType('carrier')

        const statASW99 = ship.getAttribute('asw', 99)
        const statTorpedo99 = ship.getAttribute('torpedo', 99)

        const aaciTypes = checkAACI(ship.id)

        const canJetAssault = checkShip(ship, {
            isID: [
                461, // 翔鶴・改二
                466, // 翔鶴・改二甲
                462, // 瑞鶴・改二
                467, // 瑞鶴・改二甲
            ]
        })
        const canAACI = (Array.isArray(aaciTypes) && aaciTypes.length) ? true : false

        return (
            <ComponentContainer className={className} title={translate("ship_details.combat_special")}>
                {isCarrier && <Bullet
                    title={translate("combat_phases.jet")}
                    level={canJetAssault ? 1 : 0}
                >
                    {canJetAssault && translate("require.equipment_type", {
                        type: translate("equipment_types.jet")
                    })}
                </Bullet>}

                <Bullet
                    title={translate("aaci.title")}
                    level={canAACI ? 1 : 0}
                >
                    {canAACI && translate("ship_details.see_below_for_required_equipment_types")}
                </Bullet>

                {this.renderRangeDifferent()}

                {statASW99 !== false && statASW99 !== undefined && this.renderOASW()}
                {statASW99 === undefined && <Bullet
                    title={translate("combat_phases.oasw")}
                    level={-1}
                />}

                {statTorpedo99 !== false && this.renderOTS()}

                {isBattleship && statTorpedo99 !== false && <Bullet
                    title={translate("combat_phases.torpedo")}
                    level={2}
                />}

                {ship.type === 30 && <Bullet
                    title={translate("ship_details.light_attack_carrier_asw_title")}
                    level={2}
                >
                    {translate("ship_details.light_attack_carrier_asw_note")}
                </Bullet>}

                {isCarrier && this.renderNightAirAssault()}
                {!isCarrier && (ship.stat.fire + ship.stat.torpedo <= 0) && (
                    <Bullet
                        title={translate("combat_phases.night")}
                        level={0}
                    />
                )}
            </ComponentContainer>
        )
    }
}