import React from 'react'
import classNames from 'classnames'
import { extend, history } from 'koot'
if (__DEV__) console.warn('TODO: [App] use `history` from global')

import {
    updateAppReady,
    setInstallPWAEvent,
} from '@api/app/api'
import { swipedFromLeftEdge } from '@api/side-menu/api'
import { updateLocale as updateDbLocale } from '@database'
import {
    handlerBeforeReact as beforeinstallpromptHandlerBeforeReact,
    eventPromptBeforeReact as beforeinstallpromptEventPromptBeforeReact
} from '@utils/install-app'

import Main from './layout/main'
import MainMask from './layout/main-mask'
import Nav from './layout/nav'
import Bgimg from './layout/bgimg'

@extend({
    connect: state => {
        if (__CLIENT__ && __DEV__ && !self.reduxLogShowed) {
            console.log('Redux connected', state)
            self.reduxLogShowed = true
        }
        return {
            isMainBgimgLoaded: state.bgimg.isMainLoaded,
            uiMode: __CLIENT__
                ? state.uiMode
                // ? state.routing.locationBeforeTransitions.state.uiMode || {}
                : {},
            localeId: state.localeId,
        }
    },
    styles: require('./app.less')
})
class App extends React.Component {
    /*
     * this.isAppReady      是否已初始化
     */
    startSwipeAtLeftBorder = false

    constructor(props) {
        super(props)
        // console.log('QA:', typeof __QA__ === 'undefined' ? 'undefined' : __QA__)
        if (__CLIENT__) {
            // 确定 database 语言
            updateDbLocale({ localeId: props.localeId })

            // 将 history 中的 state.ui 清空
            history.replace({
                ...history.getCurrentLocation(),
                state: {}
            })
        }
        if (typeof document !== 'undefined' && document.documentElement)
            document.documentElement.classList.add('is-react-ready')
    }

    checkAppReady(timeout = 10) {
        if (__CLIENT__ && this.props.isMainBgimgLoaded && !self.isAppReady) {
            self.appReady()
            setTimeout(() => {
                this.props.dispatch(
                    updateAppReady(true)
                )
            }, timeout)
        }
    }

    onTouchStart = (evt) => {
        // if (!__CLIENT__) return
        if (self.isAppReadyFull && evt.nativeEvent.touches[0].pageX < 25)
            this.startSwipeAtLeftBorder = {
                x: evt.nativeEvent.touches[0].screenX,
                y: evt.nativeEvent.touches[0].screenY,
                timestamp: Date.now()
            }
        else
            this.startSwipeAtLeftBorder = false
    }

    onTouchMove = (evt) => {
        if (this.startSwipeAtLeftBorder) {
            const deltaX = evt.nativeEvent.touches[0].screenX - this.startSwipeAtLeftBorder.x
            const deltaY = evt.nativeEvent.touches[0].screenY - this.startSwipeAtLeftBorder.y
            const elapseTime = Date.now() - this.startSwipeAtLeftBorder.timestamp

            if (elapseTime > 200) {
                this.startSwipeAtLeftBorder = false
                return
            }

            if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) > 10) {
                if (deltaX > 10 && deltaX >= Math.abs(deltaY) && deltaX / elapseTime > (10 / 200)) {
                    this.props.dispatch(swipedFromLeftEdge())
                }
                this.startSwipeAtLeftBorder = false
            }
        }
    }

    onTouchEnd() {
        if (this.startSwipeAtLeftBorder) this.startSwipeAtLeftBorder = false
    }

    onTouchCancel() {
        if (this.startSwipeAtLeftBorder) this.startSwipeAtLeftBorder = false
    }

    componentDidCatch(error, info) {
        console.log('React ERROR', error, info)
        // Display fallback UI
        // this.setState({ hasError: true })
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, info);
    }

    componentDidMount() {
        const {
            query = {}
        } = history.getCurrentLocation()

        // 检查是否需要显示“安装App”按钮
        if (__DEV__) {
            this.props.dispatch(setInstallPWAEvent({}))
            // window.History = history
        } else {
            if (query.utm_source !== 'web_app_manifest') {
                // console.log('🎯 not via app')
                // https://developers.google.com/web/fundamentals/app-install-banners/
                if (beforeinstallpromptEventPromptBeforeReact) {
                    this.props.dispatch(setInstallPWAEvent(beforeinstallpromptEventPromptBeforeReact))
                } else {
                    window.addEventListener('beforeinstallprompt', (evt) => {
                        // console.log('🎯 beforeinstallprompt Event fired')
                        evt.preventDefault()
                        this.props.dispatch(setInstallPWAEvent(evt))
                        return false
                    })
                }
                window.removeEventListener('beforeinstallprompt', beforeinstallpromptHandlerBeforeReact)
            } else {
                this.props.dispatch(setInstallPWAEvent(false))
            }
        }

        // 检查 App 是否已准备就绪
        this.checkAppReady()
    }

    componentDidUpdate() {
        this.checkAppReady()
    }

    render() {
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
        } = this.props.uiMode
        const hasMode = (__CLIENT__ && self.isAppReady && uiMode)

        return (
            <React.StrictMode>
                <div
                    id="app"
                    className={classNames({
                        [this.props.className]: true,
                        [`is-mode-${uiMode}`]: hasMode,
                        [`is-mode-${uiMode}-entering`]: (hasMode && !uiModeIsLeaving && uiModeAnimation),
                        [`is-mode-${uiMode}-leaving`]: (hasMode && uiModeIsLeaving),
                    })}
                    onTouchStart={this.onTouchStart.bind(this)}
                    onTouchMove={this.onTouchMove.bind(this)}
                    onTouchEnd={this.onTouchEnd.bind(this)}
                    onTouchCancel={this.onTouchCancel.bind(this)}
                >
                    <Nav location={this.props.location} />
                    <MainMask pathname={this.props.location.pathname} />
                    <Main location={this.props.location}>
                        {this.props.children}
                    </Main>
                    <Bgimg />
                </div>
            </React.StrictMode>
        )
    }
}

export default App
