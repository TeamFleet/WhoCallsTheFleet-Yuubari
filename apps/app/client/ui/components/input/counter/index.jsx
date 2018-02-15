import React from 'react'
import classNames from 'classnames'

import { ImportStyle } from 'sp-css-import'

const getValue = prop =>
    typeof prop !== 'undefined' && !isNaN(prop)
        ? parseInt(prop)
        : undefined

// @connect()
@ImportStyle(require('./styles.less'))
export default class InputCounter extends React.Component {
    constructor(props) {
        super(props)

        this.min = getValue(props.min)
        this.max = getValue(props.max)

        this.state = {
            value: props.defaultValue || 0
        }
    }
    update(el = this.input) {
        let value = el.value
        if (isNaN(value))
            value = Math.max(0, this.min || 0)
        value = parseInt(value)

        if (typeof this.max !== 'undefined' && value > this.max)
            value = this.max
        if (typeof this.min !== 'undefined' && value < this.min)
            value = this.min

        if (!value) value = 0

        if (value === this.state.value)
            return

        this.setState({
            value
        }, () => {
            this.onUpdate(value)
        })
    }
    onUpdate(newValue) {
        if (isNaN(newValue))
            newValue = Math.max(0, this.min || 0)
        // console.log(newValue)
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
    onInputKeyDown(evt) {
        if (evt.keyCode == 13) {
            this.update(evt.target)
            evt.target.blur()
        }
    }
    onBtnClick(evt, delta) {
        const newValue = parseInt(this.input.value) + delta
        this.input.value = newValue
        this.update()
        evt.target.blur()
    }

    shouldComponentUpdate(newProps) {
        if (newProps.defaultValue !== this.props.defaultValue)
            return false
        return true
    }

    render() {
        const classNamePre = this.props.className.split(' ')[0]
        return (
            <div className={this.props.className}>
                <button
                    type="button"
                    className={classNames([
                        classNamePre + '-btn',
                        classNamePre + '-btn-minus'
                    ])}
                    disabled={typeof this.min !== 'undefined' && this.state.value <= this.min}
                    onClick={evt => this.onBtnClick(evt, -1)}
                >-</button>
                <input
                    className={classNamePre + '-input'}
                    type="number"
                    min={this.min}
                    max={this.max}
                    ref={el => this.input = el}
                    onChange={this.onChange.bind(this)}
                    onBlur={this.onBlur.bind(this)}
                    onKeyDown={this.onInputKeyDown.bind(this)}
                    defaultValue={this.props.defaultValue}
                />
                <button
                    type="button"
                    className={classNames([
                        classNamePre + '-btn',
                        classNamePre + '-btn-plus'
                    ])}
                    disabled={typeof this.max !== 'undefined' && this.state.value >= this.max}
                    onClick={evt => this.onBtnClick(evt, 1)}
                >+</button>
            </div>
        )
    }
}
