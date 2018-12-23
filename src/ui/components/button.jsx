import React from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import { extend } from 'koot'

const Button = extend({
    styles: require('./button.less')
})(
    ({
        className,
        children,
        tag, component,
        href, link,
        to,
        type,
        color,
        size,
        state,
        onClick,
        ...props
    }) => {

        let Component
        if (tag) Component = tag
        else if (component) Component = component
        else if (to) Component = Link
        else if (href || link) Component = 'a'
        else Component = 'button'

        const disabled = (state === 'disable' || state === 'disabled')
        const buttonType = type || (Component === 'button' ? 'button' : undefined)
        const linkUrl = href || link || undefined

        return (
            <Component
                className={classNames(['button', className], {
                    [`mod-color-${color}`]: color,
                    [`mod-size-${size}`]: size,
                    [`is-state-${state}`]: !disabled && state,
                })}
                href={linkUrl}
                to={to}
                type={buttonType}
                disabled={disabled}
                onClick={evt => {
                    evt.target.blur()
                    if (typeof onClick === 'function')
                        onClick(evt)
                }}
                {...props}
            >
                {children}
            </Component>
        )
    }
)
export default Button
