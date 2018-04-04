import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { ImportStyle } from 'sp-css-import'
import htmlHead from '@appUtils/html-head.js'

import { updateAppReady } from '@appLogic/app/api'
import { swipedFromLeftEdge } from '@appLogic/side-menu/api'

import style from './app.less'

import Main from './layout/main'
import MainMask from './layout/main-mask'
import Nav from './layout/nav'
import Bgimg from './layout/bgimg'

let startSwipeAtLeftBorder = false

@connect(state => {
    return {
        isMainBgimgLoaded: state.bgimg.isMainLoaded,
        appMode: state.appMode
    }
})
@ImportStyle(style)
class App extends React.Component {
    /*
     * this.isAppReady      是否已初始化
     */

    // 仅针对 __SERVER__
    // static onServerRenderStoreExtend(store) {
    //     const state = store.getState()
    //     const dispatch = store.dispatch
    //     const preprocessTasks = []
    //     preprocessTasks.push(
    //     )
    //     return preprocessTasks
    // }

    // 仅针对 __SERVER__
    static onServerRenderHtmlExtend(ext, store) {
        if (__SERVER__) require('@appLogic/database/index.js').init()

        const head = htmlHead({
            state: store.getState()
        })

        ext.metas = ext.metas.concat(head.meta)
        ext.title = head.title
    }

    constructor() {
        super()
        if (typeof document !== 'undefined' && document.documentElement)
            document.documentElement.classList.add('is-react-ready')
    }

    appReady(timeout = 10) {
        if (__CLIENT__ && !self.isAppReady) {
            self.appReady()
            setTimeout(() => {
                this.props.dispatch(
                    updateAppReady(true)
                )
            }, timeout)
        }
    }

    onTouchStart(evt) {
        if (!__CLIENT__) return
        if (self.isAppReadyFull && evt.nativeEvent.touches[0].pageX < 25)
            startSwipeAtLeftBorder = {
                x: evt.nativeEvent.touches[0].screenX,
                y: evt.nativeEvent.touches[0].screenY,
                timestamp: (new Date()).valueOf()
            }
        else
            startSwipeAtLeftBorder = false
    }

    onTouchMove(evt) {
        if (startSwipeAtLeftBorder) {
            const deltaX = evt.nativeEvent.touches[0].screenX - startSwipeAtLeftBorder.x
            const deltaY = evt.nativeEvent.touches[0].screenY - startSwipeAtLeftBorder.y
            const elapseTime = (new Date()).valueOf() - startSwipeAtLeftBorder.timestamp

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

    render() {
        // if (__CLIENT__) this.appReady(100)
        // if (__SERVER__) {
        //     return null
        //     await new Promise(resolve => {
        //         setTimeout(resolve, 100)
        //     })
        // }
        // if (__DEV__) console.log('app - render')
        if (this.props.isMainBgimgLoaded) this.appReady()

        const hasMode = (__CLIENT__ && self.isAppReady && this.props.appMode.mode)

        return (
            <div
                id="app"
                className={classNames({
                    [this.props.className]: true,
                    [`is-mode-${this.props.appMode.mode}`]: hasMode,
                    [`is-mode-${this.props.appMode.mode}-entering`]: (hasMode && !this.props.appMode.leaving && this.props.appMode.animation),
                    [`is-mode-${this.props.appMode.mode}-leaving`]: (hasMode && this.props.appMode.leaving),
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
        )
    }
}

class ErrorBoundary extends React.Component {
    componentDidCatch(error, info) {
        console.log(error, info)
        // Display fallback UI
        // this.setState({ hasError: true })
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, info);
    }

    render() {
        return this.props.children
    }
}

export default class extends React.Component {
    render() {
        return (
            <ErrorBoundary>
                <App {...this.props} />
            </ErrorBoundary>
        )
    }
}
