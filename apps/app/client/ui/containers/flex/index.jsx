import React from 'react'

import times from '@appUtils/times'
import { ImportStyle } from 'sp-css-import'

export const placeholders = []
export const itemClassName = 'flex-item'
times(10)(index => placeholders.push(
    <span className={`${itemClassName} placeholder`} key={index}></span>
))

@ImportStyle(require('./styles.less'))
export default class FlexContainer extends React.Component {
    render() {
        const { children, noPlaceholder, ...props } = this.props
        return (
            <div {...props}>
                {children}
                {!noPlaceholder && placeholders}
            </div>
        )
    }
}