import React from 'react'

import { ImportStyle } from 'sp-css-import'
import style from './icon-stat.less'

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

    'fuel',
    'ammo',

    'bomb',
    'hit',

    'steel',
    'bauxite',

    'dev',
    'screw'
]

@ImportStyle(style)
export default class extends React.Component {
    render() {
        const TagName = this.props.tag || 'span'
        return (
            <TagName className={this.props.className} data-stat={stats.indexOf(this.props.stat)} />
        )
    }
}