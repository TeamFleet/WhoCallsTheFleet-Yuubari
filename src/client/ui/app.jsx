import React from 'react'
import { connect } from 'react-redux'
import { ImportStyle } from 'sp-css-import'
import htmlHead from 'Utils/html-head.js'

import modeBackgroundOnAnimationEnd from '../logic/app-mode/mode-background.js'
import { swipedFromLeftEdge } from '../logic/side-menu/api.js'

import style from './app.less'

import Main from './layout/main.jsx'
import MainMask from './layout/main-mask.jsx'
import Nav from './layout/nav.jsx'
import Bgimg from './layout/bgimg.jsx'

let startSwipeAtLeftBorder = false

@connect(state => ({
    isMainBgimgLoaded: state.bgimg.isMainLoaded,
    appMode: state.appMode
}))
@ImportStyle(style)
export default class extends React.Component {
    /*
     * this.isAppReady      是否已初始化
     */

    // 仅针对 __SERVER__
    // static preprocess(state, dispatch) {
    //     const preprocessTasks = []
    //     preprocessTasks.push(
    //     )
    //     return preprocessTasks
    // }

    // 仅针对 __SERVER__
    static htmlExtends(ext, store) {
        if (__SERVER__) require('../logic/database/index.js').init()

        const head = htmlHead({
            state: store.getState()
        })

        ext.meta = ext.meta.concat(head.meta)
        ext.title = head.title
    }

    appReady(timeout = 0) {
        if (__CLIENT__ && !this.isAppReady) {
            this.isAppReady = true

            if ('serviceWorker' in navigator) {
                // console.log('Service Worker SUPPORTED')
                navigator.serviceWorker.register(self.__SERVICE_WORKER_FILENAME__, {
                    scope: '/'
                }).then((reg) => {
                    // console.log('Service Worker register', reg)
                }).catch((err) => {
                    console.log('Service Worker SUPPORTED. ERROR', err)
                })
            } else {
                console.log('Service Worker NOT-SUPPORTED')
            }

            setTimeout(() => {
                console.log('appReady')
                document.body.classList.add('is-ready')
            }, timeout)
        }
    }

    get className() {
        return this.props.className
            + (this.isAppReady && this.props.appMode.mode
                ? (' is-mode-' + this.props.appMode.mode
                    + (!this.props.appMode.leaving && this.props.appMode.animation ? (' is-mode-' + this.props.appMode.mode + '-entering') : '')
                    + (this.props.appMode.leaving ? (' is-mode-' + this.props.appMode.mode + '-leaving') : '')
                )
                : ''
            )
    }

    onAnimationEnd(evt) {
        const action = modeBackgroundOnAnimationEnd(evt.nativeEvent)
        if (action) this.props.dispatch(action)
    }

    onTouchStart(evt) {
        if (evt.nativeEvent.touches[0].pageX < 15)
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
                if (deltaX > 10 && deltaX >= Math.abs(deltaY) * 2 && deltaX / elapseTime > (10 / 200)) {
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
        if (this.props.isMainBgimgLoaded) this.appReady()

        return (
            <div
                id="app"
                className={this.className}
                onAnimationEnd={this.onAnimationEnd.bind(this)}
                onTouchStart={this.onTouchStart.bind(this)}
                onTouchMove={this.onTouchMove.bind(this)}
                onTouchEnd={this.onTouchEnd.bind(this)}
                onTouchCancel={this.onTouchCancel.bind(this)}
            >
                <Nav location={this.props.location} />
                <Main location={this.props.location}>
                    {this.props.children}
                </Main>
                <MainMask />
                <Bgimg />
            </div>
        )
    }
}