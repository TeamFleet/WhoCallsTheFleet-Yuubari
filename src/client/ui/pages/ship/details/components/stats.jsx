import React from 'react'

import ComponentContainer from '../commons/component-container.jsx'
import Stat from '../commons/stat.jsx'
import { maxShipLv } from 'kckit/src/variables'

import translate from 'sp-i18n'

import { ImportStyle } from 'sp-css-import'
import styles from './stats.less'

const stats = [
    'hp',
    'armor',
    'evasion',
    'carry',
    'fire',
    'torpedo',
    'aa',
    'asw',
    'speed',
    'range',
    'los',
    'luck',
    'consum.fuel',
    'consum.ammo'
]

const getValue = (value) => {
    if (value === false) return '-'
    if (value === undefined) return '?'
    return value
}

// @connect()
@ImportStyle(styles)
export default class ShipDetailsComponentSlotEquipments extends React.Component {
    constructor() {
        super()
        this.state = {
            lv: 99,
            lvInput: 99
        }
    }
    setLv(lv) {
        if (lv != this.state.lv){
            this.setState({
                lv: lv
            })
            this._input.value = lv
        }
    }
    onInputChange(evt) {
        const newLv = Math.min(Math.max(evt.target.value, this.props.ship._minLv), maxShipLv)
        if (newLv != this.state.lv)
            this.setState({
                lv: newLv
            })
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
        if (newLv != this.state.lv)
            this.setState({
                lv: newLv
            })
        this._input.value = newLv
    }
    renderStat(stat, index) {
        return (
            <Stat type={translate(`stat.${stat}`)} key={index} className="stat" stat={stat}>
                {/^consum\./.test(stat)
                    ? 0 - this.props.ship.getAttribute(stat, this.state.lv)
                    : getValue(this.props.ship.getAttribute(stat, this.state.lv))
                }
            </Stat>
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
                        left: (this.props.ship._minLv / maxShipLv * 100) + '%',
                        right: ((maxShipLv - this.state.lv) / maxShipLv * 100) + '%'
                    }} />
                    <span className="tick tick-minlv" style={{
                        left: (this.props.ship._minLv / maxShipLv * 100) + '%'
                    }} onClick={() => this.setLv(this.props.ship._minLv)} />
                    <span className="tick tick-99" onClick={() => this.setLv(99)} />
                    <span className="tick tick-maxlv" onClick={() => this.setLv(maxShipLv)} />
                </span>
                <div className="stats">
                    {stats.map(this.renderStat.bind(this))}
                </div>
            </ComponentContainer>
        )
    }
}