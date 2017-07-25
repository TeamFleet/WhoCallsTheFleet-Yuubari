import React from 'react'
import classNames from 'classnames'

import kckit from 'kckit'
import db from 'Logic/database'

import Link from 'UI/components/link'
import IconEquipment from 'UI/components/icon-equipment'

import translate from 'sp-i18n'

import { ImportStyle } from 'sp-css-import'
import styles from './styles.less'

const calculateSpeed = kckit.calculate.speed
const maxSlotCount = 4

@ImportStyle(styles)
export default class CalculatorSpeed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            [33]: 1, // 改良型艦本式タービン
            [34]: 0, // 強化型艦本式缶
            [87]: 0, // 新型高温高圧缶
            speed: props.ship.getSpeed()
        }
    }

    update(id, count) {
        if (this.state[id] !== count) {
            this.setState({
                [id]: count
            })
            calculateSpeed(
                this.props.ship,
                Array(Math.min(maxSlotCount, this.state[87])).fill(87)
                    .concat(Array(Math.min(this.state[34], maxSlotCount - Math.min(maxSlotCount, this.state[87]))).fill(34))
                    .concat(Array(Math.max(maxSlotCount - this.state[34] - this.state[87], 0)))
                    .concat(33)
            )
        }
    }

    renderEquipment(id) {
        const equipment = db.equipments[id]
        return (
            <div className="equipment">
                <Link className="link" to={`/equipments/${id}`}>
                    <IconEquipment className="icon" icon={equipment._icon} />
                    {equipment._name}
                </Link>
                {this.renderInput(id)}
            </div>
        )
    }
    renderInput(id) {
        return (
            <label className={classNames(['input', {
                'disabled': id === 33
            }])}>
                <input type="number" onChange={evt => this.update(id, evt.target.value)} defaultValue={this.state[id]} />
            </label>
        )
    }
    render() {
        if (__DEV__) console.log('thisShip > Speed', { speed: this.props.ship.stat.speed, rule: this.props.ship.getSpeedRule() })
        return (
            <div className={this.props.className} title={translate("ship_details.speedup_calculator")}>
                {this.renderEquipment(33)}
                {this.renderEquipment(34)}
                {this.renderEquipment(87)}
                {this.state.speed}
            </div>
        )
    }
}