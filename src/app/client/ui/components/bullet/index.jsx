import React from 'react'

import Icon from '@appUI/components/icon'

import { ImportStyle } from 'sp-css-import'
import styles from './styles.less'

// @connect()
@ImportStyle(styles)
export default class Bullet extends React.Component {
    render() {
        let level = this.props.level
        if (typeof level === 'undefined')
            level = this.props.bullet
        return (
            <div
                className={this.props.className}
                data-level={level || 0}
            >
                {level === -1 && <Icon className="icon" icon="question6" />}
                {level === 0 && <Icon className="icon" icon="cross" />}
                {this.props.title}
                {this.props.children && <span className="des">
                    {this.props.children}
                </span>}
            </div>
        )
    }
}