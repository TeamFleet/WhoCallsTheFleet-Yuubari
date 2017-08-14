import React from 'react'
import { connect } from 'react-redux'
import { Link, IndexLink } from 'react-router'
import classNames from 'classnames'

import MainHeader from '@appUI/components/main-header.jsx'
import Title from '@appUI/components/title.jsx'

import { ImportStyle } from 'sp-css-import'
import styles from './styles.less'

// @connect()
@ImportStyle(styles)
export default class InfosHeader extends React.Component {
    /* props
     * currentIndex
     * urlBase
     * title
     * onTabChange
     * tabs
     * [{
     *      tabId
     *      tabName
     * }]
     */
    renderTab(tabInfo, tabIndex) {
        const { tabId, tabName } = tabInfo
        const url = `${this.props.urlBase}${tabIndex ? `/${tabId}` : ''}`

        if (__CLIENT__) {
            return (
                <a
                    href={url}
                    className={classNames([
                        'tab', {
                            'on': tabIndex === this.props.currentIndex
                        }
                    ])}
                    key={tabIndex}
                    onClick={evt => {
                        if(typeof this.props.onTabChange === 'function'){
                            evt.preventDefault()
                            this.props.onTabChange(tabId, tabIndex)
                        }
                    }}
                >
                    {tabName}
                </a>
            )
        } else {
            const Tag = tabIndex ? Link : IndexLink
            return (
                <Tag
                    to={url}
                    className="tab"
                    activeClassName="on"
                    key={tabIndex}
                >
                    {tabName}
                </Tag>
            )
        }
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
                    {this.props.title && <Title tag="h1" className="title">{this.props.title}</Title>}
                    {this.props.children}
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