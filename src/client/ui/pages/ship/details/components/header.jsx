import React from 'react'
// import { connect } from 'react-redux'
import { Link, IndexLink } from 'react-router'
import classNames from 'Utils/classnames'

import translate, { localeId } from 'sp-i18n'
// import db from 'Logic/database'

import Title from 'UI/components/title.jsx'

import { ImportStyle } from 'sp-css-import'
import styles from './header.less'

// @connect()
@ImportStyle(styles)
export default class ShipDetailsHeader extends React.Component {
    renderTab(tab, index) {
        const url = `/ships/${this.props.ship.id}${index ? `/${tab}` : ''}`
        if (this.props.onTabChange && this.props.currentTab) {
            return (
                <a
                    href={url}
                    className={classNames([
                        'tab', {
                            'on': tab === this.props.currentTab
                        }
                    ])}
                    key={index}
                    onClick={evt => {
                        this.props.onTabChange(tab)
                        evt.preventDefault()
                    }}
                >
                    {translate("ship_details.tabs." + tab)}
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
                    {translate("ship_details.tabs." + tab)}
                </Tag>
            )
        }
    }

    render() {
        return (
            <div className={this.props.className}>

                <div className="infos">
                    <Title tag="h1" className="shipname">{this.props.ship._name}</Title>
                    {localeId !== 'ja' && <span className="shipname-ja">{this.props.ship.getName(undefined, 'ja_jp')}</span>}
                    <span className="shipclassnumber">No.{this.props.ship.getNo()}</span>
                    {localeId === 'ja' && <br />}
                    {this.props.ship.class_no
                        ? translate("shipclass_number", { class: this.props.ship._class, number: this.props.ship.class_no })
                        : translate("shipclass", { class: this.props.ship._class })
                    }
                    {this.props.ship.class && this.props.ship.type && ` / ${this.props.ship._type}`}
                </div>

                {this.props.tabs && <div className="tabs">
                    <div className="wrapper">
                        {this.props.tabs.map(this.renderTab.bind(this))}
                    </div>
                </div>}

            </div>
        )
    }
}