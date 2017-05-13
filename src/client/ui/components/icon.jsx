import React from 'react'

import { ImportStyle } from 'sp-css-import'
import style from './Icon.less'

@ImportStyle(style)
export default class extends React.Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className={this.props.className} style={this.props.style}>
                <use xlinkHref={
                    (__DEV__ ? '' : require('Assets/symbols/symbol-defs.svg'))
                    + '#icon-' + this.props.icon
                }></use>
            </svg>
        )
    }
}