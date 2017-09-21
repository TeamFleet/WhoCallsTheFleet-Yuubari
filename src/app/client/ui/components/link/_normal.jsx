import React from 'react'
import { Link } from 'react-router'

import { ImportStyle } from 'sp-css-import'
import style from './_normal.less'

@ImportStyle(style)
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
            to, href, link,
            ...props
        } = this.props

        const thisPic = pic || avatar || image || src || picture || img
        const thisName = name || title || text || null

        return (
            <Link
                to={to || href || link}
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
            </Link>
        )
    }
}