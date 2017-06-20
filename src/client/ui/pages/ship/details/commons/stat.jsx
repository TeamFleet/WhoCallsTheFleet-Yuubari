import React from 'react'

import { ImportStyle } from 'sp-css-import'
import styles from './stat.less'

// @connect()
@ImportStyle(styles)
export default class ShipDetailsStat extends React.Component {
    render() {
        return (
            <dl className={this.props.className}>
                {this.props.title && <dt className="title">{this.props.title}</dt>}
                <dd className="body">
                    {this.props.children}
                </dd>
            </dl>
        )
    }
}