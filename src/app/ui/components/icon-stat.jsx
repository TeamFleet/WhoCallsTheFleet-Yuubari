import React from 'react'

import { ImportStyle } from 'sp-css-import'
import style from './icon-stat.less'
import arrResources from '@const/resources'

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
        const isResource = !this.props.disableResourceColor && arrResources.includes(this.props.stat)

        let stat = this.props.stat
        switch (stat) {
            case 'distance':
                stat = 'range'
                break
            case 'antibomber':
                stat = 'hit'
                break
            case 'interception':
                stat = 'evasion'
                break
        }

        return (
            <TagName
                className={this.props.className}
                data-stat={stats.indexOf(stat)}
                data-resource={isResource ? this.props.stat : undefined}
            >
                {this.props.children}
            </TagName>
        )
    }
}
