import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classNames'

import translate, { localeId } from 'sp-i18n'
import { availableLocales } from 'Config/i18n'

import { ImportStyle } from 'sp-css-import'
import style from './lang-switch.less'

@connect((state, ownProps) => {
    return {
        location: state.routing && state.routing.locationBeforeTransitions
    }
})
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

    renderOption(thisLocaleId, index) {
        const locales = require(`Locales/${thisLocaleId}.json`)
        return (
            <a
                href={this.currentUrl(thisLocaleId)}
                className={classNames([
                    'item',
                    {
                        'on': localeId === thisLocaleId
                    }
                ])}
                data-lang={thisLocaleId}
                key={index}
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