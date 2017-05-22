import React from 'react'
import { Link } from 'react-router'

export default class extends React.Component {
    render() {
        // props.href.match(/^(https?:)?\/\//)
        //     ? (props.href.indexOf('://') < 0
        //         ? <a href={props.href}>{props.children}</a>
        //         : <a href={props.href} target="_blank">{props.children}</a>
        //     )
        //     : <Link to={props.href}>{props.children}</Link>
        return (
            <Link className={this.props.className} to={this.props.to}>
                {this.props.children}
            </Link>
        )
    }
}