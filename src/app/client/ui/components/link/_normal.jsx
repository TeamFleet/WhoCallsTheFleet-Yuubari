import React from 'react'
import { Link } from 'react-router'

import { ImportStyle } from 'sp-css-import'
import style from './_normal.less'

@ImportStyle(style)
export default class LinkTypeNormal extends React.Component {
    renderName(name) {
        if (typeof name === 'string') {
            return (
                <span className="name">
                    {name}
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
            name, title, text,
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
                {thisName && this.renderName(thisName)}
                {this.props.children}
            </Link>
        )
    }
}