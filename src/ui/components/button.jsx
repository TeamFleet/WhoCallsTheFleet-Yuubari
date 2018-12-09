import React from 'react'
import { Link } from 'react-router'
import { ImportStyle } from 'sp-css-import'

@ImportStyle(require('./button.less'))
export default class extends React.Component {
    render() {
        let {
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
        } = this.props

        let Component
        if (tag) Component = tag
        else if (component) Component = component
        else if (to) Component = Link
        else if (href || link) Component = 'a'
        else Component = 'button'

        let disabled

        const buttonType = type || (Component === 'button' ? 'button' : undefined)
        const linkUrl = href || link || undefined

        if (color)
            className += ' mod-color-' + color

        if (size)
            className += ' mod-size-' + size

        if (state === 'disable' || state === 'disabled')
            disabled = true
        else if (state)
            className += ' is-state-' + state

        return (
            <Component
                className={'button ' + className}
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
}
