import React from 'react';
import { Link, IndexLink } from 'react-router';
import classNames from 'classnames';
import { extend } from 'koot';

import getTimeJST from '@utils/get-time-jst.js';

import Icon from '@ui/components/icon';

// wip-
// indev-
let navs = [
    ['base', 'anchor'],
    'indev-fleets',
    __DEV__ ? 'wip-fleets-wip' : null,
    'calctp',
    __DEV__ ? 'indev-academy' : null,

    ['archive', 'book3'],
    'ships',
    'equipments',
    'arsenal',
    'entities',
    __DEV__ ? 'indev-excgs' : null,
    __DEV__ ? 'indev-sorties' : null,
    __DEV__ ? 'indev-expeditions' : null,

    ' ',
    'about',
];

if (__DEV__)
    navs = navs.concat([
        ['dev', 'warning2'],
        'dev-ipsum',
        'dev-components',
        'dev-icons',
    ]);

const NavChannels = extend({
    styles: require('./channels.less'),
})(({ className, location }) => (
    <div className={className}>
        <IndexLink to="/" activeClassName="on" className="link">
            {__('nav.home')}
        </IndexLink>
        {navs.map((item, index) => (
            <ChannelItem name={item} location={location} key={index} />
        ))}
    </div>
));

export default NavChannels;

//

const ChannelItem = ({ name, location }) => {
    if (!name) return null;

    if (name === ' ') return <s className="blank" />;

    if (Array.isArray(name)) {
        return (
            <span className="subtitle">
                <Icon icon={name[1]} className="icon" />
                {__('nav.sub', name[0])}
            </span>
        );
    }

    if (/^__/.test(name)) {
        return (
            <span className="subtitle" children={__('nav', name.substr(2))} />
        );
    }

    let title;
    let isIndev = false;
    let isWIP = false;
    let isActive = false;

    if (name.substr(0, 6) === 'indev-') {
        name = name.substr(6);
        title = __('nav', name);
        isIndev = true;
    } else if (name.substr(0, 4) === 'wip-') {
        name = name.substr(4);
        title = __('nav', name);
        isWIP = true;
    } else if (name.substr(0, 4) === 'dev-') title = name;
    else title = __('nav', name);

    let url = '/' + name;

    switch (name) {
        case 'arsenal': {
            const jst = getTimeJST();
            url = `/arsenal/${jst.getDay()}`;
            isActive =
                location &&
                location.pathname &&
                /^\/arsenal\//.test(location.pathname);
            break;
        }
        default: {
            isActive =
                location &&
                location.pathname &&
                new RegExp(`^${url}/`).test(location.pathname);
        }
    }

    return (
        <Link
            to={url}
            className={classNames({
                link: true,
                'is-indev': isIndev,
                'is-wip': isWIP,
                on: isActive,
            })}
            activeClassName="on"
            children={title}
        />
    );
};
