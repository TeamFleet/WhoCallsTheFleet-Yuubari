import React from 'react'
// import { connect } from 'react-redux'
import { Link, IndexLink } from 'react-router'
import classNames from 'classnames'
import { ImportStyle } from 'sp-css-import'

import routerReplace from '@appUtils/router-replace'

import MainHeader from '@appUI/components/main-header'
import Title from '@appUI/components/title'

// @connect()
@ImportStyle(require('./styles.less'))
export default class MainHeaderInfos extends React.Component {
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
    constructor(props) {
        super(props)
        this.state = {
            currentIndex: props.defaultIndex || 0
        }
    }

    renderTab(tabInfo, tabIndex) {
        const { tabId, tabName } = tabInfo
        const url = `${this.props.urlBase}${tabIndex ? `/${tabId}` : ''}`

        if (__CLIENT__) {
            const current = typeof this.props.currentIndex === 'undefined'
                ? this.state.currentIndex
                : this.props.currentIndex
            return (
                <a
                    href={url}
                    className={classNames([
                        'tab', {
                            'on': tabIndex === current
                        }
                    ])}
                    key={tabIndex}
                    onClick={evt => {
                        this.setState({
                            currentIndex: tabIndex
                        })
                        if (typeof this.props.onTabChange === 'function') {
                            evt.preventDefault()
                            this.props.onTabChange(tabId, tabIndex)
                        }
                        if (url) routerReplace(url)
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
        // const Component = isPortal ? MainHeader : 'div'

        const {
            className,
            title,
            subtitle,
            tabs,
            children,
            ...props
        } = this.props;

        [
            'urlBase',
            'currentIndex',
            'defaultIndex',
            'onTabChange'
        ].forEach(key => delete props[key])

        return (
            <MainHeader className={classNames([
                className, {
                    'is-portal': isPortal,
                    'has-subtitle': !!(subtitle),
                    'has-tabs': !!(tabs),
                    'has-only-title': !(children)
                }
            ])} {...props}>

                <div className="infos">
                    {title && <div className="title">
                        {subtitle && <span className="subtitle">{subtitle}</span>}
                        <Title tag="h1" className="title-h1" children={title} />
                    </div>}
                    {children}
                </div>

                {tabs && <div className="tabs">
                    <div className="wrapper">
                        {tabs.map(this.renderTab.bind(this))}
                    </div>
                </div>}

                {!tabs && <div className="tabs-placeholder" />}

            </MainHeader>
        )
    }
}