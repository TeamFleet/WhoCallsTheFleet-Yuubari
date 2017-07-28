import React from 'react'
import classNames from 'classnames'

import kckit from 'kckit'
import db from '@appLogic/database'

import Icon from '@appUI/components/icon'
import Equipment from '../equipment'
import InputNumber from '../input-number'

import translate from 'sp-i18n'

import { ImportStyle } from 'sp-css-import'
import styles from './styles.less'

const equipmentSamples = {
    Sonar: [
        149,
        47
    ],
    DepthCharge: [
        45,
        44
    ]
}

const requiredEquipmentSamples = {
    hasSonar: 'Sonar',
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
    ]
}

@ImportStyle(styles)
export default class CalculatorLevelOASW extends React.Component {
    constructor(props) {
        super(props)

        this.oaswTable = kckit.check.oasw(props.ship.id) || []
        this.canAlways = this.oaswTable === true
        this.canOASW = this.canAlways || (Array.isArray(this.oaswTable) && this.oaswTable.length) ? true : false

        // 确定计算器显示的装备列表
        this.equipmentList = []
        this.isAny = []
        const samples = Object.assign({}, equipmentSamples)
        if (!this.canAlways && this.canOASW) {
            this.oaswTable.forEach(OASW => {
                if (OASW.equipments)
                    for (let req in OASW.equipments) {
                        const value = requiredEquipmentSamples[req]
                        if (typeof value === 'string') {
                            // this.equipmentGroupList.push(equipmentSamples[req])
                            this.equipmentList = this.equipmentList.concat(equipmentSamples[value])
                            delete samples[value]
                        } else if (Array.isArray(value)) {
                            if (value[0] === 'any') {
                                // this.equipmentGroupList.push([value[1]])
                                this.equipmentList.push(value[1])
                                this.isAny.push(value[1])
                            } else {
                                // this.equipmentGroupList.push(value)
                                this.equipmentList = this.equipmentList.concat(value)
                            }
                        } else if (Array.isArray(requiredEquipmentSamples[`${req}${OASW.equipments[req]}`])) {
                            if (requiredEquipmentSamples[`${req}${OASW.equipments[req]}`][0] === 'any') {
                                // this.equipmentGroupList.push([requiredEquipmentSamples[`${req}${OASW.equipments[req]}`][1]])
                                this.equipmentList.push(requiredEquipmentSamples[`${req}${OASW.equipments[req]}`][1])
                                this.isAny.push(requiredEquipmentSamples[`${req}${OASW.equipments[req]}`][1])
                            } else {
                                // this.equipmentGroupList.push(requiredEquipmentSamples[`${req}${OASW.equipments[req]}`])
                                this.equipmentList = this.equipmentList.concat(requiredEquipmentSamples[`${req}${OASW.equipments[req]}`])
                            }
                        }
                    }
            })
        }
        this.isRequired = [...this.equipmentList]
        for (let type in samples) {
            // this.equipmentGroupList.push(samples[type])
            this.equipmentList = this.equipmentList.concat(samples[type])
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
        this.equipmentList = this.equipmentList.filter(equipmentID => {
            const equipment = kckit.get.equipment(equipmentID)
            if (!equipment) return false
            return props.ship.canEquip(equipment.type)
        })

        // 初始 state
        const defaultState = {}
        // this.equipmentGroupList.forEach(group => {
        //     group.forEach(equipmentID => {
        //         defaultState[equipmentID] = 0
        //     })
        // })
        this.equipmentList.forEach(equipmentID => {
            defaultState[equipmentID] = 0
        })

        // if (__DEV__) console.log('thisShip > OASW', this.oaswTable, this.equipmentGroupList)
        if (__DEV__) console.log('thisShip > OASW', this.oaswTable, this.equipmentList, this.isRequired)

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

    renderEquipment(id, key) {
        let displayName
        if (this.isAny.includes(id)) {
            displayName = db.equipmentTypes[kckit.get.equipment(id).type]._name
        }
        return (
            <Equipment
                equipment={id}
                key={key}
                displayName={displayName}
                isNotLink={typeof displayName !== 'undefined'}
                className={classNames({
                    'is-required': !this.state.meetEquipmentsRequirement && this.isRequired.includes(id)
                })}
                componentInput={
                    this.renderInput(id)
                }
            />
        )
    }
    renderInput(id) {
        return (
            <InputNumber
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
                {translate("oasw_calculator.no_result")}
            </strong>
        if (!this.state.result || this.state.result > kckit.vars.maxShipLv)
            return <strong>--</strong>
        return <strong className={classNames({
            'is-below-100': this.state.result < 100,
            'is-atleast-100': this.state.result >= 100
        })}>{this.state.result}</strong>
    }
    render() {
        if (__SERVER__) return <div>{translate("no_javascript_warning")}</div>
        return (
            <div className={classNames([this.props.className, {
                'is-unable': !this.canOASW,
                'is-always': this.canOASW && this.canAlways
            }])}>
                {!this.canOASW && this.props.componentUnable}
                {this.canOASW && this.canAlways && this.props.componentAlways}

                {this.canOASW && !this.canAlways && this.renderEquipmentGroup()}
                {this.canOASW && !this.canAlways && <div className="area-result">
                    {this.state.meetEquipmentsRequirement && translate("oasw_calculator.result")}
                    {this.getResult()}
                </div>}
            </div>
        )
    }
}