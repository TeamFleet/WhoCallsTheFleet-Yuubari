import React from 'react'
import { connect } from 'react-redux'

import translate from 'sp-i18n'
import PageContainer from 'sp-ui-pagecontainer'
import htmlHead from 'Utils/html-head.js'
import db from 'Logic/database'

import Header from './details/components/header.jsx'

import { ImportStyle } from 'sp-css-import'
import style from './details.less'

const tabsAvailable = [
    'infos',
    'equipable',
    'voicelines',
    'availability'
]

@connect()
@ImportStyle(style)
export default class extends React.Component {
    static htmlExtends(ext, store) {
        const head = htmlHead({
            store,
            title: db.ships[store.getState().routing.locationBeforeTransitions.pathname.split('/')[2]]._name
        })

        ext.meta = ext.meta.concat(head.meta)
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
        if (newTab !== this.state.tab)
            this.setState({
                tab: newTab
            })
    }

    render() {
        if (__CLIENT__ && __DEV__) console.log('thisShip', this.ship)
        return (
            <PageContainer className={this.props.className}>
                <Header
                    ship={this.ship}
                    tabs={tabsAvailable}
                    onTabChange={__CLIENT__ && this.onTabChange.bind(this)}
                    currentTab={__CLIENT__ && this.state.tab}
                />
                {__CLIENT__
                    ? React.createElement(require(`./details/${this.state.tab}.jsx`).default, {
                        ship: this.ship
                    })
                    : React.cloneElement(this.props.children, {
                        ship: this.ship
                    })
                }
            </PageContainer>
        )
    }
}