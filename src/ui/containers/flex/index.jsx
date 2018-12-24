import React from 'react'
import { extend } from 'koot'

import times from '@utils/times'

export const itemClassName = 'flex-item'
export const placeholders = (() => {
    const arr = []
    times(10)(index => arr.push(
        <span className={`${itemClassName} placeholder`} key={index}></span>
    ))
    return arr
})()

const FlexContainer = extend({
    styles: require('./styles.less')
})(
    ({ children, noPlaceholder, ...props }) =>
        <div {...props}>
            {children}
            {!noPlaceholder && placeholders}
        </div>
)
export default FlexContainer
