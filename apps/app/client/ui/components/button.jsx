import React from 'react'
import { Link } from 'react-router'

import { ImportStyle } from 'sp-css-import'
import style from './button.less'

@ImportStyle(style)
export default class extends React.Component {
    render() {
        let {
            className,
            children,
            tag,
            href, link,
            to,
            type,
            color,
            size,
            state,
            onClick,
            ...props
        } = this.props

        let TagName
        if (tag) TagName = tag
        else if (to) TagName = Link
        else if (href || link) TagName = 'a'
        else TagName = 'button'

        let disabled

        const buttonType = type || (TagName === 'button' ? 'button' : undefined)
        const linkUrl = href || link || undefined

        if (color)
            className += ' is-color-' + color

        if (size)
            className += ' is-size-' + size

        if (state === 'disable' || state === 'disabled')
            disabled = true
        else if (state)
            className += ' is-state-' + state

        return (
            <TagName
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
            </TagName>
        )
    }
}