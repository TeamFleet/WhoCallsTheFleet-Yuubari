import React from 'react'
import classNames from 'classnames'

import kckit from 'kckit'
const maxShipLv = kckit.vars.maxShipLv

import ComponentContainer from '../commons/component-container.jsx'
import Stat from '../commons/stat.jsx'
import getValue from 'Utils/get-value'
import prefs from 'Logic/preferences'

import translate from 'sp-i18n'

import { ImportStyle } from 'sp-css-import'
import styles from './stats.less'

const stats = [
    'fire',
    'torpedo',
    'aa',
    'asw',
    'hp',
    'armor',
    'evasion',
    'carry',
    'speed',
    'range',
    'los',
    'luck',
    'consum.fuel',
    'consum.ammo'
]

const percentage = (number, max) => (number / max * 100) + '%'

// @connect()
@ImportStyle(styles)
export default class ShipDetailsComponentStats extends React.Component {
    constructor(props) {
        super(props)

        const defaultLv = Math.max(prefs.shipDetailsStatLevel || 99, props.ship._minLv)
        this.state = {
            lv: defaultLv,
            lvInput: defaultLv
        }
    }
    setLv(lv) {
        if (lv != this.state.lv) {
            this.setState({
                lv: lv
            })
            this._input.value = lv
            this.onLevelChange(lv)
        }
    }
    onInputChange(evt) {
        const newLv = Math.min(Math.max(evt.target.value, this.props.ship._minLv), maxShipLv)
        if (newLv != this.state.lv) {
            this.setState({
                lv: newLv
            })
            this.onLevelChange(newLv)
        }
        evt.target.value = evt.target.value
    }
    onInputBlur(evt) {
        if (evt.target.value < this.props.ship._minLv)
            evt.target.value = this.props.ship._minLv
        else if (evt.target.value > maxShipLv)
            evt.target.value = maxShipLv
    }
    onInputKeyDown(evt) {
        switch (evt.nativeEvent.keyCode) {
            case 27: // esc
            case 13: // enter
                evt.target.blur()
        }
    }
    onRangeChange(evt) {
        let newLv = evt.target.value
        if (newLv < this.props.ship._minLv) {
            evt.target.value = this.props.ship._minLv
            newLv = this.props.ship._minLv
        }
        if (newLv != this.state.lv) {
            this.setState({
                lv: newLv
            })
            this.onLevelChange(newLv)
        }
        this._input.value = newLv
    }
    onLevelChange(newLv) {
        prefs.shipDetailsStatLevel = newLv
    }

    renderStat(stat, index) {
        const isConsume = stat.includes('consum.')
        const value = isConsume
            ? 0 - this.props.ship.getAttribute(stat, this.state.lv)
            : getValue(this.props.ship.getAttribute(stat, this.state.lv))
        return (
            <Stat
                type={translate(`stat.${stat}`)}
                key={index}
                className={
                    classNames(["stat", {
                        "is-consume": isConsume,
                        'disabled': value === '-'
                    }])
                }
                stat={stat.replace('consum.', '')}
                max={stat === 'luck' && this.props.ship.stat.luck_max}
            >
                {value}
            </Stat>
        )
    }
    renderTick(level, classNameSuffix) {
        return (
            <span
                className={classNames([
                    'tick',
                    `tick-${classNameSuffix || level}`, {
                        'tick-align-left': level > 70 && level < 99,
                        'tick-highlight': this.state.lv > level
                    }
                ])}
                data-level={level}
                style={{
                    // left: (level / (maxShipLv + 5) * 100) + '%'
                    left: percentage(level + 5, maxShipLv + 10)
                }}
                onClick={() => this.setLv(level)}
            />
        )
    }
    render() {
        return (
            <ComponentContainer className={this.props.className} title={translate("ship_details.stats")}>
                <span className="lv">
                    <input
                        type="number"
                        className="lv-input"
                        defaultValue={this.state.lv}
                        min={this.props.ship._minLv}
                        max={maxShipLv}
                        onChange={this.onInputChange.bind(this)}
                        onBlur={this.onInputBlur.bind(this)}
                        onKeyDown={this.onInputKeyDown.bind(this)}
                        ref={el => this._input = el}
                    />
                    <span className="lv-text">{this.state.lv}</span>
                </span>
                <span className="slider">
                    <input
                        type="range"
                        className="lv-slider"
                        value={this.state.lv}
                        min="1"
                        max={maxShipLv}
                        onChange={this.onRangeChange.bind(this)}
                    />
                    <span className="current" style={{
                        // left: (this.props.ship._minLv / maxShipLv * 100) + '%',
                        // right: ((maxShipLv - this.state.lv) / maxShipLv * 100) + '%'
                        left: percentage(
                            this.props.ship._minLv <= 1 ? 0 : this.props.ship._minLv + 5,
                            maxShipLv + 10
                        ),
                        right: percentage(maxShipLv - this.state.lv + 5, maxShipLv + 10)
                    }} />
                    {this.renderTick(this.props.ship._minLv, 'minlv')}
                    {this.renderTick(99)}
                    {this.renderTick(maxShipLv, 'maxlv')}
                </span>
                <div className="stats">
                    {stats.map(this.renderStat.bind(this))}
                </div>
            </ComponentContainer>
        )
    }
}