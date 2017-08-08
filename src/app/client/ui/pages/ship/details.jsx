import React from 'react'
import { connect } from 'react-redux'
// import TransitionGroup from 'react-transition-group/TransitionGroup'
// import CSSTransition from 'react-transition-group/CSSTransition'

import translate from 'sp-i18n'
import PageContainer from 'sp-ui-pagecontainer'
import htmlHead from '@appUtils/html-head.js'
import db from '@appLogic/database'
import {
    init as shipDetailsInit,
    reset as shipDetailsReset,
    // changeTab as shipDetailsChangeTab,
    // changeIllust as shipDetailsChangeIllust
} from '@appLogic/ship-details/api.js'

import Header from './details/commons/header.jsx'

import { ImportStyle } from 'sp-css-import'
import style from './details.less'

const tabsAvailable = [
    'infos',
    'capabilities',
    'equipable',
    // 'voicelines',
    // 'availability'
]

const contentComponents = []

if (__CLIENT__)
    tabsAvailable.forEach((tab, index) => {
        contentComponents[index] = require(`./details/${tab}.jsx`).default
    })

const extracFromState = (state) => {
    const pathname = state.routing.locationBeforeTransitions.pathname
    const segs = pathname.split('/')
    const indexShips = segs.indexOf('ships')

    return {
        id: parseInt(segs[indexShips + 1]),
        tab: segs[indexShips + 2] || tabsAvailable[0]
    }
}

const getShipType = ship => {
    // if (ship.type && ship.type_display && ship.type !== ship.type_display)
    //     return db.shipTypes[ship.type_display]._name + ' (' + ship._type + ')'
    if (ship.type_display)
        return db.shipTypes[ship.type_display]._name
    if (ship.type)
        return ship._type
    return ''
}

const getDescription = ship => {
    const getShipType = () => {
        if (ship.type && ship.type_display && ship.type !== ship.type_display)
            return db.shipTypes[ship.type_display]._name + ' (' + ship._type + ')'
        if (ship.type)
            return ship._type
        return ''
    }
    return ship._name
        // 舰级 & 舰种
        + `, ${ship.class_no
            ? translate("shipclass_number", { class: ship._class, number: ship.class_no })
            : translate("shipclass", { class: ship._class })}`
        // 类型
        + `${ship.class && ship.type ? `, ${getShipType()}` : ''}`
        // 军籍
        + ` | ${translate("ship_details.navy")}: ${ship._navyName}`
        // CV
        + `, ${translate("ship_details.cv")}: ${ship._cv}`
        // 画师
        + `, ${translate("ship_details.illustrator")}: ${ship._illustrator}`
}

@connect((state, ownProps) => state.shipDetails[ownProps.params.id])
@ImportStyle(style)
export default class PageShipDetails extends React.Component {
    static onServerRenderStoreExtend(store) {
        const state = store.getState()
        const dispatch = store.dispatch
        const preprocessTasks = []

        const { id, tab } = extracFromState(state)

        preprocessTasks.push(
            dispatch(
                shipDetailsInit(id, {
                    tabIndex: tabsAvailable.indexOf(tab)
                })
            )
        )
        return preprocessTasks
    }
    static onServerRenderHtmlExtend(ext, store) {
        const { id/*, tab*/ } = extracFromState(store.getState())

        const ship = db.ships[id]
        const head = htmlHead({
            store,
            title: ship._name,
            subtitle: (ship.class_no
                ? translate("shipclass_number", { class: ship._class, number: ship.class_no })
                : translate("shipclass", { class: ship._class }))
            + (ship.class && ship.type && ` / ${getShipType(ship)} `),
            description: getDescription(ship)
        })

        ext.metas = ext.metas.concat(head.meta)
        ext.title = head.title// + translate("ship_details." + tab)
    }

    get ship() {
        if (!this._data && this.props.params.id)
            this._data = db.ships[this.props.params.id]
        return this._data || {}
    }

    onTabChange(/*newTab, newTabIndex*/) {
        // if (newTabIndex !== this.props.tabIndex) {
        // console.log(newTabIndex, this.props.tabIndex)
        // this.props.dispatch(
        //     shipDetailsChangeTab(this.props.params.id, newTabIndex)
        // )
        window.scrollTo(undefined, 0)
        // }
    }

    componentWillMount() {
        if (this.props.location.action === 'PUSH' && typeof this.props.tabIndex !== 'undefined')
            this.props.dispatch(shipDetailsReset(this.props.params.id))
    }

    render() {
        // console.log(this.props.tabIndex, this.props.illustIndex)

        // const isLocationPUSH = this.props.location && this.props.location.action === 'PUSH'
        // const tabIndex = __CLIENT__ ? (isLocationPUSH ? 0 : this.props.tabIndex) : undefined

        if (typeof this.props.tabIndex === 'undefined') {
            this.props.dispatch(
                shipDetailsInit(this.props.params.id, {
                    tabIndex: tabsAvailable.indexOf(this.props.params && this.props.params.tab ? this.props.params.tab : tabsAvailable[0])
                })
            )
            if (__CLIENT__) return null
        }

        if (__CLIENT__ && __DEV__)
            console.log('thisShip', this.ship, this.props.tabIndex)

        return (
            <PageContainer className={this.props.className}>
                <Header
                    ship={this.ship}
                    tabs={this.ship.type_display ? tabsAvailable : [tabsAvailable[0]]}
                    onTabChange={__CLIENT__ ? this.onTabChange.bind(this) : undefined}
                />
                <PageShipDetailsBody ship={this.ship}>
                    {this.props.children}
                </PageShipDetailsBody>
            </PageContainer>
        )
    }
}



@connect((state, ownProps) => ({
    // ...state.shipDetails[ownProps.ship.id]
    tabIndex: state.shipDetails[ownProps.ship.id] ? state.shipDetails[ownProps.ship.id].tabIndex : undefined
}))
class PageShipDetailsBody extends React.Component {
    // onIllustChange(newIllustIndex) {
    //     this.illustIndex = newIllustIndex
    //     if (newIllustIndex !== this.props.illustIndex) {
    //         this.props.dispatch(
    //             shipDetailsChangeIllust(this.props.ship.id, newIllustIndex)
    //         )
    //     }
    // }

    // componentWillUnmount() {
    //     this.props.dispatch(
    //         shipDetailsChangeIllust(this.props.ship.id, this.illustIndex)
    //     )
    // }

    render() {
        // const isLocationPUSH = this.props.location && this.props.location.action === 'PUSH'

        if (__CLIENT__ && typeof this.props.tabIndex !== 'undefined')
            return React.createElement(contentComponents[this.props.tabIndex], {
                ship: this.props.ship,
                // illustIndex: this.props.illustIndex,
                // onIllustChange: this.onIllustChange.bind(this)
            })

        if (__SERVER__)
            return React.cloneElement(this.props.children, {
                ship: this.props.ship
            })
    }
}