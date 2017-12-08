import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { ImportStyle } from 'sp-css-import'
import translate from 'sp-i18n'
import PageContainer from 'sp-ui-pagecontainer'

import db from '@appLogic/database'

import htmlHead from '@appUtils/html-head'
import getTimeJST from '@appUtils/get-time-jst'
import getEquipment from '@appUtils/get-equipment'
// import routerReplace from '@appUtils/router-replace'

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

@connect()
@ImportStyle(require('./arsenal.less'))
export default class PageArsenal extends React.Component {
    static onServerRenderHtmlExtend(ext, store) {
        const state = store.getState()
        const pathname = state.routing.locationBeforeTransitions.pathname
        const segs = pathname.split('/')
        const indexArsenal = segs.indexOf('arsenal')
        let day

        if (typeof segs[indexArsenal + 1] !== 'undefined')
            day = translate(`day_full.${daysArr[parseInt(segs[indexArsenal + 1])]}`)

        const head = htmlHead({
            store,
            title: translate('nav.arsenal') + (day ? ` / ${day}` : '')
        })

        ext.metas = ext.metas.concat(head.meta)
        ext.title = head.title
    }

    render() {
        const day = typeof this.props.params === 'object' && typeof this.props.params.day !== 'undefined'
            ? this.props.params.day
            : -1
        // console.log(db)
        return (
            <PageContainer
                className={this.props.className}
            >
                <PageArsenalHeader />

                <p><i>{translate('under_construction')}...</i></p>

                {day > -1 && (<div>
                    {db.arsenalDays[day].map((item, index) => {
                        const equipment = getEquipment(item[0])
                        const improvementId = item[1]
                        const requirements = item[2]
                        return (
                            <p key={index}>
                                <span>{equipment._name}</span>
                                <span> ({improvementId})</span>
                                <span> +{requirements.join(',')}</span>
                            </p>
                        )
                    })}
                </div>)}

                {day === -1 && (<div>
                    {db.arsenalAll.map((item, index) => {
                        const equipment = getEquipment(item)
                        return (
                            <p key={index}>
                                <span>{equipment._name}</span>
                            </p>
                        )
                    })}
                </div>)}
            </PageContainer>
        )
    }
}

// @ImportStyle(require('./arsenal.less'))
class PageArsenalHeader extends React.Component {
    render() {
        const jst = getTimeJST()
        const jstDay = jst.getDay()
        const isDay = typeof this.props.params === 'object' && typeof this.props.params.day !== 'undefined'
        return (
            <MainHeader
                className={classNames({
                    [this.props.className]: true,
                    // 'is-options-show': this.props.isModeFilter,
                })}
            >
                {[
                    <Link
                        key="today"
                        href={`/arsenal/${jstDay}`}
                        replace={true}
                        className="link-today"
                        children={translate(`DAYS`)}
                    />,
                    ...daysArr.map((day, index) => (
                        <Link
                            key={day}
                            href={`/arsenal/${index}`}
                            replace={true}
                            className={classNames({
                                'link-day': true,
                                'is-today': jstDay === index
                            })}
                            activeClassName="on"
                            children={translate(`day_abbr.${day}`)}
                        />
                    )),
                    <Link
                        key="all"
                        href={`/arsenal`}
                        replace={true}
                        className={classNames({
                            'link-all': true,
                            'on': !isDay
                        })}
                        children={translate(`ALL`)}
                    />
                ]}
            </MainHeader>
        )
    }
}