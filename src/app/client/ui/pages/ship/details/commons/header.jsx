import React from 'react'
import { connect } from 'react-redux'
import { Link, IndexLink } from 'react-router'
import classNames from 'classnames'

import translate, { localeId } from 'sp-i18n'
import db from '@appLogic/database'
import {
    changeTab as shipDetailsChangeTab
} from '@appLogic/ship-details/api'

import MainHeader from '@appUI/components/main-header.jsx'
import Title from '@appUI/components/title.jsx'

import { ImportStyle } from 'sp-css-import'
import styles from './header.less'

@connect((state, ownProps) => ({
    ...state.shipDetails[ownProps.ship.id]
}))
@ImportStyle(styles)
export default class ShipDetailsHeader extends React.Component {
    renderTab(tabName, index) {
        const url = `/ships/${this.props.ship.id}${index ? `/${tabName}` : ''}`
        if (this.props.onTabChange) {
            return (
                <a
                    href={url}
                    className={classNames([
                        'tab', {
                            'on': index === this.props.tabIndex
                        }
                    ])}
                    key={index}
                    onClick={evt => {
                        // this.props.onTabChange(tabName, index)
                        this.props.dispatch(shipDetailsChangeTab(this.props.ship.id, index))
                        evt.preventDefault()
                    }}
                >
                    {translate("ship_details." + tabName)}
                </a>
            )
        } else {
            const Tag = index ? Link : IndexLink
            return (
                <Tag
                    to={url}
                    className="tab"
                    activeClassName="on"
                    key={index}
                >
                    {translate("ship_details." + tabName)}
                </Tag>
            )
        }
    }

    getShipType() {
        if (this.props.ship.type && this.props.ship.type_display && this.props.ship.type !== this.props.ship.type_display)
            return db.shipTypes[this.props.ship.type_display]._name + ' (' + this.props.ship._type + ')'
        if (this.props.ship.type)
            return this.props.ship._type
        return ''
    }

    render() {
        const isPortal = __CLIENT__
        const Component = isPortal ? MainHeader : 'div'

        return (
            <Component className={classNames([
                this.props.className, {
                    'is-portal': isPortal
                }
            ])}>

                <div className="infos">
                    <Title tag="h1" className="shipname">{this.props.ship._name}</Title>
                    {localeId !== 'ja' && <span className="shipname-ja">{this.props.ship.getName(undefined, 'ja_jp')}</span>}
                    <span className="shipclassnumber">No.{this.props.ship.getNo()}</span>
                    {localeId === 'ja' && <br />}
                    {this.props.ship.class_no
                        ? translate("shipclass_number", { class: this.props.ship._class, number: this.props.ship.class_no })
                        : translate("shipclass", { class: this.props.ship._class })
                    }
                    {this.props.ship.class && this.props.ship.type && ` / ${this.getShipType()}`}
                </div>

                {this.props.tabs && <div className="tabs">
                    <div className="wrapper">
                        {this.props.tabs.map(this.renderTab.bind(this))}
                    </div>
                </div>}

            </Component>
        )
    }
}