import React from 'react'
import { Link } from 'react-router'
import { ImportStyle } from 'sp-css-import'
import routerReplace from '@appUtils/router-replace'

@ImportStyle(require('./_normal.less'))
export default class LinkTypeNormal extends React.Component {
    renderName(name, extra) {
        if (typeof name === 'string') {
            return (
                <span className="name">
                    {name}
                    {typeof extra !== 'undefined' && <small className="name-extra">{extra}</small>}
                </span>
            )
        }
        return React.cloneElement(name, {
            className: 'name'
        })
    }

    render() {
        const {
            pic, avatar, image, src, picture, img,
            name, title, text, nameExtra,
            to: _to, href, link,
            replace = false,
            ...props
        } = this.props

        const thisPic = pic || avatar || image || src || picture || img
        const thisName = name || title || text || null

        const Component = replace ? 'a' : Link
        const to = _to || href || link

        if (Component === 'a') {
            props.href = to
            props.onClick = evt => {
                evt.preventDefault()
                routerReplace(to)
            }
        } else
            props.to = to

        return (
            <Component
                {...props}
            >
                {thisPic && <span
                    className="pic"
                    style={{
                        backgroundImage: `url(${thisPic})`
                    }}
                />}
                {thisName && this.renderName(thisName, nameExtra)}
                {this.props.children}
            </Component>
        )
    }
}