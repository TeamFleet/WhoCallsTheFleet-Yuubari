import React from 'react'
import { Link } from 'react-router'
import db from 'Logic/database'

export default class LinkShip extends React.Component {
    render() {
        if (typeof this.props.ship === 'string')
            this.props.ship = parseInt(this.props.ship)
        if (typeof this.props.ship === 'number')
            this.props.ship = db.ships[this.props.ship]

        return (
            <Link className={this.props.className} to={'/ships/' + this.props.ship.id}>
                [{this.props.ship.id}] {this.props.ship._name}
            </Link>
        )
    }
}