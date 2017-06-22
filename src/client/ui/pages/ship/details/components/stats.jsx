import React from 'react'

import ComponentContainer from '../commons/component-container.jsx'
import Stat from '../commons/stat.jsx'

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
            lv: 99
        }
    }
    renderStat(stat, index) {
        return (
            <Stat type={translate(`stat.${stat}`)} key={index}>
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
                <div className="wrapper">
                    {stats.map(this.renderStat.bind(this))}
                </div>
            </ComponentContainer>
        )
    }
}