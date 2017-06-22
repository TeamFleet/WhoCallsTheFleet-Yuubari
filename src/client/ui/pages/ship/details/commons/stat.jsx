import React from 'react'

import { ImportStyle } from 'sp-css-import'
import styles from './stat.less'

// @connect()
@ImportStyle(styles)
export default class ShipDetailsStat extends React.Component {
    render() {
        const type = this.props.type || this.props.title
        return (
            <dl className={this.props.className}>
                {type && <dt className="type">{type}</dt>}
                <dd className="value">
                    {this.props.children}
                </dd>
            </dl>
        )
    }
}