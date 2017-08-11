import React from 'react'
import { Link } from 'react-router'

export default class extends React.Component {
    render() {
        const to = this.props.to || this.props.href || ''

        const props = { ...this.props };
        [
            'className',
            'children',
            'to',
            'href'
        ].forEach(key => delete props[key])

        return (
            to.match(/^(https?:)?\/\//)
                ? (to.indexOf('://') < 0
                    ? <a className={this.props.className} href={to} {...props}>{this.props.children}</a>
                    : <a className={this.props.className} href={to} target="_blank" {...props}>{this.props.children}</a>
                )
                : <Link className={this.props.className} to={to} {...props}>{this.props.children}</Link>
        )
    }
}