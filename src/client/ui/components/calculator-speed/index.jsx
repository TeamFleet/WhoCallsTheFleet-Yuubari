import React from 'react'
// import classNames from 'classnames'

import kckit from 'kckit'
import db from 'Logic/database'

import Link from 'UI/components/link'
import IconEquipment from 'UI/components/icon-equipment'

import translate from 'sp-i18n'

import { ImportStyle } from 'sp-css-import'
import styles from './styles.less'

const calculateSpeed = kckit.calculate.ship.speed
const maxSlotCount = 4

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
        this.inputs = {}
    }

    update(id, count, el) {
        if (el) {
            const max = el.getAttribute('max')
            const min = el.getAttribute('min')
            if (typeof max !== 'undefined' && count > parseInt(max))
                return
            if (typeof min !== 'undefined' && count < parseInt(min))
                return
        }
        if (this.state[id] !== count) {
            // this.setState({
            //     [id]: count,
            //     speed: kckit.get.speed(result)
            // })
            this.setState((prevState, props) => {
                // const newState = { ...prevState }
                prevState[id] = count
                const equipments = Array(Math.min(maxSlotCount, prevState[87])).fill(87)
                    .concat(Array(Math.min(prevState[34], maxSlotCount - Math.min(maxSlotCount, prevState[87]))).fill(34))
                    .concat(Array(Math.max(maxSlotCount - prevState[34] - prevState[87], 0)))
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

    onInputBlur(evt, id) {
        const el = evt.target
        const max = el.getAttribute('max')
        const min = el.getAttribute('min')
        if (typeof max !== 'undefined' && el.value > parseInt(max)) {
            el.value = max
            this.update(id, max)
        }
        if (typeof min !== 'undefined' && el.value < parseInt(min)) {
            el.value = min
            this.update(id, min)
        }
    }

    onBtnClick(evt, id, delta) {
        const newValue = parseInt(this.inputs[id].value) + delta
        this.inputs[id].value = newValue
        this.update(id, newValue)
        evt.target.blur()
    }

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
            <div className="input">
                <button
                    type="button"
                    className="btn btn-minus"
                    disabled={this.state[id] <= 0}
                    onClick={evt => this.onBtnClick(evt, id, -1)}
                >-</button>
                <input
                    type="number"
                    min="0"
                    max="4"
                    ref={el => this.inputs[id] = el}
                    onChange={evt => this.update(id, evt.target.value, evt.target)}
                    onBlur={evt => this.onInputBlur(evt, id)}
                    defaultValue={this.state[id]}
                />
                <button
                    type="button"
                    className="btn btn-plus"
                    disabled={this.state[id] >= 4}
                    onClick={evt => this.onBtnClick(evt, id, 1)}
                >+</button>
            </div>
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