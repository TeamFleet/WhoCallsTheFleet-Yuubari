import React from 'react'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'

import { localeId } from 'sp-i18n'
import { availableLocales } from '@appConfig/i18n'

import { ImportStyle } from 'sp-css-import'
import style from './lang-switch.less'

@connect(state => ({
    location: state.routing && state.routing.locationBeforeTransitions
}))
@ImportStyle(style)
export default class extends React.Component {

    currentUrl(thisLocaleId) {
        let search = '',
            query = { ...this.props.location.query }

        delete thisLocaleId.hl
        delete thisLocaleId.fb_locale

        if (thisLocaleId) query.hl = thisLocaleId

        for (let key in query) {
            if (!search) search = '?'
            else search += '&'
            search += `${key}=${query[key]}`
        }

        return this.props.location.pathname + search
    }

    onClickSPA(evt, newLocaleId) {
        if (__SPA__) {
            evt.preventDefault()
            Cookies.set('spLocaleId', newLocaleId, { expires: 365 })
            location.reload()
        }
    }

    renderOption(thisLocaleId, index) {
        const locales = require(`@appLocales/${thisLocaleId}.json`)
        return (
            <a
                href={this.currentUrl(thisLocaleId)}
                className={'item' +
                    (localeId === thisLocaleId ? ' on' : '')
                }
                data-lang={thisLocaleId}
                key={index}
                onClick={(evt) => {
                    this.onClickSPA(evt, thisLocaleId)
                }}
            >
                {locales.name.short}
            </a>
        )
    }

    render() {
        return (
            <span className={this.props.className}>
                {
                    availableLocales.map(this.renderOption.bind(this))
                }
            </span>
        )
    }
}