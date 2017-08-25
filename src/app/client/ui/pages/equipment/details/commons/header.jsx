import React from 'react'
import { connect } from 'react-redux'

import translate, { localeId } from 'sp-i18n'
// import db from '@appLogic/database'
import {
    changeTab as equipmentDetailsChangeTab
} from '@appLogic/equipment-details/api'
import getLink from '@appUtils/get-link'

import Header from '@appUI/containers/infos-header'

import { ImportStyle } from 'sp-css-import'
import styles from './header.less'

@connect((state, ownProps) => state.equipmentDetails[ownProps.equipment.id] || {})
@ImportStyle(styles)
export default class EquipmentDetailsHeader extends React.Component {
    onTabChange(tabId, tabIndex) {
        if (typeof this.props.onTabChange === 'function')
            this.props.onTabChange(tabId, tabIndex)
        this.props.dispatch(equipmentDetailsChangeTab(this.props.equipment.id, tabIndex))
    }

    getTabs() {
        if (!Array.isArray(this.props.tabs)) return []
        return this.props.tabs.map(tabId => ({
            tabId,
            tabName: translate("equipment_details." + tabId)
        }))
    }

    render() {
        if (!this.props.equipment) return null

        return (
            <Header
                className={this.props.className}
                title={this.props.equipment._name}
                tabs={this.getTabs()}
                urlBase={getLink('equipment', this.props.equipment.id)}
                currentIndex={this.props.tabIndex}
                onTabChange={this.onTabChange.bind(this)}
            >
                {localeId !== 'ja' && <span className="name-ja">{this.props.equipment.getName(undefined, 'ja_jp')}</span>}
                <span className="number">No.{this.props.equipment.id}</span>
                {localeId === 'ja' && <br />}
                {this.props.equipment._type}
            </Header>
        )
    }
}