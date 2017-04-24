import React from 'react'
import { Link, IndexLink } from 'react-router'

import translate from 'sp-i18n'
import routes from '../../router'

import LangSwitch from '../components/LangSwitch.jsx'

import { ImportStyle } from 'sp-css-import'
import style from './Nav.less'

@ImportStyle(style)
export default class extends React.Component {
    render() {
        return (
            <nav id="nav" className={this.props.className}>
                <input type="checkbox" id="nav-switch" />

                <div className="wrapper">
                    <h1><IndexLink to="/">Super Project</IndexLink></h1>

                    <div className="navs">
                        <IndexLink to="/" activeClassName="on" className="level-1">{translate('nav.home')}</IndexLink>
                        <Link to="/about" activeClassName="on" className="level-1">{translate('nav.about')}</Link>
                    </div>

                    <div className="language-switch">
                        <span className="title">{translate('nav.languageSwitch')}</span>
                        <LangSwitch className="switches" />
                    </div>
                </div>

                <label htmlFor="nav-switch" className="label"></label>
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