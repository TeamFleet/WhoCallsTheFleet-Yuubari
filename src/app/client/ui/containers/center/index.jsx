import React from 'react'

import { ImportStyle } from 'sp-css-import'
import style from './styles.less'

@ImportStyle(style)
export default class CenterContainer extends React.Component {
    render() {
        return (
            <div
                className={this.props.className}
            >
                {this.props.children}
            </div>
        )
    }
}