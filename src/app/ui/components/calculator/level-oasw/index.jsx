import React from 'react'
import classNames from 'classnames'

import kckit from 'kckit'
import db from '@api/database'
import { ImportStyle } from 'sp-css-import'

import Icon from '@ui/components/icon'
import Equipment from '../equipment'
// import InputNumber from '../input-number'
import InputCounter from '@ui/components/input/counter'

const equipmentSamples = {
    Sonar: [
        149,
        47
    ],
    DepthCharge: [
        45,
        44
    ],
    LargeSonar: [
        132
    ]
}

const requiredEquipmentSamples = {
    hasSonar: 'Sonar',
    hasLargeSonar: 'LargeSonar',
    hasDiveBomber: [
        'any',
        233
    ],
    hasTorpedoBomber: [
        'any',
        17
    ],
    hasNameOf九三一空: [
        82,
        83
    ],
    hasAircraftHasStat_asw_1: [
        'aircraft',
        70
    ],
    hasAircraftHasStat_asw_7: [
        82,
        83,
        69,
        244
    ],
    hasTorpedoBomberHasStat_asw_7: [
        82,
        83,
        244
    ],
}

@ImportStyle(require('./styles.less'))
export default class CalculatorLevelOASW extends React.Component {
    constructor(props) {
        super(props)

        this.oaswTable = kckit.check.oasw(props.ship.id) || []
        this.canAlways = this.oaswTable === true
        this.canOASW = this.canAlways || (Array.isArray(this.oaswTable) && this.oaswTable.length) ? true : false
        this.statUnknown = props.ship.getAttribute('asw', 99) === undefined

        // 确定计算器显示的装备列表
        let equipmentList = []
        this.equipmentList = []

        this.isAny = []
        const samples = Object.assign({}, equipmentSamples)
        if (!this.canAlways && this.canOASW) {
            this.oaswTable.forEach(OASW => {
                if (OASW.equipments)
                    for (let req in OASW.equipments) {
                        let hasStat
                        if (typeof OASW.equipments[req] === 'object' && OASW.equipments[req].hasStat) {
                            const obj = OASW.equipments[req].hasStat
                            req += 'HasStat'
                            for (let stat in obj) {
                                req += `_${stat}_${obj[stat]}`
                                hasStat = [stat, obj[stat]]
                            }
                        }
                        const value = requiredEquipmentSamples[req]
                        if (typeof value === 'string') {
                            // this.equipmentGroupList.push(equipmentSamples[req])
                            equipmentList = equipmentList.concat(equipmentSamples[value])
                            delete samples[value]
                        } else if (Array.isArray(value)) {
                            if (value[0] === 'any') {
                                // this.equipmentGroupList.push([value[1]])
                                equipmentList.push(value[1])
                                this.isAny.push(value[1])
                            } else if (typeof value[0] === 'string') {
                                equipmentList.push([value[0], value[1], hasStat])
                                this.isAny.push(value[1])
                            } else {
                                // this.equipmentGroupList.push(value)
                                equipmentList = equipmentList.concat(value)
                            }
                        } else if (Array.isArray(requiredEquipmentSamples[`${req}${OASW.equipments[req]}`])) {
                            if (requiredEquipmentSamples[`${req}${OASW.equipments[req]}`][0] === 'any') {
                                // this.equipmentGroupList.push([requiredEquipmentSamples[`${req}${OASW.equipments[req]}`][1]])
                                equipmentList.push(requiredEquipmentSamples[`${req}${OASW.equipments[req]}`][1])
                                this.isAny.push(requiredEquipmentSamples[`${req}${OASW.equipments[req]}`][1])
                            } else {
                                // this.equipmentGroupList.push(requiredEquipmentSamples[`${req}${OASW.equipments[req]}`])
                                equipmentList = equipmentList.concat(requiredEquipmentSamples[`${req}${OASW.equipments[req]}`])
                            }
                        }
                    }
            })
        }
        this.isRequired = equipmentList.map(equipmentID => {
            if (Array.isArray(equipmentID))
                return equipmentID[1]
            return equipmentID
        })
        for (let type in samples) {
            // this.equipmentGroupList.push(samples[type])
            equipmentList = equipmentList.concat(samples[type])
        }
        // 检查舰娘是否可装备
        // this.equipmentGroupList = this.equipmentGroupList.filter(group => {
        //     if (!Array.isArray(group))
        //         return false
        //     group = group.filter(equipmentID => {
        //         const equipment = kckit.get.equipment(equipmentID)
        //         if (!equipment) return false
        //         return props.ship.canEquip(equipment.type)
        //     })
        //     return (Array.isArray(group) && group.length)
        // })
        equipmentList
            .filter(equipmentID => {
                if (Array.isArray(equipmentID)) return true
                const equipment = kckit.get.equipment(equipmentID)
                if (!equipment) return false
                return props.ship.canEquip(equipment.type)
            })
            .forEach(equipmentId => {
                if (this.equipmentList.includes(equipmentId))
                    return false
                this.equipmentList.push(equipmentId)
            })

        // 初始 state
        const defaultState = {}
        // this.equipmentGroupList.forEach(group => {
        //     group.forEach(equipmentID => {
        //         defaultState[equipmentID] = 0
        //     })
        // })
        this.equipmentList.forEach(equipmentID => {
            if (Array.isArray(equipmentID)) {
                defaultState[equipmentID[1]] = 0
                return
            }
            defaultState[equipmentID] = 0
        })

        // if (__DEV__ && __CLIENT__) console.log('thisShip > OASW', this.oaswTable, this.equipmentGroupList)
        if (__DEV__ && __CLIENT__) console.log('thisShip > OASW', this.oaswTable, this.equipmentList, this.isRequired)

        this.slotsCount = props.ship.slot.length

        this.state = Object.assign(defaultState, {
            result: kckit.calculate.ship.levelOASW(props.ship, []),
            meetEquipmentsRequirement: kckit.check.oasw(props.ship, [])
        })
    }

    update(id, count) {
        if (this.state[id] !== count) {
            this.setState((prevState, props) => {
                // const newState = { ...prevState }
                prevState[id] = count
                const equipments = []
                for (let equipmentID in prevState) {
                    if (!isNaN(equipmentID)) {
                        const thisCount = prevState[equipmentID]
                        for (let i = 0; i < thisCount; i++) {
                            equipments.push(equipmentID)
                        }
                    }
                }
                const result = kckit.calculate.ship.levelOASW(props.ship, equipments)
                const meetEquipmentsRequirement = kckit.check.oasw(props.ship, equipments)
                if (__DEV__) console.log(equipments, result, meetEquipmentsRequirement)
                return {
                    [id]: count,
                    result,
                    meetEquipmentsRequirement
                }
            })
        }
    }

    renderEquipment(id, index, arr) {
        let displayName
        if (Array.isArray(id)) {
            if (Array.isArray(id[2]))
                displayName = __(`equipment_types`, id[0])
                    + ' ('
                    + __('require.has_stat', {
                        stat: __(`stat`, id[2][0]),
                        value: id[2][1]
                    })
                    + ')'
            else
                displayName = __(`equipment_types`, id[0])
            id = id[1]
        } else if (this.isAny.includes(id)) {
            displayName = db.equipmentTypes[kckit.get.equipment(id).type]._name
        }
        return (
            <Equipment
                equipment={id}
                key={index}
                displayName={displayName}
                isNotLink={typeof displayName !== 'undefined'}
                className={classNames({
                    'is-required': !this.state.meetEquipmentsRequirement && this.isRequired.includes(id),
                    'is-expand': (!index && arr.length % 2)
                })}
                componentInput={
                    this.renderInput(id)
                }
            />
        )
    }
    renderInput(id) {
        return (
            <InputCounter
                className="input"

                defaultValue={this.state[id]}
                min={0}
                max={this.slotsCount}
                onUpdate={newValue => this.update(id, newValue)}
            />
        )
    }
    renderEquipmentGroup() {
        // return this.equipmentGroupList.map((group, indexGroup) => (
        //     <div className="area-equipment-group" key={indexGroup}>
        //         {group.map(this.renderEquipment.bind(this))}
        //     </div>
        // ))
        return <div className={classNames(["area-equipment-group", {
            'is-half': this.equipmentList.length > 4
        }])}>
            {this.equipmentList.map(this.renderEquipment.bind(this))}
        </div>
    }
    getResult() {
        if (!this.state.meetEquipmentsRequirement)
            return <strong className="is-missing">
                <Icon className="icon-missing" icon="warning2" />
                {__("oasw_calculator.no_result")}
            </strong>
        if (!this.state.result || this.state.result > kckit.maxShipLv)
            return <strong>--</strong>
        return <strong className={classNames({
            'is-below-100': this.state.result < 100,
            'is-atleast-100': this.state.result >= 100
        })}>{this.state.result}</strong>
    }
    render() {
        if (__SERVER__) return <div>{__("no_javascript_warning")}</div>
        return (
            <div className={classNames([this.props.className, {
                'is-unable': !this.canOASW,
                'is-always': this.canOASW && this.canAlways
            }])}>
                {this.statUnknown && this.props.componentUnknown}
                {!this.statUnknown && !this.canOASW && this.props.componentUnable}
                {!this.statUnknown && this.canOASW && this.canAlways && this.props.componentAlways}

                {this.canOASW && !this.canAlways && this.renderEquipmentGroup()}
                {this.canOASW && !this.canAlways && <div className="area-result">
                    {this.state.meetEquipmentsRequirement && __("oasw_calculator.result")}
                    {this.getResult()}
                </div>}
            </div>
        )
    }
}
