import React from 'react'
// import { Link } from 'react-router'
import { extend } from 'koot'

const ButtonGroup = extend({
    styles: require('./button-group.less')
})(
    ({ className, children }) => (
        <span
            className={className}
        >
            {children}
        </span>
    )
)
export default ButtonGroup
