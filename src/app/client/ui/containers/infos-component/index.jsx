import React from 'react'

import Title from '@appUI/components/title.jsx'

import { ImportStyle } from 'sp-css-import'
import styles from './styles.less'

// @connect()
@ImportStyle(styles)
export default class InfosComponentContainer extends React.Component {
    render() {
        return (
            <div className={this.props.className}>
                {this.props.title && <Title tag="h2" className="title">{this.props.title}</Title>}
                {this.props.children}
            </div>
        )
    }
}