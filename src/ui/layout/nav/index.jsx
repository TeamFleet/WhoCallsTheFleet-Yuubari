/* eslint-disable no-restricted-globals */
import { Component, createRef } from 'react';
import classNames from 'classnames';
import checkCssProp from 'check-css-prop';
import { extend } from 'koot';

import isRouteChanging from '@api/from-state/is-route-changing';
import {
    lock as lockWindowScroll,
    restore as restoreWindowScroll,
} from '@utils/toggle-window-scroll';

import Icon from '@ui/components/icon';
import NavChannels from './channels';
import NavBottomControls from './bottom-controls';
import AppBar from './appbar';
import Logo from './logo';

/** @type {DOM} 控制导航显示的开关 */
const NavSwitchRef = createRef();
const idNavSwitch = 'nav-switch';
const changeNavSwitch = (changeTo) => {
    if (!NavSwitchRef || !NavSwitchRef.current) return;
    NavSwitchRef.current.checked = changeTo;
    const event = new Event('change');
    NavSwitchRef.current.dispatchEvent(event);
};

//

@extend({
    connect: (state, ownProps) => ({
        timeSwipedFromLeftEdge: state.timeSwipedFromLeftEdge,
        isRouteChanging: isRouteChanging(state, ownProps),
        isAppHasUiMode:
            typeof state.uiMode === 'object' &&
            typeof state.uiMode.mode !== 'undefined',
    }),
    styles: require('./nav.less'),
})
class Nav extends Component {
    state = {
        showBackButton: false,
    };

    constructor() {
        super();

        this.onChange = this.onChange.bind(this);
    }

    historyBack() {
        if (typeof history !== 'undefined') history.back();
    }

    getSnapshotBeforeUpdate(prevProps) {
        // this.setState({
        //     showBackButton: nextProps.location !== this.props.location
        // })

        if (
            prevProps.timeSwipedFromLeftEdge !==
            this.props.timeSwipedFromLeftEdge
        )
            changeNavSwitch(true);

        if (this.props.isAppHasUiMode) changeNavSwitch(false);

        return null;
    }

    componentDidUpdate() {}

    onChange(evt) {
        if (checkCssProp('overscroll-behavior')) return;
        // if (NavSwitchRef.current.checked) return lockWindowScroll();
        if (evt.currentTarget.checked) return lockWindowScroll();
        return restoreWindowScroll();
    }

    render() {
        return (
            <nav
                id="nav"
                className={classNames({
                    [this.props.className]: true,
                    'is-loading': this.props.isRouteChanging,
                    // 'is-loading': true,
                })}
            >
                <input
                    type="checkbox"
                    id={idNavSwitch}
                    ref={NavSwitchRef}
                    onChange={this.onChange}
                />

                <div className="wrapper">
                    <Logo
                        className="top"
                        showBackButton={this.state.showBackButton}
                        onBackButtonClick={this.historyBack}
                    />
                    <NavChannels
                        className="mid"
                        location={this.props.location}
                    />
                    <NavBottomControls className="bot" />
                </div>

                <AppBar />

                <label htmlFor={idNavSwitch} className="label">
                    <div className="icon">
                        <Icon className="icon-menu" icon="menu" />
                    </div>
                    <div className="mobile-overlay" />
                </label>
            </nav>
        );
    }
}
export default Nav;

//

export const onRouterChange = () => {
    if (__SERVER__) return;
    changeNavSwitch(false);
    restoreWindowScroll(0, 0);
};
