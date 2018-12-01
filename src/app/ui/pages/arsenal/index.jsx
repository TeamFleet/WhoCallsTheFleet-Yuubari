import React from 'react'
import classNames from 'classnames'
import { extend } from 'koot'

import db from '@database'
// import pref from '@api/preferences'

import htmlHead from '@utils/html-head'
import getTimeJST from '@utils/get-time-jst'
import getLink from '@utils/get-link'
import getShip from '@utils/get-ship'
import getEquipment from '@utils/get-equipment'
import sortShips from '@utils/sort-ships'
// import routerReplace from '@utils/router-replace'

// import {Link, IndexLink} from 'react-router'
import Page from '@ui/containers/page'

import Link from '@ui/components/link'
import LinkEquipment from '@ui/components/link/equipment'
import Title from '@ui/components/title'
import Button from '@ui/components/button'
import MainHeader from '@ui/components/main-header/main-options'
import {
    DayAndShip as ImprovementDayAndShip,
    Resources as ImprovementResources
} from '@ui/components/improvement'
import ImprovementStar from '@ui/components/improvement/star'

const daysArr = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thurday",
    "Friday",
    "Saturday"
]

//

@extend({
    connect: true,
    pageinfo: (state, renderProps) => {
        const day = typeof renderProps.params === 'object' ? renderProps.params.day : undefined
        return htmlHead(state, {
            title: [
                __('nav.arsenal'),
                typeof day !== 'undefined'
                    ? __(`day_full`, daysArr[day])
                    : undefined,
            ]
        })
    },
    styles: require('./styles.less')
})
class PageArsenal extends React.Component {

    state = {
        rendering: true
    }

    componentDidUpdate(prevProps/*, prevState*/) {
        // const prevParams = prevProps.params || {}
        // const params = this.props.params || {}
        if (prevProps.params.day !== this.props.params.day)
            window.scrollTo(undefined, 0)
    }

    onRender() {
        // if (!this.state.rendering)
        this.setState({
            rendering: false
        })
    }

    render() {
        const day = typeof this.props.params === 'object' && typeof this.props.params.day !== 'undefined'
            ? this.props.params.day
            : -1
        // console.log(db)
        // console.log('[PageArsenal] render')
        return (
            <Page
                className={this.props.className}
                pathname={this.props.location.pathname}
                rendering={this.state.rendering}
            // location={this.props.location}
            // params={this.props.params}
            // route={this.props.route}
            // routeParams={this.props.routeParams}
            // router={this.props.router}
            // routes={this.props.routes}
            >
                <PageArsenalHeader isDay={typeof this.props.params === 'object' && typeof this.props.params.day !== 'undefined'} />

                {day > -1 && <PageArsenalListDay day={day} onRender={this.onRender.bind(this)} />}
                {day === -1 && <PageArsenalListAll onRender={this.onRender.bind(this)} />}
            </Page>
        )
    }
}
export default PageArsenal

//

const PageArsenalHeader = extend({
    styles: require('./styles-header.less')
})(
    (props) => {
        const jst = getTimeJST()
        const jstDay = jst.getDay()
        return <MainHeader
            className={classNames({
                [props.className]: true,
                // 'is-options-show': props.isModeFilter,
            })}

            mainClassName={props.className + "-tabs"}
            main={[
                <PageArsenalHeaderAkashi className={props.className + "-akashi"} key="akashi" />,
                <Link
                    key="today"
                    href={`/arsenal/${jstDay}`}
                    replace={true}
                    className={classNames(['tab', "link-today"])}
                    children={__(`arsenal.filter_by_day`)}
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
                        children={__(`day_abbr`, day)}
                    />
                )),
                <Link
                    key="all"
                    href={`/arsenal`}
                    replace={true}
                    className={classNames({
                        tab: true,
                        'link-all': true,
                        'on': !props.isDay
                    })}
                    children={__(`arsenal.all`)}
                />
            ]}
        />
    }
)

//

class PageArsenalHeaderAkashi extends React.Component {
    state = {
        animation: Math.floor((Math.random() * 3) + 1)
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

//

const PageArsenalList = (props) =>
    props.collections.map((collection, index) => (
        <PageArsenalCollection
            key={`collection-${collection.title}`}
            title={collection.title}
            index={index}
            onRender={() => {
                if (typeof props.onRender === 'function' &&
                    index >= props.collections.length - 1
                )
                    props.onRender(this)
            }}
        >
            {collection.list}
        </PageArsenalCollection>
    ))

//

const PageArsenalListDay = (props) => {
    // console.log('[PageArsenalListDay] render')

    let lastCollection = -1
    const collectionIndexMap = {}
    const collections = []

    db.arsenalDays[props.day].forEach((item, _index) => {
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
            index={_index}
        />)
    })

    return (
        <PageArsenalList collections={collections} {...props} />
    )
}

//

const PageArsenalListAll = (props) => {
    // console.log('[PageArsenalListAll] render')

    let lastCollection = -1
    const collectionIndexMap = {}
    const collections = []

    db.arsenalAll.forEach(item => {
        const equipment = getEquipment(item)

        if (!Array.isArray(equipment.improvement) || !equipment.improvement.length)
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

        equipment.improvement.forEach((improvement, _index) => {
            collections[index].list.push(
                <PageArsenalListItem
                    key={item + '-' + _index}
                    equipment={equipment}
                    improvementIndex={_index}
                    index={_index}
                />
            )
        })
    })

    return (
        <PageArsenalList collections={collections} {...props} />
    )
}

//

@extend({
    styles: require('./styles-collection.less')
})
class PageArsenalCollection extends React.Component {
    // rendered = false
    // mouted = false

    constructor(props) {
        super(props)
        const render = __SERVER__ || (props.index === 0) || (__CLIENT__ && !self.isAppReady)
        this.state = {
            render,
            // show: false
        }
        if (!render) {
            setTimeout(() => {
                if (!this.mounted) return
                this.setState({
                    render: true
                })
                if (typeof props.onRender === 'function')
                    props.onRender(this)
            }, 20 * (props.index || 0))
        } else if (typeof props.onRender === 'function') {
            props.onRender(this)
        }
    }

    componentDidMount() {
        this.mounted = true
    }

    componentWillUnmount() {
        this.mounted = false
    }

    render() {
        if (!this.state.render) return null
        // console.log(this.props.index, this.state.render)
        return (
            <div className={this.props.className}>
                <Title
                    component="h2"
                    type="line-append"
                    className={`${this.props.className}-title`}
                    inherit={true}
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
                    children={this.state.render ? this.props.children : undefined}
                    key={`${this.props.title}-list`}
                />
            </div>
        )
    }
}

//

@extend({
    styles: require('./styles-item.less')
})
class PageArsenalListItem extends React.Component {
    state = {
        // render: __SERVER__ || (props.index === 0) || (__CLIENT__ && !self.isAppReady),
        expand: false
    }
    // componentWillMount() {
    //     if (!this.state.render)
    //         setTimeout(() => {
    //             this.setState({
    //                 render: true
    //             })
    //         }, 1 * (this.props.index || 0))
    // }
    render() {
        // if (!this.state.render) return null

        const {
            className,
            equipment,
            improvementIndex,
            requirements
        } = this.props

        const reqShips = []
        const data = equipment.improvement[improvementIndex]
        const hasUpgrade = Array.isArray(data.upgrade) && data.upgrade.length
        const showReqShips = Array.isArray(requirements)

        if (showReqShips) {
            requirements.forEach(index => {
                if (!Array.isArray(data.req) || !data.req[index] || !Array.isArray(data.req[index][1]))
                    return
                data.req[index][1].forEach(id => reqShips.push(id))
            })
        }
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

                {showReqShips &&
                    <div className={className + '-ships'}>
                        {hasReqShips && (
                            sortShips(reqShips).map(ship => {
                                ship = getShip(ship)
                                return <Link
                                    className={`${className}-ships-ship color-alt`}
                                    key={ship.id}
                                    to={getLink('ship', ship.id)}
                                    children={ship.getName(__('shipname_dash_none'))}
                                />
                            })
                        )}
                        {!hasReqShips && __('improvement.any_2nd_ship')}
                    </div>
                }

                {!showReqShips &&
                    <ImprovementDayAndShip className={className + '-day-and-ships'} data={data} />
                }

                <div className={className + '-resources'}>
                    <Button
                        className={classNames({
                            [className + '-resources-toggle']: true,
                            'is-expand': this.state.expand,
                        })}
                        onClick={() => {
                            this.setState({
                                expand: !this.state.expand
                            })
                        }}
                        //children={!this.state.expand ? __('arsenal.resources_toggle') : undefined}
                        children={!this.state.expand ? "..." : undefined}
                        data-role="toggle"
                    />
                    {this.state.expand &&
                        <ImprovementResources
                            data={data}
                        />
                    }
                </div>
            </div>
        )
    }
}
