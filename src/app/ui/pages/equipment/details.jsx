import React from 'react'
import { extend } from 'koot'

import htmlHead from '@utils/html-head'
import db from '@database'
// import {
//     init as equipmentDetailsInit,
//     reset as equipmentDetailsReset,
//     TABINDEX
// } from '@api/pages'

import InfosPageContainer from '@ui/containers/infos-page'
import Header from './details/commons/header.jsx'

// import { ImportStyle } from 'sp-css-import'
// import style from './details.less'





// ============================================================================






const tabsAvailable = [
    'infos',
    'refittable',
    'bonuses'
    // 'availability'
]

const contentComponents = {}
tabsAvailable.forEach((tab, index) => {
    contentComponents[!index ? 'index' : tab] = require(`./details/${tab}.jsx`).default
})

// export const getInfosId = id => `EQUIPMENT_${id}`





// ============================================================================






// @connect((state, ownProps) => state.pages[getInfosId(ownProps.params.id)] || {})
// @ImportStyle(style)
@extend({
    connect: true,
    pageinfo: (state, renderProps) => {
        const id = typeof renderProps.params === 'object' ? renderProps.params.id : undefined
        const tab = typeof renderProps.params === 'object' ? renderProps.params.tab : undefined

        if (typeof id === 'undefined')
            return {}

        const equipment = db.equipments[id]

        if (!equipment) return {}

        const name = equipment._name

        return htmlHead(state, {
            title: [
                name,
                typeof tab === 'undefined' || tab === tabsAvailable[0]
                    ? undefined
                    : __("equipment_details", tab)
            ],
            subtitle: equipment.type ? equipment._type : '',
            description: (
                name
                // 类型
                + `${equipment.type ? `, ${equipment._type}` : ''}`
            ),
        })
    }
})
class PageEquipmentDetails extends React.Component {

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





// ============================================================================






const PageEquipmentDetailsBody = ({ tab, equipment }) => {
    if (!tab) return null
    return React.createElement(contentComponents[tab], {
        equipment: equipment
    })

    // if (!this.props.children) return null
    // return React.cloneElement(this.props.children, {
    //     equipment: this.props.equipment
    // })
}





// ============================================================================






export default PageEquipmentDetails
