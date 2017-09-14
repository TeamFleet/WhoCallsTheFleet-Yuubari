import React from 'react'
// import { connect } from 'react-redux'
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
                        if (typeof this.props.onTabChange === 'function') {
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

        const {
            className,
            title,
            subtitle,
            tabs,
            children,
            ...props
        } = this.props

        return (
            <Component className={classNames([
                className, {
                    'is-portal': isPortal,
                    'has-subtitle': !!(subtitle),
                    'has-tabs': !!(tabs),
                    'has-only-title': !(children)
                }
            ])} {...props}>

                <div className="infos">
                    {title && <Title tag="h1" className="title">
                        {subtitle && <span className="subtitle">{subtitle}</span>}
                        {title}
                    </Title>}
                    {children}
                </div>

                {tabs && <div className="tabs">
                    <div className="wrapper">
                        {tabs.map(this.renderTab.bind(this))}
                    </div>
                </div>}

                {!tabs && <div className="tabs-placeholder" />}

            </Component>
        )
    }
}