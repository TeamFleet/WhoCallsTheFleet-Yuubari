import React from 'react'

import translate from 'sp-i18n'
import db, { locale as dbLocaleId } from 'Logic/database'

import MainHeader from 'UI/components/main-header.jsx'
import Icon from 'UI/components/icon.jsx'

import { ImportStyle } from 'sp-css-import'
import styleHeader from './header.less'

@ImportStyle(styleHeader)
export default class ShipListHeader extends React.Component {
    render() {
        return (
            <MainHeader>
                <div className={this.props.className + (this.props.filtering ? ' is-filtering' : '')}>
                    <Filter callbacks={this.props.callbacks} />
                    <Tabs collection={this.props.collection} callbacks={this.props.callbacks} />
                </div>
            </MainHeader>
        )
    }
}

import styleHeaderTabs from './header-tabs.less'
@ImportStyle(styleHeaderTabs)
class Tabs extends React.Component {
    onSelectChange(evt) {
        this.props.callbacks.onCollectionChange(evt, parseInt(evt.target.value))
    }
    render() {
        return (
            <div className={this.props.className}>
                <label className="select">
                    <select className="select-select" onChange={this.onSelectChange.bind(this)} value={this.props.collection}>
                        {db.shipCollections.map((collection, index) => (
                            <option
                                key={index}
                                value={index}
                            >
                                {collection.name[dbLocaleId]}
                            </option>
                        ))}
                    </select>
                    {this.props.collection > -1 && db.shipCollections[this.props.collection].name[dbLocaleId]}
                </label>
                {db.shipCollections.map((collection, index) => (
                    <TabItem
                        key={index}
                        className={this.props.collection === index ? ' on' : ''}
                        collection={index}
                        callbacks={this.props.callbacks}
                    >
                        {collection.name[dbLocaleId]}
                    </TabItem>
                ))}
            </div>
        )
    }
}

class TabItem extends React.Component {
    onClick(evt) {
        this.props.callbacks.onCollectionChange(evt, this.props.collection)
    }

    render() {
        return (
            <a href="javascript:;"
                onClick={this.onClick.bind(this)}
                className={'item' + this.props.className}
            >
                {this.props.children}
            </a>
        )
    }
}

import styleHeaderFilter from './header-filter.less'
@ImportStyle(styleHeaderFilter)
class Filter extends React.Component {
    onInput(evt) {
        this.props.callbacks.onFilterInput(evt)
    }

    onFocus() {
        this.props.callbacks.enterFilter()
    }

    onBlur(evt) {
        if (evt.target.value === '')
            this.props.callbacks.leaveFilter()
    }

    onCloseClick(/*evt*/) {
        this.el.value = ""
        this.el.dispatchEvent(new Event('input', { bubbles: true }))
        this.el.dispatchEvent(new Event('blur', { bubbles: true }))
        // evt.currentTarget.dispatchEvent(new Event('blur', { bubbles: true }))
    }

    render() {
        return (
            <div className={this.props.className}>
                <Icon className="icon-search" icon="search" />
                <button className="close" onClick={this.onCloseClick.bind(this)}><Icon className="icon-close" icon="cross" /></button>
                <input
                    className="input"
                    type="text"
                    placeholder={translate('ship_list.filter.placeholder')}
                    onInput={this.onInput.bind(this)}
                    onFocus={this.onFocus.bind(this)}
                    onBlur={this.onBlur.bind(this)}
                    ref={(c) => this.el = c}
                />
            </div>
        )
    }
}