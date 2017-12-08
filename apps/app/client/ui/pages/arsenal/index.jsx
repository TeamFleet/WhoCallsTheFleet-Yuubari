import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { ImportStyle } from 'sp-css-import'
import translate from 'sp-i18n'

import htmlHead from '@appUtils/html-head'
import getTimeJST from '@appUtils/get-time-jst'
// import routerReplace from '@appUtils/router-replace'

import PageContainer from 'sp-ui-pagecontainer'
// import {Link, IndexLink} from 'react-router'
import Link from '@appUI/components/link'
import MainHeader from '@appUI/components/main-header'

const daysArr = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thurday",
    "Friday",
    "Saturday"
]

// @connect()
@ImportStyle(require('./arsenal.less'))
export default class PageArsenal extends React.Component {
    static onServerRenderHtmlExtend(ext, store) {
        const head = htmlHead({
            store,
            title: translate('nav.arsenal')
        })

        ext.metas = ext.metas.concat(head.meta)
        ext.title = head.title
    }

    render() {
        const jst = getTimeJST()
        const jstDay = jst.getDay()
        const isDay = typeof this.props.params === 'object' && typeof this.props.params.day !== 'undefined'
        return (
            <PageContainer
                className={this.props.className}
            >
                <MainHeader
                    className={classNames({
                        [this.props.className]: true,
                        // 'is-options-show': this.props.isModeFilter,
                    })}
                >
                    <span className="days">
                        <Link
                            href={`/arsenal/${jstDay}`}
                            replace={true}
                            className="link-today"
                        >
                            {translate(`DAYS`)}
                        </Link>
                        {daysArr.map((day, index) => (
                            <Link
                                key={day}
                                href={`/arsenal/${index}`}
                                replace={true}
                                className={classNames({
                                    'link-day': true,
                                    'is-today': jstDay === index
                                })}
                                activeClassName="on"
                            >
                                {translate(`day_abbr.${day}`)}
                            </Link>
                        ))}
                    </span>
                    <Link
                        href={`/arsenal`}
                        replace={true}
                        className={classNames({
                            'link-all': true,
                            'on': !isDay
                        })}
                    >
                        {translate(`ALL`)}
                    </Link>
                </MainHeader>

                <p><i>{translate('under_construction')}...</i></p>
                <p>JST NOW: {jstDay}</p>
                {isDay && (
                    <p>CURRENT DAY: {this.props.params.day}</p>
                )}
            </PageContainer>
        )
    }
}