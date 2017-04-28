import React from 'react'
import { connect } from 'react-redux'
import { ImportStyle } from 'sp-css-import'
import htmlHead from 'Utils/html-head.js'

import style from './Root.less'

import Main from './layout/Main.jsx'
import Nav from './layout/Nav.jsx'
import Bgimg from './layout/Bgimg.jsx'

@connect(state => ({
    isMainBgimgLoaded: state.bgimg.isMainLoaded
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
        const head = htmlHead({
            state: store.getState()
        })

        ext.meta = ext.meta.concat(head.meta)
        ext.title = head.title
    }

    appReady(timeout = 0) {
        if (__CLIENT__ && !this.isAppReady) {
            this.isAppReady = true
            setTimeout(() => {
                console.log('appReady')
                document.body.classList.add('is-ready')
            }, timeout)
        }
    }

    render() {
        // if (__CLIENT__) this.appReady(100)
        if (this.props.isMainBgimgLoaded) this.appReady()

        return (
            <div id="app" className={this.props.className}>
                <Nav location={this.props.location} />
                <Main location={this.props.location}>
                    {this.props.children}
                </Main>
                <Bgimg />
            </div>
        )
    }
}