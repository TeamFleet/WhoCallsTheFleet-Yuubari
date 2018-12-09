import React from 'react'
import { Link, IndexLink } from 'react-router'
import classNames from 'classnames'
import { extend } from 'koot'

import getTimeJST from '@utils/get-time-jst.js'

// wip-
// indev-
let navs = [
    ' ',
    'indev-fleets',
    __DEV__ ? 'wip-fleets-wip' : null,
    'calctp',
    __DEV__ ? 'indev-academy' : null,
    __DEV__ ? ' ' : null,
    __DEV__ ? 'indev-sorties' : null,
    __DEV__ ? 'indev-expeditions' : null,
    ' ',
    'ships',
    'equipments',
    'arsenal',
    'entities',
    __DEV__ ? 'indev-exillusts' : null,
    ' ',
    'about'
]

if (__DEV__)
    navs = navs.concat([
        ' ',
        'dev-ipsum',
        'dev-components',
        'dev-icons'
    ])

const NavChannels = extend({
    styles: require('./channels.less')
})(
    ({ className, location }) => (
        <div className={className}>
            <IndexLink to="/" activeClassName="on" className="link">{__('nav.home')}</IndexLink>
            {navs.map((item, index) => (
                <ChannelItem name={item} location={location} key={index} />
            ))}
        </div>
    )
)

export default NavChannels

//

const ChannelItem = ({
    name, location
}) => {
    if (!name) return null

    if (name === ' ')
        return <s className="blank" />

    let title
    let isIndev = false
    let isWIP = false
    let isCurrent

    if (name.substr(0, 6) === 'indev-') {
        name = name.substr(6)
        title = __('nav', name)
        isIndev = true
    } else if (name.substr(0, 4) === 'wip-') {
        name = name.substr(4)
        title = __('nav', name)
        isWIP = true
    } else if (name.substr(0, 4) === 'dev-')
        title = name
    else
        title = __('nav', name)

    let url = name

    switch (name) {
        case 'arsenal': {
            const jst = getTimeJST()
            url = `arsenal/${jst.getDay()}`
            if (location &&
                location.pathname &&
                location.pathname.indexOf('/arsenal') === 0
            )
                isCurrent = true
            break
        }
    }

    return (
        <Link
            to={'/' + url}
            className={classNames({
                link: true,
                'is-indev': isIndev,
                'is-wip': isWIP,
                on: isCurrent
            })}
            activeClassName="on"
            children={title}
        />
    )
}
