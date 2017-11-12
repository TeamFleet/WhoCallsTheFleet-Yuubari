import React from 'react'
import { connect } from 'react-redux'

import translate from 'sp-i18n'
import db from '@appLogic/database'
// import bindEvent from 'bind-event'
import {
    changeCollection
} from '@appLogic/equipment-list/api.js'
// import classNames from 'classnames'

import MainHeader from '@appUI/components/main-header.jsx'
// import Icon from '@appUI/components/icon.jsx'
// import Button from '@appUI/components/button.jsx'
// import ButtonGroup from '@appUI/components/button-group.jsx'
import TableHeader from './table-header.jsx'

import { ImportStyle } from 'sp-css-import'
import styleHeader from './header.less'

// @connect((state, ownProps) => state.equipmentList[ownProps.id] || {})
@ImportStyle(styleHeader)
export default class EquipmentListHeader extends React.Component {
    render() {
        return (
            <MainHeader className={this.props.className}>
                <Tabs id={this.props.id} />
                <TableHeader id={this.props.id} />
            </MainHeader>
        )
    }
}

import styleHeaderTabs from './header-tabs.less'
@connect((state, ownProps) => ({
    collection: state.equipmentList[ownProps.id].collection
}))
@ImportStyle(styleHeaderTabs)
class Tabs extends React.Component {
    onTabClick(collection) {
        this.props.dispatch(
            changeCollection(this.props.id, collection)
        )
    }
    render() {
        return (
            <div className={this.props.className}>
                {db.equipmentCollections.map((collection, index) => (
                    <span
                        key={index}
                        className={'link item' + (this.props.collection === index ? ' on' : '')}
                        data-tab-index={index + 1}
                        onClick={() => {
                            this.onTabClick(index)
                        }}
                    >
                        <span className="name"
                            dangerouslySetInnerHTML={{
                                __html: collection.name.split('&').join('<br>')
                            }}
                        />
                    </span>
                ))}
            </div>
        )
    }
}