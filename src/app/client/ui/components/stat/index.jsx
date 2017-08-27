import React from 'react'

import IconStat from '@appUI/components/icon-stat'

import { ImportStyle } from 'sp-css-import'
import styles from './styles.less'

// @connect()
@ImportStyle(styles)
export default class Stat extends React.Component {
    render() {
        const type = this.props.type || this.props.title
        const Component = this.props.stat ? IconStat : 'dl'

        let componentProps = {
            className: this.props.className
        }

        if (this.props.stat) {
            componentProps.tag = "dl"
            componentProps.stat = this.props.stat
        }

        if (typeof this.props.value !== 'undefined' && this.props.value < 0) {
            componentProps.className += ' is-negative'
        }

        return (
            <Component {...componentProps}>
                {type && <dt className="type">{type}</dt>}
                <dd className="value">
                    {this.props.value}
                    {this.props.children}
                    {this.props.max && <sup className="value-max">{this.props.max}</sup>}
                </dd>
            </Component>
        )
    }
}