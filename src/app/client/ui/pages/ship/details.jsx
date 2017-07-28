import React from 'react'
import { connect } from 'react-redux'
// import TransitionGroup from 'react-transition-group/TransitionGroup'
// import CSSTransition from 'react-transition-group/CSSTransition'

import translate from 'sp-i18n'
import PageContainer from 'sp-ui-pagecontainer'
import htmlHead from '@appUtils/html-head.js'
import db from '@appLogic/database'

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

const contentComponents = {}

if (__CLIENT__)
    tabsAvailable.forEach(tab => {
        contentComponents[tab] = require(`./details/${tab}.jsx`).default
    })

const sessionVarsDefaults = {
    illustIndex: 0
}
const sessionVars = {}

const getShipType = ship => {
    // if (ship.type && ship.type_display && ship.type !== ship.type_display)
    //     return db.shipTypes[ship.type_display]._name + ' (' + ship._type + ')'
    if (ship.type_display)
        return db.shipTypes[ship.type_display]._name
    if (ship.type)
        return ship._type
    return ''
}

@connect()
@ImportStyle(style)
export default class extends React.Component {
    static onServerRenderHtmlExtend(ext, store) {
        const ship = db.ships[store.getState().routing.locationBeforeTransitions.pathname.split('/')[2]]
        const head = htmlHead({
            store,
            title: ship._name,
            subtitle: (ship.class_no
                ? translate("shipclass_number", { class: ship._class, number: ship.class_no })
                : translate("shipclass", { class: ship._class }))
            + (ship.class && ship.type && ` / ${getShipType(ship)}`)
        })

        ext.metas = ext.metas.concat(head.meta)
        ext.title = head.title
    }

    constructor(props) {
        super()

        this.state = {
            tab: __CLIENT__ && props.params && props.params.tab ? props.params.tab : tabsAvailable[0]
        }
    }

    get ship() {
        if (!this._data && this.props.params.id)
            this._data = db.ships[this.props.params.id]
        return this._data || {}
    }

    onTabChange(newTab) {
        if (newTab !== this.state.tab) {
            this.setState({
                tab: newTab
            })
            window.scrollTo(undefined, 0)
        }
    }

    // componentWillUnmount() {
    //     delete sessionVars[this.ship.id]
    // }

    render() {
        if (__CLIENT__ && __DEV__)
            console.log('thisShip', this.ship)
        if (__CLIENT__ && typeof sessionVars[this.ship.id] === 'undefined')
            sessionVars[this.ship.id] = Object.assign({}, sessionVarsDefaults)
        return (
            <PageContainer className={this.props.className}>
                <Header
                    ship={this.ship}
                    tabs={this.ship.type_display ? tabsAvailable : [tabsAvailable[0]]}
                    onTabChange={__CLIENT__ && this.onTabChange.bind(this)}
                    currentTab={__CLIENT__ && this.state.tab}
                />
                {__CLIENT__
                    ? React.createElement(contentComponents[this.state.tab], {
                        ship: this.ship,
                        illustIndex: sessionVars[this.ship.id].illustIndex,
                        onIllustChange: index => { sessionVars[this.ship.id].illustIndex = index }
                    })
                    : React.cloneElement(this.props.children, {
                        ship: this.ship
                    })
                }
            </PageContainer>
        )
        // return (
        //     <TransitionGroup
        //         component={PageContainer}
        //         className={this.props.className}
        //         id="page-container-body"
        //     >
        //         <Header
        //             ship={this.ship}
        //             tabs={tabsAvailable}
        //             onTabChange={__CLIENT__ && this.onTabChange.bind(this)}
        //             currentTab={__CLIENT__ && this.state.tab}
        //         />
        //         {__CLIENT__
        //             ? (
        //                 <CSSTransition
        //                     key={this.state.tab}
        //                     classNames="ship-details-transition"
        //                     timeout={200}
        //                 >
        //                     {React.createElement(contentComponents[this.state.tab], {
        //                         ship: this.ship,
        //                         illustIndex: sessionVars[this.ship.id].illustIndex,
        //                         onIllustChange: index => { sessionVars[this.ship.id].illustIndex = index }
        //                     })}
        //                 </CSSTransition>
        //             )
        //             : React.cloneElement(this.props.children, {
        //                 ship: this.ship
        //             })
        //         }
        //     </TransitionGroup>
        // )
    }
}