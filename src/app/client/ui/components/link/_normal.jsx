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
        const pic = this.props.pic || this.props.avatar || this.props.image || this.props.src || this.props.picture || this.props.img
        const name = this.props.name || this.props.title || this.props.text || null
        return (
            <Link
                className={this.props.className}
                to={this.props.to || this.props.href || this.props.link}
                onClick={this.props.onClick}
            >
                {pic && <span
                    className="pic"
                    style={{
                        backgroundImage: `url(${pic})`
                    }}
                />}
                {name && this.renderName(name)}
                {this.props.children}
            </Link>
        )
    }
}