import React from 'react'

import Icon from 'UI/components/icon'

import { ImportStyle } from 'sp-css-import'
import styles from './special.less'

// @connect()
@ImportStyle(styles)
export default class ShipDetailsSpecial extends React.Component {
    render() {
        return (
            <div
                className={this.props.className}
                data-level={this.props.level || 0}
            >
                {this.props.level === 0 && <Icon className="icon" icon="cross" />}
                {this.props.title}
                {this.props.children && <span className="des">
                    {this.props.children}
                </span>}
            </div>
        )
    }
}