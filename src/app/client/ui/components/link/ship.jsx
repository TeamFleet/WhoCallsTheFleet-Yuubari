import React from 'react'
import Link from './_normal.jsx'

import db from '@appLogic/database'

import getShip from '@appUtils/get-ship.js'
import getPic from '@appUtils/get-pic.js'

import Icon from '@appUI/components/icon.jsx'
import FlagNavy from '@appUI/components/flag-navy.jsx'

import { ImportStyle } from 'sp-css-import'
import style from './ship.less'

@ImportStyle(style)
export default class LinkShip extends React.Component {
    checkShow(value) {
        return (value || typeof value === 'undefined')
    }

    renderName(type = this.props.type) {
        if (type === 'names') {
            const names = []
            this.ship._series.forEach(obj => {
                const thisShip = getShip(obj.id)
                // console.log(thisShip)
                const baseName = thisShip.getNameNoSuffix()
                if (!names.includes(baseName))
                    names.push(baseName)
            })
            return (
                <span>
                    {names.join(' / ')}
                </span>
            )
        }
        if (type) {
            const type = (this.ship.type && this.ship.type_display && this.ship.type !== this.ship.type_display)
                ? this.ship.type_display
                : this.ship.type
            return (
                <span>
                    <small className="name-type">
                        {db.shipTypes[type]._name}
                    </small>
                    {this.ship._name}
                </span>
            )
        }
        return (
            <span>
                {this.ship.getNameNoSuffix()}
                {this.ship.name.suffix && (<small className="name-suffix">{this.ship.getSuffix()}</small>)}
            </span>
        )
    }

    render() {
        const {
            className,
            ship,

            type,
            extraIllust,
            pic,
            name,
            navy,

            children,

            ...props
        } = this.props

        this.ship = getShip(ship)

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
                className={className}
                to={'/ships/' + this.ship.id}
                pic={this.checkShow(pic) ? getPic(this.ship, '0-2') : null}
                name={this.checkShow(name) ? this.renderName(type) : null}
                {...props}
            >
                {extraIllust && this.ship.hasExtraIllust() && <Icon className="icon-has-extra-illust" icon="hanger" />}
                {this.checkShow(navy) && this.ship._navy !== 'ijn' && <FlagNavy className="flag-navy" navy={this.ship._navy} shadow={true} />}
                {children}
            </Link>
        )
    }
}