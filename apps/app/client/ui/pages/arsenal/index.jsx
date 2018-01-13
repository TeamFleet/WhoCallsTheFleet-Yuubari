import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { ImportStyle } from 'sp-css-import'
import translate from 'sp-i18n'
import PageContainer from 'sp-ui-pagecontainer'

import db from '@appLogic/database'
import pref from '@appLogic/preferences'

import htmlHead from '@appUtils/html-head'
import getTimeJST from '@appUtils/get-time-jst'
import getLink from '@appUtils/get-link'
import getShip from '@appUtils/get-ship'
import getEquipment from '@appUtils/get-equipment'
import sortShips from '@appUtils/sort-ships'
// import routerReplace from '@appUtils/router-replace'

// import {Link, IndexLink} from 'react-router'
import Link from '@appUI/components/link'
import LinkEquipment from '@appUI/components/link/equipment'
import Title from '@appUI/components/title'
import MainHeader from '@appUI/components/main-header/main-options'
import { Resources as ImprovementResources } from '@appUI/components/improvement'
import ImprovementStar from '@appUI/components/improvement/star'

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
@ImportStyle(require('./styles.less'))
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
            title: [
                translate('nav.arsenal'),
                day
            ]
        })

        ext.metas = ext.metas.concat(head.meta)
        ext.title = head.title
    }

    componentDidUpdate(prevProps/*, prevState*/) {
        // const prevParams = prevProps.params || {}
        // const params = this.props.params || {}
        if (prevProps.params.day !== this.props.params.day)
            window.scrollTo(undefined, 0)
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
                <PageArsenalHeader isDay={typeof this.props.params === 'object' && typeof this.props.params.day !== 'undefined'} />

                {day > -1 && <PageArsenalListDay day={day} />}
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

@ImportStyle(require('./styles-header.less'))
class PageArsenalHeader extends React.Component {
    render() {
        const jst = getTimeJST()
        const jstDay = jst.getDay()
        return <MainHeader
            className={classNames({
                [this.props.className]: true,
                // 'is-options-show': this.props.isModeFilter,
            })}

            mainClassName={this.props.className + "-tabs"}
            main={[
                <PageArsenalHeaderAkashi className={this.props.className + "-akashi"} key="akashi" />,
                <Link
                    key="today"
                    href={`/arsenal/${jstDay}`}
                    replace={true}
                    className={classNames(['tab', "link-today"])}
                    children={translate(`arsenal.filter_by_day`)}
                />,
                ...daysArr.map((day, index) => (
                    <Link
                        key={day}
                        href={`/arsenal/${index}`}
                        replace={true}
                        className={classNames({
                            tab: true,
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
                        tab: true,
                        'link-all': true,
                        'on': !this.props.isDay
                    })}
                    children={translate(`arsenal.all`)}
                />
            ]}
        />
    }
}

class PageArsenalHeaderAkashi extends React.Component {
    constructor() {
        super()
        this.state = {
            animation: Math.floor((Math.random() * 3) + 1)
        }
    }
    changeAnimation() {
        this.setState({
            animation: Math.floor((Math.random() * 3) + 1)
        })
    }
    render() {
        return (
            <span
                className={this.props.className}
                data-blink-animation={this.state.animation}
                onAnimationIteration={this.changeAnimation.bind(this)}
            />
        )
    }
}

class PageArsenalListDay extends React.Component {
    render() {
        let lastCollection = -1
        const collectionIndexMap = {}
        const collections = []

        db.arsenalDays[this.props.day].forEach(item => {
            const equipment = getEquipment(item[0])
            const improvementIndex = item[1]

            if (!Array.isArray(equipment.improvement) || !equipment.improvement[improvementIndex])
                return null

            let collection
            // console.log(db.equipmentCollections)
            db.equipmentCollections.some(o => {
                o.list.some(l => {
                    if (equipment.type === l.type)
                        collection = o.name
                    return typeof collection !== 'undefined'
                })
                return typeof collection !== 'undefined'
            })
            let index = collectionIndexMap[collection]
            if (lastCollection !== collection && typeof collection !== 'undefined') {
                lastCollection = collection
                if (typeof collectionIndexMap[collection] === 'undefined') {
                    index = collections.length
                    collectionIndexMap[collection] = collections.length
                    collections.push({
                        title: collection,
                        list: []
                    })
                }
                // list.push(
                //     <PageArsenalListTitle key={`title-${collection}`} children={collection} />
                // )
            }

            collections[index].list.push(<PageArsenalListItem
                key={JSON.stringify(item)}
                equipment={equipment}
                improvementIndex={improvementIndex}
                requirements={item[2]}
            />)
        })

        return collections.map(collection => (
            <PageArsenalCollection
                key={`collection-${collection.title}`}
                title={collection.title}
            >
                {collection.list}
            </PageArsenalCollection>
        ))
    }
}

@ImportStyle(require('./styles-collection.less'))
class PageArsenalCollection extends React.Component {
    // constructor() {
    //     super()
    //     this.state = {
    //         show: false
    //     }
    // }
    render() {
        return (
            <div className={this.props.className}>
                <Title
                    component="h2"
                    type="line-append"
                    className={`${this.props.className}-title`}
                    /*
                    className={classNames({
                        [`${this.props.className}-title`]: true,
                        'on': this.state.show
                    })}
                    onClick={() => {
                        this.setState({
                            show: !this.state.show
                        })
                    }}
                    */
                    key={`${this.props.title}-title`}
                    children={this.props.title.split('&').join(' & ')}
                />
                <div
                    /*
                    className={classNames({
                        [`${this.props.className}-list`]: true,
                        'on': this.state.show
                    })}
                    children={this.state.show && this.props.children}
                    */
                    className={`${this.props.className}-list`}
                    children={this.props.children}
                    key={`${this.props.title}-list`}
                />
            </div>
        )
    }
}

@ImportStyle(require('./styles-item.less'))
class PageArsenalListItem extends React.Component {
    render() {
        const {
            className,
            equipment,
            improvementIndex,
            requirements
        } = this.props

        const reqShips = []
        const data = equipment.improvement[improvementIndex]
        const hasUpgrade = Array.isArray(data.upgrade) && data.upgrade.length

        requirements.forEach(index => {
            if (!Array.isArray(data.req) || !data.req[index] || !Array.isArray(data.req[index][1]))
                return
            data.req[index][1].forEach(id => reqShips.push(id))
        })
        const hasReqShips = reqShips.length ? true : false
        const showStar = hasUpgrade && data.upgrade[1] ? true : false

        return (
            <div className={className}>
                <span className={classNames({
                    [className + '-equipment']: true,
                    'has-upgrade': hasUpgrade,
                })}>
                    <LinkEquipment
                        className={`${className}-name color-alt-lighter`}
                        equipment={equipment}
                    />
                </span>
                {hasUpgrade &&
                    <span className={className + '-equipment'}>
                        <LinkEquipment
                            className={`${className}-name color-alt-lighter`}
                            equipment={data.upgrade[0]}
                            children={
                                showStar
                                    ? <ImprovementStar
                                        className={className + '-equipment-star'}
                                        star={data.upgrade[1]}
                                    />
                                    : undefined
                            }
                        />
                    </span>
                }

                <div className={className + '-ships'}>
                    {hasReqShips && (
                        sortShips(reqShips).map(ship => {
                            ship = getShip(ship)
                            return <Link
                                className={`${className}-ships-ship color-alt`}
                                key={ship.id}
                                to={getLink('ship', ship.id)}
                                children={ship.getName(translate('shipname_dash_none'))}
                            />
                        })
                    )}
                    {!hasReqShips && translate('improvement.any_2nd_ship')}
                </div>

                {/*<ImprovementResources
                    data={data}
                />*/}
            </div>
        )
    }
}