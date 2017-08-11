import React from 'react'
import Link from './_normal.jsx'

import getShip from '@appUtils/get-ship.js'
import getPic from '@appUtils/get-pic.js'

import Icon from '@appUI/components/icon.jsx'
import FlagNavy from '@appUI/components/flag-navy.jsx'

import { ImportStyle } from 'sp-css-import'
import style from './ship.less'

@ImportStyle(style)
export default class LinkShip extends React.Component {
    checkShow(type) {
        return (this.props[type] || typeof this.props[type] === 'undefined')
    }

    renderName() {
        return (
            <span>
                {this.ship.getNameNoSuffix()}
                {this.ship.name.suffix && (<small className="name-suffix">{this.ship.getSuffix()}</small>)}
            </span>
        )
    }

    render() {
        this.ship = getShip(this.props.ship)

        // const props = { ...this.props };
        // [
        //     'className',
        //     'children',
        //     'onClick',
        //     'id',
        //     'ship',
        //     'extraIllust',
        //     'navy',
        //     'name',
        //     'pic'
        // ].forEach(key => delete props[key])

        // console.log(props)

        return (
            <Link
                className={this.props.className}
                to={'/ships/' + this.ship.id}
                onClick={this.props.onClick}
                pic={this.checkShow('pic') ? getPic(this.ship, '0-2') : null}
                name={this.checkShow('name') ? this.renderName() : null}
            >
                {this.props.extraIllust && this.ship.hasExtraIllust() && <Icon className="icon-has-extra-illust" icon="hanger" />}
                {this.checkShow('navy') && this.ship._navy !== 'ijn' && <FlagNavy className="flag-navy" navy={this.ship._navy} />}
                {this.props.children}
            </Link>
        )
    }
}