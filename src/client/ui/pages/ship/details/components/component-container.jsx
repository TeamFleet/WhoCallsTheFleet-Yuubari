import React from 'react'

import Title from 'UI/components/title.jsx'

import { ImportStyle } from 'sp-css-import'
import styles from './component-container.less'

// @connect()
@ImportStyle(styles)
export default class ShipDetailsComponentContainer extends React.Component {
    render() {
        return (
            <div className={this.props.className}>
                {this.props.title && <Title tag="h2" className="title">{this.props.title}</Title>}
                {this.props.children}
            </div>
        )
    }
}