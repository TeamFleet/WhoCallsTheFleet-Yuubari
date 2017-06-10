import React from 'react'
import { Link } from 'react-router'

import getShip from 'Utils/get-ship.js'
import getPic from 'Utils/get-pic.js'

import Icon from 'UI/components/icon.jsx'
import FlagNavy from 'UI/components/flag-navy.jsx'

import { ImportStyle } from 'sp-css-import'
import style from './link-ship.less'

@ImportStyle(style)
export default class LinkShip extends React.Component {
    renderAvatar() {
        return (
            <span
                className="avatar"
                style={{
                    backgroundImage: `url(${getPic('ships', this.ship.id, '0-2')})`
                }}
            />
        )
    }

    renderName() {
        return (
            <span className="name">
                {this.ship.getNameNoSuffix()}
                {this.ship.name.suffix && (<small className="name-suffix">{this.ship.getSuffix()}</small>)}
            </span>
        )
    }

    render() {
        this.ship = getShip(this.props.ship)

        return (
            <Link
                className={this.props.className}
                to={'/ships/' + this.ship.id}
                onClick={this.props.onClick}
            >
                {this.props.hasExtraIllust && <Icon className="icon-has-extra-illust" icon="hanger" />}
                {this.renderName()}
                {this.renderAvatar()}
                {this.ship.navy !== 'ijn' && <FlagNavy className="flag-navy" navy={this.ship.navy} />}
                {this.props.children}
            </Link>
        )
    }
}