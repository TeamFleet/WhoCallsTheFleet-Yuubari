import { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import classNames from 'classnames';
import { extend } from 'koot';

import routerReplace from '@utils/router-replace';

import MainHeader from '@ui/components/main-header';
import Title from '@ui/components/title';

@extend({
    styles: require('./styles.less'),
})
class MainHeaderInfos extends Component {
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
        super(props);
        this.state = {
            currentIndex: props.defaultIndex || 0,
        };
    }

    renderTab(tabInfo, tabIndex) {
        const { urlBase, onTabChange, tabLink = true } = this.props;

        let tabId, tabName;
        if (Array.isArray(tabInfo)) {
            tabId = tabInfo[0];
            tabName = tabInfo[1];
        } else if (typeof tabInfo === 'object') {
            tabId = tabInfo.tabId;
            tabName = tabInfo.tabName;
        } else {
            tabId = tabIndex;
            tabName = tabInfo;
        }
        // const { tabId, tabName } = tabInfo
        const url = tabLink
            ? `${urlBase}${tabIndex ? `/${tabId}` : ''}`
            : undefined;

        if (__CLIENT__) {
            const current =
                typeof this.props.currentIndex === 'undefined'
                    ? this.state.currentIndex
                    : this.props.currentIndex;
            const Component = tabLink ? 'a' : 'span';
            return (
                <Component
                    href={url}
                    className={classNames([
                        'link',
                        'tab',
                        {
                            on: tabIndex === current,
                        },
                    ])}
                    key={tabIndex}
                    onClick={(evt) => {
                        this.setState({
                            currentIndex: tabIndex,
                        });
                        if (typeof onTabChange === 'function') {
                            evt.preventDefault();
                            onTabChange(tabId, tabIndex);
                        }
                        if (url) routerReplace(url);
                    }}
                >
                    {tabName}
                </Component>
            );
        } else {
            const Component = !tabLink ? 'span' : tabIndex ? Link : IndexLink;
            return (
                <Component
                    to={url}
                    className="link tab"
                    activeClassName="on"
                    key={tabIndex}
                >
                    {tabName}
                </Component>
            );
        }
    }

    render() {
        // const isPortal = __CLIENT__
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
            'onTabChange',
            'tabLink',
        ].forEach((key) => delete props[key]);

        return (
            <MainHeader
                className={classNames([
                    className,
                    {
                        // 'is-portal': isPortal,
                        'has-subtitle': !!subtitle,
                        'has-tabs': !!tabs,
                        'has-only-title': !children,
                    },
                ])}
                type="infos"
                {...props}
            >
                <div className="infos">
                    {title && (
                        <div className="title">
                            {subtitle && (
                                <span className="subtitle">{subtitle}</span>
                            )}
                            <Title
                                tag="h1"
                                className="title-h1"
                                children={title}
                            />
                        </div>
                    )}
                    {children}
                </div>

                {tabs && (
                    <div className="tabs">
                        <div className="wrapper">
                            {tabs.map(this.renderTab.bind(this))}
                        </div>
                    </div>
                )}

                {!tabs && <div className="tabs-placeholder" />}
            </MainHeader>
        );
    }
}

export default MainHeaderInfos;
