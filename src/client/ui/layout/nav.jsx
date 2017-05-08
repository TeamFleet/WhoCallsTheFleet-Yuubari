import React from 'react'
import { connect } from 'react-redux'
import { Link, IndexLink } from 'react-router'

import translate from 'sp-i18n'
import { enterBackground as appModeEnterBackground } from '../../logic/app-mode/api.js'

import LangSwitch from '../components/lang-switch.jsx'
import { BgContainerBlured } from './bgimg.jsx'

import { ImportStyle } from 'sp-css-import'
import style from './nav.less'

const navs = [
    undefined,
    'fleets',
    'calctp',
    undefined,
    'ships',
    'equipments',
    'arsenal',
    'entities',
    undefined,
    'about'
]

@connect(state => ({
    realtimeLocation: state.location
}))
@ImportStyle(style)
export default class extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showBackButton: false
        }
    }

    historyBack() {
        if (typeof history !== 'undefined')
            history.back()
    }

    enterAppModeBackground() {
        this.props.dispatch(appModeEnterBackground())
        // document.body.classList.add('mode-bg')
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            showBackButton: nextProps.location !== this.props.location
        })
    }

    get isLoading() {
        if (typeof this.props.realtimeLocation.pathname === 'undefined') return false
        return (this.props.realtimeLocation.pathname !== this.props.location.pathname)
    }

    renderItem(route, index) {
        if (typeof route === 'undefined') {
            return <s className="blank" key={index}></s>
        } else {
            return (
                <Link
                    to={'/' + route}
                    key={index}
                    className="link"
                    activeClassName="on"
                >{translate('nav.' + route)}</Link>
            )
        }
    }

    render() {
        return (
            <nav id="nav" className={this.props.className + (this.isLoading ? ' is-loading' : '')}>
                <input type="checkbox" id="nav-switch" />

                <div className="wrapper">
                    <div className="logo">
                        <button type="button" className="btn-back" disabled={!this.state.showBackButton} onClick={this.historyBack} />
                        <IndexLink to="/" className="btn-home-logo" activeClassName="on" />
                    </div>

                    <div className="navs">
                        <IndexLink to="/" activeClassName="on" className="link">{translate('nav.home')}</IndexLink>
                        {navs.map(this.renderItem)}
                    </div>

                    <div className="language-switch">
                        <span className="title">{translate('nav.languageSwitch')}</span>
                        <LangSwitch className="language-switch-container" />
                    </div>

                    <div className="controls">
                        <button type="button" onClick={this.enterAppModeBackground.bind(this)}>[PH] BG CONTROLS</button>
                    </div>
                </div>

                <label htmlFor="nav-switch" className="label"></label>

                <BgContainerBlured />
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
