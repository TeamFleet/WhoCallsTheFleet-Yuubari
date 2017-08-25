import React from 'react'
import { connect } from 'react-redux'

// import translate from 'sp-i18n'
import PageContainer from 'sp-ui-pagecontainer'
import htmlHead from '@appUtils/html-head.js'
import db from '@appLogic/database'
import {
    init as equipmentDetailsInit,
    reset as equipmentDetailsReset,
    // changeTab as equipmentDetailsChangeTab,
    // changeIllust as equipmentDetailsChangeIllust
} from '@appLogic/equipment-details/api.js'

import Header from './details/commons/header.jsx'

import { ImportStyle } from 'sp-css-import'
import style from './details.less'

const tabsAvailable = [
    'infos',
    'refittable',
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

@connect((state, ownProps) => state.equipmentDetails[ownProps.params.id] || {})
@ImportStyle(style)
export default class extends React.Component {
    static onServerRenderStoreExtend(store) {
        const state = store.getState()
        const dispatch = store.dispatch
        const preprocessTasks = []

        const { id, tab } = extracFromState(state)

        preprocessTasks.push(
            dispatch(
                equipmentDetailsInit(id, {
                    tabIndex: tabsAvailable.indexOf(tab)
                })
            )
        )
        return preprocessTasks
    }
    static onServerRenderHtmlExtend(ext, store) {
        const { id/*, tab*/ } = extracFromState(store.getState())

        const equipment = db.equipments[id]
        const obj = {
            store
        }
        if (equipment) {
            obj.title = equipment._name
            obj.subtitle = equipment.type ? equipment._type : ''
            obj.description = getDescription(equipment)
        }
        const head = htmlHead(obj)

        ext.metas = ext.metas.concat(head.meta)
        ext.title = head.title// + translate("ship_details." + tab)
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

    componentWillMount() {
        if (this.props.location.action === 'PUSH' && typeof this.props.tabIndex !== 'undefined')
            this.props.dispatch(equipmentDetailsReset(this.props.params.id))
    }

    render() {
        if (typeof this.props.tabIndex === 'undefined') {
            this.props.dispatch(
                equipmentDetailsInit(this.props.params.id, {
                    tabIndex: tabsAvailable.indexOf(this.props.params && this.props.params.tab ? this.props.params.tab : tabsAvailable[0])
                })
            )
            if (__CLIENT__) return null
        }

        if (!this.equipment) return null

        if (__CLIENT__ && __DEV__)
            console.log('thisEquipment', this.equipment, this.props.tabIndex)

        return (
            <PageContainer className={this.props.className}>
                <Header
                    equipment={this.equipment}
                    tabs={tabsAvailable}
                    onTabChange={__CLIENT__ ? this.onTabChange.bind(this) : undefined}
                />
                <PageEquipmentDetailsBody equipment={this.equipment}>
                    {this.props.children}
                </PageEquipmentDetailsBody>
            </PageContainer>
        )
    }
}



@connect((state, ownProps) => ({
    tabIndex: state.equipmentDetails[ownProps.equipment.id] ? state.equipmentDetails[ownProps.equipment.id].tabIndex : undefined
}))
class PageEquipmentDetailsBody extends React.Component {
    render() {
        if (__CLIENT__ && typeof this.props.tabIndex !== 'undefined')
            return React.createElement(contentComponents[this.props.tabIndex], {
                equipment: this.props.equipment,
                // illustIndex: this.props.illustIndex,
                // onIllustChange: this.onIllustChange.bind(this)
            })

        if (__SERVER__)
            return React.cloneElement(this.props.children, {
                equipment: this.props.equipment
            })
    }
}