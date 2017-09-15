import React from 'react'
import { Link } from 'react-router'

export default class extends React.Component {
    render() {
        const {
            to: _to, href: _href,
            className,
            children,
            ...props
        } = this.props

        const to = _to || _href || ''

        return (
            to.match(/^(https?:)?\/\//)
                ? (to.indexOf('://') < 0
                    ? <a className={className} href={to} {...props}>{children}</a>
                    : <a className={className} href={to} target="_blank" {...props}>{children}</a>
                )
                : <Link className={className} to={to} {...props}>{children}</Link>
        )
    }
}