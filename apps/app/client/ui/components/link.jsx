import React from 'react'
import { Link } from 'react-router'
import routerReplace from '@appUtils/router-replace'

export default class extends React.Component {
    render() {
        const {
            to: _to,
            href: _href,

            className,
            // children,

            replace = false,
            onClick,

            ...props
        } = this.props

        const to = _to || _href || ''

        if (to.match(/^(https?:)?\/\//))
            return (to.indexOf('://') < 0
                ? <a className={className} href={to} {...props} />
                : <a className={className} href={to} target="_blank" {...props} />
            )

        return (
            <Link
                className={className}
                to={to}
                onClick={replace
                    ? evt => {
                        routerReplace(to)
                        evt.preventDefault()
                        if (typeof onClick === 'function')
                            return onClick(evt)
                    }
                    : onClick
                }
                {...props}
            />
        )
    }
}