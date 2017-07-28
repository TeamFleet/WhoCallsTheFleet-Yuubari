import React from 'react'
import { Link } from 'react-router'

export default class extends React.Component {
    render() {
        const to = this.props.to || this.props.href || ''
        return (
            to.match(/^(https?:)?\/\//)
                ? (to.indexOf('://') < 0
                    ? <a className={this.props.className} href={to}>{this.props.children}</a>
                    : <a className={this.props.className} href={to} target="_blank">{this.props.children}</a>
                )
                : <Link className={this.props.className} to={to}>{this.props.children}</Link>
        )
    }
}