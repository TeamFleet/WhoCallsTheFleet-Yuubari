import React from 'react'

import { ImportStyle } from 'sp-css-import'
import style from './icon-stat.less'
import arrResources from '@appData/resources'

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
        const isResource = arrResources.includes(this.props.stat)
        return (
            <TagName
                className={this.props.className}
                data-stat={stats.indexOf(this.props.stat === 'distance' ? 'range' : this.props.stat)}
                data-resource={isResource ? this.props.stat : undefined}
            >
                {this.props.children}
            </TagName>
        )
    }
}