import React from 'react'
import classNames from 'classnames'

import { ImportStyle } from 'sp-css-import'

import Button from '@ui/components/button'

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
            value: props.defaultValue || 0,
            isFocus: false,
        }
    }
    getValue(value) {
        if (typeof this.max === 'number' && value > this.max)
            return this.max
        if (typeof this.min === 'number' && value < this.min)
            return this.min
        return value
    }
    update(el = this.input, value) {
        if (typeof value === 'undefined')
            value = el.value
        if (isNaN(value))
            value = Math.max(0, this.min || 0)
        value = this.getValue(parseInt(value))

        if (!value) value = 0

        if (value === this.state.value)
            return

        el.value = value
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
    onFocus(/*evt*/) {
        this.setState({
            isFocus: true
        })
    }
    onBlur(evt) {
        // if (typeof this.max !== 'undefined' && evt.target.value > this.max)
        //     evt.target.value = this.max
        // if (typeof this.min !== 'undefined' && evt.target.value < this.min)
        //     evt.target.value = this.min
        this.update(evt.target)
        this.setState({
            isFocus: false
        })
        if (typeof this.props.onBlur === 'function')
            return this.props.onBlur(evt)
    }
    onInputKeyDown(evt) {
        if (evt.keyCode == 13) {
            this.update(evt.target)
            evt.target.blur()
        }
    }
    onBtnClick(evt, delta) {
        const newValue = this.getValue(parseInt(this.input.value || 0) + delta)
        this.input.value = newValue
        this.update()
        if (evt) evt.target.blur()
    }
    onWheel(evt) {
        if (this.state.isFocus) {
            const e = evt.nativeEvent

            if (
                (typeof e.wheelDelta === 'number' && e.wheelDelta > 0) ||
                (typeof e.wheelDeltaY === 'number' && e.wheelDeltaY > 0) ||
                (typeof e.deltaY === 'number' && e.deltaY < 0)
            )
                this.onBtnClick(undefined, 1)
            else if (
                (typeof e.wheelDelta === 'number' && e.wheelDelta < 0) ||
                (typeof e.wheelDeltaY === 'number' && e.wheelDeltaY < 0) ||
                (typeof e.deltaY === 'number' && e.deltaY > 0)
            )
                this.onBtnClick(undefined, -1)

            evt.stopPropagation()
            evt.preventDefault()
        }
    }

    shouldComponentUpdate(newProps) {
        if (newProps.currentValue !== this.props.currentValue) {
            this.update(undefined, newProps.currentValue)
            return false
        }
        if (newProps.defaultValue !== this.props.defaultValue)
            return false
        return true
    }

    render() {
        const classNamePre = this.props.className.split(' ')[0]
        const {
            showButtons = true
        } = this.props
        return (
            <span
                className={classNames({
                    [this.props.className]: true,
                    'is-focus': this.state.isFocus,
                    'mod-hide-buttons': !showButtons,
                })}
            >
                <input
                    className={classNamePre + '-input'}
                    type="number"
                    min={this.min}
                    max={this.max}
                    ref={el => this.input = el}
                    defaultValue={this.props.defaultValue}
                    onChange={this.onChange.bind(this)}
                    onFocus={this.onFocus.bind(this)}
                    onBlur={this.onBlur.bind(this)}
                    onKeyDown={this.onInputKeyDown.bind(this)}
                    onWheel={this.onWheel.bind(this)}
                />
                {showButtons &&
                    <Button
                        component="button"
                        type="button"
                        className={classNames([
                            classNamePre + '-btn',
                            classNamePre + '-btn-minus'
                        ])}
                        disabled={typeof this.min !== 'undefined' && this.state.value <= this.min}
                        onClick={evt => this.onBtnClick(evt, -1)}
                        children="-"
                    />
                }
                {showButtons &&
                    <Button
                        component="button"
                        type="button"
                        className={classNames([
                            classNamePre + '-btn',
                            classNamePre + '-btn-plus'
                        ])}
                        disabled={typeof this.max !== 'undefined' && this.state.value >= this.max}
                        onClick={evt => this.onBtnClick(evt, 1)}
                        children="+"
                    />
                }
            </span>
        )
    }
}
