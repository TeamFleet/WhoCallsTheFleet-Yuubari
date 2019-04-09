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
import Header from './details/commons/header'





// ============================================================================






const tabsAvailable = [
    'infos',
    'bonuses',
    'refittable'
    // 'availability'
]

const contentComponents = {}
tabsAvailable.forEach((tab, index) => {
    contentComponents[!index ? 'index' : tab] = require(`./details/${tab}.jsx`).default
})

// export const getInfosId = id => `EQUIPMENT_${id}`





// ============================================================================






const PageEquipmentDetails = extend({
    // connect: true,
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
})(
    ({
        params = {},
        className,
        children
    }) => {
        if (!params || !params.id) return null

        const thisEquipment = db.equipments[params.id]
        const currentTab = params.tab || 'index'

        if (__CLIENT__ && __DEV__)
            console.log('thisEquipment', currentTab, thisEquipment)

        return (
            <InfosPageContainer className={className}>
                <Header
                    equipment={thisEquipment}
                    tabs={tabsAvailable}
                    defaultTabIndex={tabsAvailable.indexOf(
                        params.tab ? params.tab : tabsAvailable[0]
                    )}
                    onTabChange={() => window.scrollTo(undefined, 0)}
                />
                <PageEquipmentDetailsBody
                    equipment={thisEquipment}
                    tab={currentTab}
                >
                    {children}
                </PageEquipmentDetailsBody>
            </InfosPageContainer>
        )
    }
)





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
