import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { ImportStyle } from 'sp-css-import'

import { updateAppReady } from '@api/app/api'
import { swipedFromLeftEdge } from '@api/side-menu/api'

import Main from './layout/main'
import MainMask from './layout/main-mask'
import Nav from './layout/nav'
import Bgimg from './layout/bgimg'

let startSwipeAtLeftBorder = false

@connect(state => {
    if (__DEV__) console.log('Redux connected', state)
    return {
        isMainBgimgLoaded: state.bgimg.isMainLoaded,
        uiMode: state.uiMode
    }
})
@ImportStyle(require('./app.less'))
export default class App extends React.Component {
    /*
     * this.isAppReady      是否已初始化
     */

    constructor() {
        super()
        // console.log('QA:', typeof __QA__ === 'undefined' ? 'undefined' : __QA__)
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
            startSwipeAtLeftBorder = {
                x: evt.nativeEvent.touches[0].screenX,
                y: evt.nativeEvent.touches[0].screenY,
                timestamp: Date.now()
            }
        else
            startSwipeAtLeftBorder = false
    }

    onTouchMove = (evt) => {
        if (startSwipeAtLeftBorder) {
            const deltaX = evt.nativeEvent.touches[0].screenX - startSwipeAtLeftBorder.x
            const deltaY = evt.nativeEvent.touches[0].screenY - startSwipeAtLeftBorder.y
            const elapseTime = Date.now() - startSwipeAtLeftBorder.timestamp

            if (elapseTime > 200) {
                startSwipeAtLeftBorder = false
                return
            }

            if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) > 10) {
                if (deltaX > 10 && deltaX >= Math.abs(deltaY) && deltaX / elapseTime > (10 / 200)) {
                    this.props.dispatch(swipedFromLeftEdge())
                }
                startSwipeAtLeftBorder = false
            }
        }
    }

    onTouchEnd() {
        if (startSwipeAtLeftBorder) startSwipeAtLeftBorder = false
    }

    onTouchCancel() {
        if (startSwipeAtLeftBorder) startSwipeAtLeftBorder = false
    }

    componentDidCatch(error, info) {
        console.log('React ERROR', error, info)
        // Display fallback UI
        // this.setState({ hasError: true })
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, info);
    }

    componentDidMount() {
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
                    onTouchStart={this.onTouchStart}
                    onTouchMove={this.onTouchMove}
                    onTouchEnd={this.onTouchEnd}
                    onTouchCancel={this.onTouchCancel}
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
