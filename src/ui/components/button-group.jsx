import React from 'react'
// import { Link } from 'react-router'

import { ImportStyle } from 'sp-css-import'
import style from './button-group.less'

@ImportStyle(style)
export default class extends React.Component {
    render() {
        return (
            <span
                className={this.props.className}
            >
                {this.props.children}
            </span>
        )
    }
}
