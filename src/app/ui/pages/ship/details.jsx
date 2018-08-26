import React from 'react'
import { connect } from 'react-redux'
// import TransitionGroup from 'react-transition-group/TransitionGroup'
// import CSSTransition from 'react-transition-group/CSSTransition'
import { pageinfo } from 'koot'

import htmlHead from '@utils/html-head'
import db from '@api/database'
import {
    init as shipDetailsInit,
    reset as shipDetailsReset,
    //     TABINDEX
} from '@api/pages'

import Header from './details/commons/header.jsx'
import InfosPageContainer from '@ui/containers/infos-page'

// import { ImportStyle } from 'sp-css-import'

const tabsAvailable = [
    'infos',
    'capabilities',
    'equipable',
    'bonuses'
    // 'voicelines',
    // 'availability'
]

const contentComponents = {}
tabsAvailable.forEach((tab, index) => {
    contentComponents[!index ? 'index' : tab] = require(`./details/${tab}.jsx`).default
})

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
            ? __("shipclass_number", { class: ship._class, number: ship.class_no })
            : __("shipclass", { class: ship._class })}`
        // 类型
        + `${ship.class && ship.type ? `, ${getShipType()}` : ''}`
        // 军籍
        + ` | ${__("ship_details.navy")}: ${ship._navyName}`
        // CV
        + `, ${__("seiyuu")}: ${ship._cv}`
        // 画师
        + `, ${__("artist")}: ${ship._illustrator}`
}

export const getInfosId = id => `SHIP_${id}`

// @connect((state, ownProps) => state.pages[getInfosId(ownProps.params.id)] || {})
// @ImportStyle(style)
@connect()
@pageinfo((state, renderProps) => {
    const id = typeof renderProps.params === 'object' ? renderProps.params.id : undefined
    const tab = typeof renderProps.params === 'object' ? renderProps.params.tab : undefined

    if (typeof id === 'undefined')
        return {}

    const ship = db.ships[id]

    return htmlHead({
        title: [
            ship._name,
            typeof tab === 'undefined' || tab === tabsAvailable[0]
                ? undefined
                : __("ship_details", tab)
        ],
        subtitle: getShipType(ship)
            + (ship.class || ship.class_no ? ' / ' : '')
            + (ship.class_no
                ? __("shipclass_number", { class: ship._class, number: ship.class_no })
                : __("shipclass", { class: ship._class })),
        description: getDescription(ship),
    })
})
export default class PageShipDetails extends React.Component {

    constructor(props) {
        super(props)

        if (props.location.action === 'PUSH')
            props.dispatch(
                shipDetailsReset(getInfosId(props.params.id))
            )
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
