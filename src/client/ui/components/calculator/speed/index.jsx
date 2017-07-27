import React from 'react'
// import classNames from 'classnames'

import kckit from 'kckit'
import db from 'Logic/database'

import Link from 'UI/components/link'
import IconEquipment from 'UI/components/icon-equipment'
import InputNumber from '../input-number'

import translate from 'sp-i18n'

import { ImportStyle } from 'sp-css-import'
import styles from './styles.less'

const calculateSpeed = kckit.calculate.ship.speed
const maxSlots = 4

@ImportStyle(styles)
export default class CalculatorSpeed extends React.Component {
    constructor(props) {
        if (__DEV__) console.log('thisShip > Speed', { speed: props.ship.stat.speed, rule: props.ship.getSpeedRule() })
        super(props)

        this.state = {
            [33]: 1, // 改良型艦本式タービン
            [34]: 0, // 強化型艦本式缶
            [87]: 0, // 新型高温高圧缶
            speedId: props.ship.stat.speed,
            speed: props.ship.getSpeed()
        }

        this.slotsCount = props.ship.slot.length
        this.inputs = {}
    }

    update(id, count) {
        if (this.state[id] !== count) {
            this.setState((prevState, props) => {
                // const newState = { ...prevState }
                prevState[id] = count
                const equipments = Array(Math.min(maxSlots, prevState[87])).fill(87)
                    .concat(Array(Math.min(prevState[34], maxSlots - Math.min(maxSlots, prevState[87]))).fill(34))
                    .concat(Array(Math.max(maxSlots - prevState[34] - prevState[87], 0)))
                    .concat(33)
                const result = calculateSpeed(props.ship, equipments)
                if (__DEV__) console.log(equipments, result)
                return {
                    [id]: count,
                    speedId: result,
                    speed: kckit.get.speed(result)
                }
            })
        }
    }

    // getSlotsRemain(curID) {
    //     const countOther = (curID === 34 ? this.state[87] : this.state[34])
    //     return this.slotsCount - countOther + (countOther ? 1 : 0)
    // }

    renderEquipment(id) {
        const equipment = db.equipments[id]
        return (
            <div className="equipment" data-equipment-id={id}>
                <Link className="link" to={`/equipments/${id}`}>
                    <IconEquipment className="icon" icon={equipment._icon} />
                    {equipment._name}
                </Link>
                {this.renderInput(id)}
            </div>
        )
    }
    renderInput(id) {
        if (id === 33) {
            return (
                <div className="note">
                    {translate("speed_calculator.equipment_33_note_1")}
                    <br />
                    {translate("speed_calculator.equipment_33_note_2")}
                </div>
            )
        }
        return (
            <InputNumber
                className="input"

                defaultValue={this.state[id]}
                min={0}
                max={/*this.getSlotsRemain(id)*/this.slotsCount}
                onUpdate={newValue => this.update(id, newValue)}
            />
        )
    }
    render() {
        return (
            <div className={this.props.className}>
                <div className="area-requirement">
                    {this.renderEquipment(33)}
                </div>
                <div className="area-configurable">
                    {this.renderEquipment(34)}
                    {this.renderEquipment(87)}
                </div>
                <div className="area-result">
                    <div className="base">
                        {translate("speed_calculator.base_speed")}
                        <strong data-speed-id={this.props.ship.stat.speed}>{this.props.ship.getSpeed()}</strong>
                    </div>
                    <div className="result">
                        {translate("speed_calculator.result")}
                        <strong data-speed-id={this.state.speedId}>{this.state.speed}</strong>
                    </div>
                </div>
            </div>
        )
    }
}