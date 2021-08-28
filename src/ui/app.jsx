import { Component, StrictMode, createRef } from 'react';
import classNames from 'classnames';
import { extend } from 'koot';
import qs from 'qs';

import { setInstallPWAEvent, setAppType } from '@api/app/api';
import { swipedFromLeftEdge } from '@api/side-menu/api';
import setAppReady from '@utils/set-app-ready';
import {
    handlerBeforeReact as beforeinstallpromptHandlerBeforeReact,
    eventPromptBeforeReact as beforeinstallpromptEventPromptBeforeReact,
} from '@utils/install-app';
import { didCritical, clientCompatible, appReady } from '@const/client-globals';

import Main from './layout/main';
import MainMask from './layout/main-mask';
import Nav from './layout/nav';
import Bgimg from './layout/bgimg';

import styles from './app.less';

// ============================================================================

export const AppRef = createRef();

// ============================================================================

@extend({
    connect: (state) => {
        if (__CLIENT__ && __DEV__ && !window.reduxLogShowed) {
            console.warn('Redux connected', state);
            window.reduxLogShowed = true;
        }
        return {
            appType: state.app.type,
            isMainBgimgLoaded: state.bgimg.isMainLoaded,
            uiMode: __CLIENT__
                ? state.uiMode
                : // ? state.routing.locationBeforeTransitions.state.uiMode || {}
                  {},
            localeId: state.localeId,
            serverHref: state.server.href,
        };
    },
    styles,
})
class App extends Component {
    startSwipeAtLeftBorder = false;

    constructor(props) {
        super(props);

        ['onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'].forEach(
            (e) => {
                this[e] = this[e].bind(this);
            }
        );

        if (
            typeof URLSearchParams !== 'undefined' &&
            typeof URL !== 'undefined'
        ) {
            const searchParams = new URLSearchParams(
                new URL(props.serverHref).search
            );
            if (searchParams.has('v0')) props.dispatch(setAppType('v0-iframe'));
        }

        //     // if (__CLIENT__) {
        //     console.log('! locale', props.localeId)
        //     const kckit = require('kckit')
        //     console.log('_', {
        //         // kckit,
        //         locale: kckit.locale,
        //         sample: kckit.db.ships[20]._name
        //     })
        //     const db = require('@database').default
        //     console.log('=', {
        //         sample: db.ships[20]._name
        //     })
        //     // }
    }

    checkAppReady(timeout = 10) {
        if (__CLIENT__ && window[didCritical] && this.props.isMainBgimgLoaded) {
            // 注册 service-worker
            if (__DEV__) {
                // eslint-disable-next-line no-console
                console.log('👩‍💻 No Service Worker for DEV mode.');
            } else if ('serviceWorker' in navigator) {
                // console.log('Service Worker SUPPORTED')
                navigator.serviceWorker
                    .register(window.__SERVICE_WORKER_FILENAME__, {
                        scope: '/',
                    })
                    .then((/*reg*/) => {
                        // console.log('👩‍💻 Service Worker REGISTER', reg)
                    })
                    .catch((err) => {
                        console.warn('👩‍💻 Service Worker SUPPORTED. ERROR!');
                        console.error(err);
                    });
            } else {
                console.warn('👩‍💻 Service Worker not supported!');
            }

            setAppReady(this.props.dispatch);
        } else {
            setTimeout(() => {
                this.checkAppReady(timeout);
            }, 10);
        }
    }

    onTouchStart(evt) {
        // if (!__CLIENT__) return
        if (window[appReady] && evt.nativeEvent.touches[0].pageX < 25)
            this.startSwipeAtLeftBorder = {
                x: evt.nativeEvent.touches[0].screenX,
                y: evt.nativeEvent.touches[0].screenY,
                timestamp: Date.now(),
            };
        else this.startSwipeAtLeftBorder = false;
    }

    onTouchMove(evt) {
        if (this.startSwipeAtLeftBorder) {
            const deltaX =
                evt.nativeEvent.touches[0].screenX -
                this.startSwipeAtLeftBorder.x;
            const deltaY =
                evt.nativeEvent.touches[0].screenY -
                this.startSwipeAtLeftBorder.y;
            const elapseTime =
                Date.now() - this.startSwipeAtLeftBorder.timestamp;

            if (elapseTime > 200) {
                this.startSwipeAtLeftBorder = false;
                return;
            }

            if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) > 10) {
                if (
                    deltaX > 10 &&
                    deltaX >= Math.abs(deltaY) &&
                    deltaX / elapseTime > 10 / 200
                ) {
                    this.props.dispatch(swipedFromLeftEdge());
                }
                this.startSwipeAtLeftBorder = false;
            }
        }
    }

    onTouchEnd() {
        if (this.startSwipeAtLeftBorder) this.startSwipeAtLeftBorder = false;
    }

    onTouchCancel() {
        if (this.startSwipeAtLeftBorder) this.startSwipeAtLeftBorder = false;
    }

    componentDidCatch(error, info) {
        // eslint-disable-next-line no-console
        console.group('React ERROR');
        console.error(error);
        console.warn(info);
        // eslint-disable-next-line no-console
        console.groupEnd();
        // console.warn('React ERROR', error, info);
        // Display fallback UI
        // this.setState({ hasError: true })
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, info);
    }

    componentDidMount() {
        document.documentElement.classList.add('is-react-ready');

        // const { query = {} } = history.getCurrentLocation();
        const query = qs.parse(this.props.router.getCurrentLocation().search, {
            ignoreQueryPrefix: true,
        });

        // 检查是否需要显示“安装App”按钮
        if (__DEV__) {
            this.props.dispatch(setInstallPWAEvent({}));
        } else {
            if (query.utm_source !== 'web_app_manifest') {
                // console.log('🎯 not via app')
                // https://developers.google.com/web/fundamentals/app-install-banners/
                if (beforeinstallpromptEventPromptBeforeReact) {
                    this.props.dispatch(
                        setInstallPWAEvent(
                            beforeinstallpromptEventPromptBeforeReact
                        )
                    );
                } else {
                    window.addEventListener('beforeinstallprompt', (evt) => {
                        // console.log('🎯 beforeinstallprompt Event fired')
                        evt.preventDefault();
                        this.props.dispatch(setInstallPWAEvent(evt));
                        return false;
                    });
                }
                window.removeEventListener(
                    'beforeinstallprompt',
                    beforeinstallpromptHandlerBeforeReact
                );
            } else {
                this.props.dispatch(setInstallPWAEvent(false));
            }
        }

        // 检查 App 是否已准备就绪
        this.checkAppReady();
        if (__DEV__) console.warn('App mounted');
    }

    // componentDidUpdate() {
    //     this.checkAppReady();
    // }

    render() {
        if (__CLIENT__ && !window[clientCompatible]) return null;
        // if (__SERVER__) {
        //     return null
        //     await new Promise(resolve => {
        //         setTimeout(resolve, 100)
        //     })
        // }
        // if (__DEV__) console.log('app - render')

        const {
            mode: uiMode,
            leaving: uiModeIsLeaving,
            animation: uiModeAnimation,
        } = this.props.uiMode;
        const hasMode = __CLIENT__ && uiMode;
        const showNav = this.props.appType !== 'v0-iframe';

        return (
            <StrictMode>
                <div
                    id="app"
                    className={classNames({
                        [this.props.className]: true,
                        'mod-no-nav': !showNav,
                        [`is-mode-${uiMode}`]: hasMode,
                        [`is-mode-${uiMode}-entering`]:
                            hasMode && !uiModeIsLeaving && uiModeAnimation,
                        [`is-mode-${uiMode}-leaving`]:
                            hasMode && uiModeIsLeaving,
                    })}
                    onTouchStart={this.onTouchStart}
                    onTouchMove={this.onTouchMove}
                    onTouchEnd={this.onTouchEnd}
                    onTouchCancel={this.onTouchCancel}
                    ref={AppRef}
                >
                    {showNav && <Nav location={this.props.location} />}
                    <MainMask pathname={this.props.location.pathname} />
                    <Main location={this.props.location}>
                        {this.props.children}
                    </Main>
                    <Bgimg key="bgimg" />
                </div>
            </StrictMode>
        );
    }
}

export default App;
