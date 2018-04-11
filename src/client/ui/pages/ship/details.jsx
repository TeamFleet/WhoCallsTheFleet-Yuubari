import React from 'react'
import { connect } from 'react-redux'
// import TransitionGroup from 'react-transition-group/TransitionGroup'
// import CSSTransition from 'react-transition-group/CSSTransition'

import translate from 'sp-i18n'
import InfosPageContainer from '@appUI/containers/infos-page'
import htmlHead from '@appUtils/html-head.js'
import db from '@appLogic/database'
import {
    init as shipDetailsInit,
    reset as shipDetailsReset,
    //     TABINDEX
} from '@appLogic/pages'

import Header from './details/commons/header.jsx'

// import { ImportStyle } from 'sp-css-import'

const tabsAvailable = [
    'infos',
    'capabilities',
    'equipable',
    // 'voicelines',
    // 'availability'
]

const contentComponents = {}
tabsAvailable.forEach((tab, index) => {
    contentComponents[!index ? 'index' : tab] = require(`./details/${tab}.jsx`).default
})


const extractFromState = (state) => {
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
            // return db.shipTypes[ship.type_display]._name + ' (' + ship._type + ')'
            return db.shipTypes[ship.type_display]._name
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
        + `, ${translate("seiyuu")}: ${ship._cv}`
        // 画师
        + `, ${translate("artist")}: ${ship._illustrator}`
}

export const getInfosId = id => `SHIP_${id}`

// @connect((state, ownProps) => state.pages[getInfosId(ownProps.params.id)] || {})
// @ImportStyle(style)
@connect()
export default class PageShipDetails extends React.Component {
    static onServerRenderHtmlExtend(ext, store) {
        const { id, tab } = extractFromState(store.getState())

        const ship = db.ships[id]
        const obj = {
            store
        }
        if (ship) {
            // const textTab = tab === tabsAvailable[0] ? '' : ` / ${translate("ship_details." + tab)}`
            obj.title = [
                ship._name,
                tab === tabsAvailable[0] ? undefined : translate("ship_details." + tab)
            ]
            obj.subtitle = getShipType(ship)
                + (ship.class || ship.class_no ? ' / ' : '')
                + (ship.class_no
                    ? translate("shipclass_number", { class: ship._class, number: ship.class_no })
                    : translate("shipclass", { class: ship._class }))
            obj.description = getDescription(ship)
        }
        const head = htmlHead(obj)

        ext.metas = ext.metas.concat(head.meta)
        ext.title = head.title
    }

    get ship() {
        if (!this._data && this.props.params.id)
            this._data = db.ships[this.props.params.id]
        return this._data || undefined
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

    componentDidMount() {
        this.props.dispatch(
            shipDetailsInit(
                getInfosId(this.props.params.id),
                {}
            )
        )
    }

    componentWillMount() {
        if (this.props.location.action === 'PUSH')
            this.props.dispatch(
                shipDetailsReset(getInfosId(this.props.params.id))
            )
    }

    render() {
        // console.log(this.props.tabIndex, this.props.illustIndex)

        if (!this.ship) return null

        const currentTab = this.props.params.tab || 'index'

        if (__CLIENT__ && __DEV__)
            console.log('thisShip', currentTab, this.ship)

        return (
            <InfosPageContainer className={this.props.className}>
                <Header
                    ship={this.ship}
                    tabs={this.ship.type_display ? tabsAvailable : [tabsAvailable[0]]}
                    defaultTabIndex={tabsAvailable.indexOf(
                        this.props.params && this.props.params.tab ? this.props.params.tab : tabsAvailable[0]
                    )}
                    onTabChange={__CLIENT__ ? this.onTabChange.bind(this) : undefined}
                />
                <PageShipDetailsBody
                    ship={this.ship}
                    tab={currentTab}
                >
                    {this.props.children}
                </PageShipDetailsBody>
            </InfosPageContainer>
        )
    }
}



class PageShipDetailsBody extends React.Component {
    render() {
        if (!this.props.tab) return null
        return React.createElement(contentComponents[this.props.tab], {
            ship: this.props.ship
        })

        // if (!this.props.children) return null
        // return React.cloneElement(this.props.children, {
        //     ship: this.props.ship
        // })
    }
}