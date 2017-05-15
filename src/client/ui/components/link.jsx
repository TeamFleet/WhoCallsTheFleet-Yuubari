import React from 'react'
import { Link } from 'react-router'

export default class extends React.Component {
    render() {
        return (
            <Link className={this.props.className} to={this.props.to}>
                {this.props.children}
            </Link>
        )
    }
}