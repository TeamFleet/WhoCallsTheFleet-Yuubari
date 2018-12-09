import React from 'react'
import { IndexLink } from 'react-router'
import { extend } from 'koot'

import Icon from '@ui/components/icon.jsx'

import NavChannels from './channels'
import NavBottomControls from './bottom-controls'

/** @type {DOM} 控制导航显示的开关 */
let elNavSwitch
const idNavSwitch = 'nav-switch'


//


@extend({
    connect: (state, ownProps) => ({
        timeSwipedFromLeftEdge: state.timeSwipedFromLeftEdge,
        isChangingRoute: (() => {
            if (__SERVER__ || typeof state.realtimeLocation.pathname === 'undefined') return false
            if (__SPA__)
                return (state.realtimeLocation.hash.substr(1) !== ownProps.location.pathname)
            return (state.realtimeLocation.pathname !== ownProps.location.pathname)
        })(),
        isAppHasUiMode: typeof state.uiMode === 'object' && typeof state.uiMode.mode !== 'undefined',
    }),
    styles: require('./nav.less')
})
class Nav extends React.Component {
    state = {
        showBackButton: false
    }

    historyBack() {
        if (typeof history !== 'undefined')
            history.back()
    }

    getSnapshotBeforeUpdate(prevProps) {
        // this.setState({
        //     showBackButton: nextProps.location !== this.props.location
        // })

        if (prevProps.timeSwipedFromLeftEdge !== this.props.timeSwipedFromLeftEdge)
            elNavSwitch.checked = true

        if (this.props.isAppHasUiMode)
            elNavSwitch.checked = false

        return null
    }

    render() {
        return (
            <nav
                id="nav"
                className={this.props.className + (this.props.isChangingRoute ? ' is-loading' : '')}
            >
                <input type="checkbox" id={idNavSwitch} ref={(c) => elNavSwitch = c} />

                <div className="wrapper">
                    <div className="top logo">
                        {__SPA__ && (
                            <button
                                type="button"
                                className="btn-back"
                                disabled={!this.state.showBackButton}
                                onClick={this.historyBack}
                            />
                        )}
                        <IndexLink
                            to="/"
                            className="btn-home-logo"
                            activeClassName="on"
                            style={__CHANNEL__ === 'yuubari'
                                ? {
                                    backgroundImage: `url(${require('@assets/logos/yuubari/128.png')})`
                                }
                                : {}
                            }
                        >
                            <span className="title">{__('title')}</span>
                            {__CHANNEL__ === 'yuubari' && <span className="channel channel-yuubari">Yuubari</span>}
                        </IndexLink>
                    </div>

                    <NavChannels className="mid" location={this.props.location} />
                    <NavBottomControls className="bot" />

                </div>

                <AppBar />

                <label htmlFor={idNavSwitch} className="label">
                    <div className="icon"><Icon className="icon-menu" icon="menu" /></div>
                </label>
            </nav>
        )
    }
}
export default Nav


//


export const onRouterChange = () => {
    if (typeof document === 'undefined') return
    if (!elNavSwitch) return
    elNavSwitch.checked = false
}


//


@extend({
    connect: state => ({
        pageTitle: state.pageTitle
    }),
    styles: require('./styles-appbar.less')
})
class AppBar extends React.Component {
    render() {
        return (
            <div className={this.props.className}>
                {this.props.pageTitle.sub && <span className="sub">{this.props.pageTitle.sub}</span>}
                <span className="main">{this.props.pageTitle.main}</span>
                <span className="buttons">
                    {__CLIENT__ && navigator.share && (
                        <Icon icon="question6" onClick={() => {
                            navigator.share({
                                title: document.title,
                                text: document.querySelector('meta[name="description"]').getAttribute('content'),
                                url: location.href,
                            })
                                .then(() => console.log('Successful share'))
                                .catch((error) => console.log('Error sharing', error));
                        }} />
                    )}
                </span>
            </div>
        )
    }
}
