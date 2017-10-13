import React from 'react'

import { ImportStyle } from 'sp-css-import'
import style from './icon.less'

@ImportStyle(style)
export default class extends React.Component {
    render() {
        const {
            className,
            style,
            icon,
            ...props
        } = this.props
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                className={className}
                style={style}
                {...props}
            >
                <use xlinkHref={'#icon-' + icon}></use>
            </svg>
        )
        // return (
        //     <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className={this.props.className} style={this.props.style}>
        //         <use xlinkHref={
        //             (__DEV__ ? '' : require('@appAssets/symbols/symbol-defs.svg'))
        //             + '#icon-' + this.props.icon
        //         }></use>
        //     </svg>
        // )
    }
}