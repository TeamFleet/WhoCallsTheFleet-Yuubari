import { Component } from 'react';
import { extend } from 'koot';

import db from '@database';

import getShip from '@utils/get-ship.js';
import getPic from '@utils/get-pic.js';
// import routerReplace from '@utils/router-replace'

import Icon from '@ui/components/icon.jsx';
import FlagNavy from '@ui/components/flag-navy.jsx';
import Link from './_normal.jsx';

@extend({
    styles: require('./ship.less'),
})
class LinkShip extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(evt) {
        evt.currentTarget.blur();
        if (typeof this.props.onClick === 'function')
            return this.props.onClick(evt);
    }

    checkShow(value) {
        return value || typeof value === 'undefined';
    }

    renderName(type = this.props.type) {
        if (type === 'names') {
            const names = [];
            this.ship._series.forEach((obj) => {
                const thisShip = getShip(obj.id);
                // console.log(thisShip)
                const baseName = thisShip.getNameNoSuffix();
                if (!names.includes(baseName)) names.push(baseName);
            });
            return <span>{names.join(' / ')}</span>;
        }
        if (type) {
            const type =
                this.ship.type &&
                this.ship.type_display &&
                this.ship.type !== this.ship.type_display
                    ? this.ship.type_display
                    : this.ship.type;
            return (
                <span>
                    <small className="name-type">
                        {db.shipTypes[type]._name}
                    </small>
                    {this.ship._name}
                </span>
            );
        }
        return (
            <span>
                {this.ship.getNameNoSuffix()}
                {this.ship.name.suffix && (
                    <small className="name-suffix">
                        {this.ship.getSuffix()}
                    </small>
                )}
            </span>
        );
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
            antiInstallation = false,
            'min-level': minLv = false,

            onClick,

            // replace = false,
            children,

            ...props
        } = this.props;

        this.ship = getShip(ship);

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

        // const Component = replace ? 'a' : Link
        // const to = '/ships/' + this.ship.id

        // if (Component === 'a') {
        //     props.href = to
        //     props.onClick = evt => {
        //         evt.preventDefault()
        //         routerReplace(to)
        //     }
        // } else
        //     props.to = to

        const classNameHash = className.split(' ')[0];

        return (
            <Link
                to={'/ships/' + this.ship.id}
                className={className}
                pic={this.checkShow(pic) ? getPic(this.ship, '0-2') : null}
                name={this.checkShow(name) ? this.renderName(type) : null}
                onClick={this.onClick}
                alt={this.ship._name}
                type="ship"
                {...props}
            >
                {extraIllust && this.ship.hasExtraIllust() && (
                    <Icon className="icon-has-extra-illust" icon="hanger" />
                )}
                {this.checkShow(navy) && this.ship._navy !== 'ijn' && (
                    <FlagNavy
                        className="flag-navy"
                        navy={this.ship._navy}
                        shadow={true}
                    />
                )}
                {minLv && ship._minLv > 1 && (
                    <span
                        className={classNameHash + '-min-level'}
                        children={ship._minLv}
                    />
                )}
                {antiInstallation && this.ship.canEquip('LandingCraft') && (
                    <span
                        className="icon-anti-installation"
                        type="landing-craft"
                    />
                )}
                {antiInstallation && this.ship.canEquip('AmphibiousCraft') && (
                    <span
                        className="icon-anti-installation"
                        type="amphibious-craft"
                    />
                )}
                {children}
            </Link>
        );
    }
}

export default LinkShip;
