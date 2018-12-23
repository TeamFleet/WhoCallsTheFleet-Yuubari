import React from 'react'
import classNames from 'classnames'
import kckit from 'kckit'
import { extend } from 'koot'

import Equipment from '../equipment'
// import InputNumber from '../input-number'
import InputCounter from '@ui/components/input/counter'

const calculateSpeed = kckit.calculate.ship.speed
const maxSlots = 4

@extend({
    styles: require('./styles.less')
})
class CalculatorSpeed extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            [33]: 1, // 改良型艦本式タービン
            [34]: 0, // 強化型艦本式缶
            [87]: 0, // 新型高温高圧缶
            speedId: props.ship.stat.speed,
            speed: props.ship.getSpeed()
        }

        this.slotsCount = props.ship.slot.length
    }

    update(id, count) {
        if (this.state[id] !== count) {
            this.setState((prevState, props) => {
                // const newState = { ...prevState }
                prevState[id] = count
                let {
                    34: count34,
                    87: count87
                } = prevState
                count34 = isNaN(count34) ? 0 : count34
                count87 = isNaN(count87) ? 0 : count87
                const equipments = Array(Math.min(maxSlots, count87)).fill(87)
                    .concat(Array(Math.min(count34, maxSlots - Math.min(maxSlots, count87))).fill(34))
                    .concat(Array(Math.max(maxSlots - count34 - count87, 0)))
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
    componentDidMount(){
        if (__DEV__ && __CLIENT__)
            console.log('thisShip > Speed', {
                speed: this.props.ship.stat.speed,
                rule: this.props.ship.getSpeedRule()
            })
    }

    renderEquipment(id) {
        return (
            <Equipment
                equipment={id}
                className={classNames({
                    'has-note': id === 33
                })}
                componentInput={
                    this.renderInput(id)
                }
            />
        )
    }
    renderInput(id) {
        if (id === 33) {
            return (
                <div className="note">
                    {__("speed_calculator.equipment_33_note_1")}
                    <br />
                    {__("speed_calculator.equipment_33_note_2")}
                </div>
            )
        }
        return (
            <InputCounter
                className="input"

                defaultValue={this.state[id]}
                min={0}
                max={/*this.getSlotsRemain(id)*/this.slotsCount}
                onUpdate={newValue => this.update(id, newValue)}
            />
        )
    }
    render() {
        if(__SERVER__) return <div>{__("no_javascript_warning")}</div>
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
                        {__("speed_calculator.base_speed")}
                        <strong data-speed-id={this.props.ship.stat.speed}>{this.props.ship.getSpeed()}</strong>
                    </div>
                    <div className="result">
                        {__("speed_calculator.result")}
                        <strong data-speed-id={this.state.speedId}>{this.state.speed}</strong>
                    </div>
                </div>
            </div>
        )
    }
}
export default CalculatorSpeed
