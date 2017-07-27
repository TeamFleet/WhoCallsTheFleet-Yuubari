import React from 'react'

import { ImportStyle } from 'sp-css-import'
import styles from './input-number.less'

const getValue = prop => typeof prop !== 'undefined' && !isNaN(prop) ? parseInt(prop) : undefined

@ImportStyle(styles)
export default class CalculatorSpeed extends React.Component {
    constructor(props) {
        super(props)

        this.min = getValue(props.min)
        this.max = getValue(props.max)

        this.state = {
            value: props.defaultValue
        }
    }
    update(el = this.input) {
        this.setState({
            value: el.value
        }, () => {
            this.onUpdate(el.value)
        })
    }
    onUpdate(newValue) {
        if (typeof this.props.onUpdate === 'function')
            return this.props.onUpdate(newValue)
    }
    onChange(evt) {
        if (typeof this.max !== 'undefined' && evt.target.value > this.max)
            return
        if (typeof this.min !== 'undefined' && evt.target.value < this.min)
            return
        this.update(evt.target)
    }
    onBlur(evt) {
        if (typeof this.max !== 'undefined' && evt.target.value > this.max)
            evt.target.value = this.max
        if (typeof this.min !== 'undefined' && evt.target.value < this.min)
            evt.target.value = this.min
        this.update(evt.target)
    }
    onBtnClick(evt, delta) {
        const newValue = parseInt(this.input.value) + delta
        this.input.value = newValue
        this.update()
        evt.target.blur()
    }
    render() {
        return (
            <div className={this.props.className}>
                <button
                    type="button"
                    className="btn btn-minus"
                    disabled={typeof this.min !== 'undefined' && this.state.value <= this.min}
                    onClick={evt => this.onBtnClick(evt, -1)}
                >-</button>
                <input
                    type="number"
                    min={this.min}
                    max={this.max}
                    ref={el => this.input = el}
                    onChange={this.onChange.bind(this)}
                    onBlur={this.onBlur.bind(this)}
                    defaultValue={this.props.defaultValue}
                />
                <button
                    type="button"
                    className="btn btn-plus"
                    disabled={typeof this.max !== 'undefined' && this.state.value >= this.max}
                    onClick={evt => this.onBtnClick(evt, 1)}
                >+</button>
            </div>
        )
    }
}