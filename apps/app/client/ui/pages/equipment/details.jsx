import React from 'react'
import { connect } from 'react-redux'

import translate from 'sp-i18n'
import InfosPageContainer from '@appUI/containers/infos-page'
import htmlHead from '@appUtils/html-head.js'
import db from '@appLogic/database'
// import {
//     init as equipmentDetailsInit,
//     reset as equipmentDetailsReset,
//     TABINDEX
// } from '@appLogic/infospage/api.js'

import Header from './details/commons/header.jsx'

// import { ImportStyle } from 'sp-css-import'
// import style from './details.less'

const tabsAvailable = [
    'infos',
    'refittable',
    // 'availability'
]

const contentComponents = {}
tabsAvailable.forEach((tab, index) => {
    contentComponents[!index ? 'index' : tab] = require(`./details/${tab}.jsx`).default
})

const extractFromState = (state) => {
    const pathname = state.routing.locationBeforeTransitions.pathname
    const segs = pathname.split('/')
    const indexEquipments = segs.indexOf('equipments')

    return {
        id: parseInt(segs[indexEquipments + 1]),
        tab: segs[indexEquipments + 2] || tabsAvailable[0]
    }
}

const getDescription = equipment => {
    return equipment._name
        // 类型
        + `${equipment.type ? `, ${equipment._type}` : ''}`
}

// export const getInfosId = id => `EQUIPMENT_${id}`

// @connect((state, ownProps) => state.infosPage[getInfosId(ownProps.params.id)] || {})
// @ImportStyle(style)
@connect()
export default class extends React.Component {
    static onServerRenderHtmlExtend(ext, store) {
        const { id, tab } = extractFromState(store.getState())

        const equipment = db.equipments[id]
        const obj = {
            store
        }
        if (equipment) {
            obj.title = [
                equipment._name,
                tab === tabsAvailable[0] ? undefined : translate("equipment_details." + tab)
            ]
            obj.subtitle = equipment.type ? equipment._type : ''
            obj.description = getDescription(equipment)
        }
        const head = htmlHead(obj)

        ext.metas = ext.metas.concat(head.meta)
        ext.title = head.title
    }

    get equipment() {
        if (!this._data && this.props.params.id)
            this._data = db.equipments[this.props.params.id]
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

    render() {
        if (!this.equipment) return null

        const currentTab = this.props.params.tab || 'index'

        if (__CLIENT__ && __DEV__)
            console.log('thisEquipment', currentTab, this.equipment)

        return (
            <InfosPageContainer className={this.props.className}>
                <Header
                    equipment={this.equipment}
                    tabs={tabsAvailable}
                    defaultTabIndex={tabsAvailable.indexOf(
                        this.props.params && this.props.params.tab ? this.props.params.tab : tabsAvailable[0]
                    )}
                    onTabChange={__CLIENT__ ? this.onTabChange.bind(this) : undefined}
                />
                <PageEquipmentDetailsBody
                    equipment={this.equipment}
                    tab={currentTab}
                >
                    {this.props.children}
                </PageEquipmentDetailsBody>
            </InfosPageContainer>
        )
    }
}



class PageEquipmentDetailsBody extends React.Component {
    render() {
        if (!this.props.tab) return null
        return React.createElement(contentComponents[this.props.tab], {
            equipment: this.props.equipment
        })

        // if (!this.props.children) return null
        // return React.cloneElement(this.props.children, {
        //     equipment: this.props.equipment
        // })
    }
}