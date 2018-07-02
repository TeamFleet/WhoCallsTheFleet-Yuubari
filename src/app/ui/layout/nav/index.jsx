import React from 'react'
import { connect } from 'react-redux'
import { Link, IndexLink } from 'react-router'
import classNames from 'classnames'

import { enterBackground as enterUIModeBackground } from '@api/ui-mode'

import LangSwitch from '@ui/components/lang-switch.jsx'
import Icon from '@ui/components/icon.jsx'

import { ImportStyle } from 'sp-css-import'
import style from './nav.less'

import getTimeJST from '@utils/get-time-jst.js'

// wip-
// indev-
let navs = [
    undefined,
    'indev-fleets',
    __DEV__ ? 'wip-fleets-wip' : null,
    'calctp',
    __DEV__ ? 'indev-academy' : null,
    __DEV__ ? undefined : null,
    __DEV__ ? 'indev-sorties' : null,
    __DEV__ ? 'indev-expeditions' : null,
    undefined,
    'ships',
    'equipments',
    'arsenal',
    'entities',
    __DEV__ ? 'indev-exillusts' : null,
    undefined,
    'about'
]

if (__DEV__)
    navs = navs.concat([
        undefined,
        'dev-ipsum',
        'dev-components',
        'dev-icons'
    ])

@connect(state => ({
    realtimeLocation: state.realtimeLocation,
    // pageTitle: state.pageTitle,
    timeSwipedFromLeftEdge: state.timeSwipedFromLeftEdge
}))
@ImportStyle(style)
export default class extends React.Component {
    state = {
        showBackButton: false
    }

    historyBack() {
        if (typeof history !== 'undefined')
            history.back()
    }

    enterAppModeBackground() {
        this.props.dispatch(enterUIModeBackground())
        // document.body.classList.add('mode-bg')
    }

    getSnapshotBeforeUpdate(prevProps) {
        // this.setState({
        //     showBackButton: nextProps.location !== this.props.location
        // })

        if (prevProps.timeSwipedFromLeftEdge !== this.props.timeSwipedFromLeftEdge)
            this._navSwitch.checked = true

        return null
    }

    componentDidUpdate() { }

    get isLoading() {
        if (__SERVER__ || typeof this.props.realtimeLocation.pathname === 'undefined') return false
        if (__SPA__)
            return (this.props.realtimeLocation.hash.substr(1) !== this.props.location.pathname)
        return (this.props.realtimeLocation.pathname !== this.props.location.pathname)
    }

    // share() {
    //     if (!__CLIENT__) return
    //     if (!navigator.share) return
    //     navigator.share({
    //         title: document.title,
    //         text: "Hello World",
    //         url: window.location.href
    //     }).then(() => console.log('Successful share'))
    //         .catch(error => console.log('Error sharing:', error));
    // }

    render() {
        const logoStyles = __CHANNEL__ === 'yuubari' ? {
            backgroundImage: `url(${require('@assets/logos/yuubari/128.png')})`
        } : undefined
        return (
            <nav id="nav" className={this.props.className + (this.isLoading ? ' is-loading' : '')}>
                <input type="checkbox" id="nav-switch" ref={(c) => this._navSwitch = c} />

                <div className="wrapper">
                    <div className="logo">
                        {__SPA__ && (
                            <button type="button" className="btn-back" disabled={!this.state.showBackButton} onClick={this.historyBack} />
                        )}
                        <IndexLink to="/" className="btn-home-logo" activeClassName="on" style={logoStyles}>{__('title')}</IndexLink>
                        {__CHANNEL__ === 'yuubari' && <span className="channel channel-yuubari">Yuubari</span>}
                    </div>

                    <Navs location={this.props.location} />

                    <LanguageSwitch />

                    <div className="controls">
                        <button type="button" onClick={this.enterAppModeBackground.bind(this)}>[PH] BG</button>
                    </div>
                </div>

                <AppBar />

                <label htmlFor="nav-switch" className="label">
                    <div className="icon"><Icon className="icon-menu" icon="menu" /></div>
                </label>
            </nav>
        )
    }
}





let elNavSwitch
export const onRouterChange = () => {
    if (typeof document === 'undefined') return
    if (!elNavSwitch) elNavSwitch = document.getElementById('nav-switch')
    elNavSwitch.checked = false
}





@ImportStyle(require('./styles-navs.less'))
// @i18n()
class Navs extends React.Component {
    renderItem(route, index) {
        if (route === null)
            return null

        if (typeof route === 'undefined')
            return <s className="blank" key={index}></s>

        let title
        let isIndev = false
        let isWIP = false
        let isCurrent

        if (route.substr(0, 6) === 'indev-') {
            route = route.substr(6)
            title = __('nav', route)
            isIndev = true
        } else if (route.substr(0, 4) === 'wip-') {
            route = route.substr(4)
            title = __('nav', route)
            isWIP = true
        } else if (route.substr(0, 4) === 'dev-')
            title = route
        else
            title = __('nav', route)
            // __(`nav.${route}`)
            // __.nav[route]

            // __.A.B='b' 
            // __('b')

        switch (route) {
            case 'arsenal': {
                const jst = getTimeJST()
                route = `arsenal/${jst.getDay()}`
                if (this.props.location &&
                    this.props.location.pathname &&
                    this.props.location.pathname.indexOf('/arsenal') === 0
                )
                    isCurrent = true
                break
            }
        }

        return (
            <Link
                to={'/' + route}
                key={index}
                className={classNames({
                    link: true,
                    'is-indev': isIndev,
                    'is-wip': isWIP,
                    on: isCurrent
                })}
                activeClassName="on"
            >{title}</Link>
        )
    }
    render() {
        // const a = 'A'
        // console.log(__('header.nav', a, 12, '__AA__', { time: Date.now() }))
        return (
            <div className={this.props.className}>
                <IndexLink to="/" activeClassName="on" className="link">{__('nav.home')}</IndexLink>
                {navs.map(this.renderItem.bind(this))}
            </div>
        )
    }
}





@ImportStyle(require('./styles-language-switch.less'))
class LanguageSwitch extends React.Component {
    render() {
        return (
            <div className={this.props.className}>
                <span className="title">{__('nav.languageSwitch')}</span>
                <LangSwitch className="container" />
            </div>
        )
    }
}





@connect(state => ({
    pageTitle: state.pageTitle
}))
@ImportStyle(require('./styles-appbar.less'))
class AppBar extends React.Component {
    render() {
        return (
            <div className={this.props.className}>
                {this.props.pageTitle.sub && <span className="sub">{this.props.pageTitle.sub}</span>}
                <span className="main">{this.props.pageTitle.main}</span>
                <span className="buttons">
                    {__CLIENT__ && navigator.share && (
                        <Icon icon="question6" onClick={() => {
                            navigator.share({
                                title: 'Web Fundamentals',
                                text: 'Check out Web Fundamentals—it rocks!',
                                url: location.href,
                            })
                                .then(() => console.log('Successful share'))
                                .catch((error) => console.log('Error sharing', error));
                        }} />
                    )}
                </span>
            </div>
        )
    }
}
