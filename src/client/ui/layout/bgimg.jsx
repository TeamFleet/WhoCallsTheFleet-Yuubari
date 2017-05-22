import React from 'react'
import { connect } from 'react-redux'

import Cookies from 'js-cookie'

import { leave as appModeLeave } from 'Logic/app-mode/api.js'
import * as bgimgApi from 'Logic/bgimg/api.js'
import getStyles from 'Utils/background-styles.js'

import Background from 'UI/components/background.jsx'

import { ImportStyle } from 'sp-css-import'
import style from './bgimg.less'

const setCookieSessionBackgroundIndex = index => {
    Cookies.set('session_background_index', index)
}

/* Bgimg
 * main background image beneath App view
 * bgimg controls UI
 */
@connect(state => ({
    currentBgPath: __CLIENT__ && state.bgimg.current && state.bgimg.current.getPath(),
    isAppModeBackground: (state.appMode.mode == 'background')
}))
@ImportStyle(style)
export default class Bgimg extends React.Component {
    constructor(props) {
        super(props)

        if (__CLIENT__) {
            // 确定初始背景图
            if (__CLIENT__) {
                const initialIndex = Cookies.get('session_background_index') || ('default-' + Math.floor(Math.random() * self.__BGIMG_LIST__.length))
                this.props.dispatch(bgimgApi.initList(initialIndex))
                setCookieSessionBackgroundIndex(initialIndex)
            }
            if (__SERVER__) {
                this.props.dispatch(bgimgApi.initList('default-0'))
            }
        }
    }

    leaveAppModeBackground() {
        this.props.dispatch(appModeLeave())
        // document.body.classList.add('mode-bg-leaving')
    }

    render() {
        if (__SERVER__) return null
        return (
            <div id="bgimg" className={this.props.className}>
                <BgMain />
                <div className="background-main-blured nav">
                    <Background type="blured" />
                </div>
                <div className="background-main-blured main">
                    <Background type="blured" />
                </div>
                {this.props.isAppModeBackground && (
                    <div className="controls">
                        <button type="button" className="back" onClick={this.leaveAppModeBackground.bind(this)}>[PH] BACK</button>
                        <div
                            className="background-original"
                            style={{
                                backgroundImage: `url(${this.props.currentBgPath})`,
                            }}
                        />
                        <BgList />
                    </div>)
                }
            </div>
        )
    }
}


/* main background image beneath App view. animation/transition process
 1. blured bgimg load
    original bgimg load
 2. blured bgimg enter on blured img loaded
    original bgimg enter on original img loaded
 4. after original bgimg transition end
   1. delete blured container element
   2. dispatch LOADED_MAIN_BGIMG
 */
@connect(state => ({
    currentBg: state.bgimg.current
}))
class BgMain extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            stylesOriginal: false,
            showOriginal: false
        }
    }
    componentWillReceiveProps() {
        this.isOriginalLoaded = false
        this.isOriginalTransitionEnd = false
    }

    originalLoaded() {
        if (this.isOriginalLoaded) return
        // console.log('originalLoaded')
        this.isOriginalLoaded = true
        this.setState({
            stylesOriginal: getStyles(this.props.currentBg)
        })
        setTimeout(() => {
            if (!this.isOriginalTransitionEnd)
                this.originalTransitionEnd(undefined, true)
        }, 2000)
    }

    originalTransitionEnd(evt, isForce) {
        if (isForce || evt.propertyName == 'opacity') {
            this.isOriginalTransitionEnd = true
            this.props.dispatch(bgimgApi.mainImgLoaded())
        }
    }

    bluredLoaded(/*evt*/) {
        // if (__DEV__) console.log('[BgMain] bluredLoaded')
        this.setState({
            stylesBlured: getStyles(this.props.currentBg, 'blured')
        })
        setTimeout(() => {
            if (!this.state.showOriginal)
                this.bluredTransitionEnd(undefined, true)
        }, 2000)
    }

    bluredTransitionEnd(evt, isForce) {
        // if (__DEV__) console.log('[BgMain] bluredTransitionEnd')
        if (!this.state.showOriginal && (isForce || evt.propertyName == 'opacity')) {
            this.setState({
                showOriginal: true
            })
            setTimeout(() => {
                const event = new Event('load', { bubbles: true })
                this._original.dispatchEvent(event)
            }, 2000)
        }
    }

    render() {
        // if (__DEV__) console.log('[BgMain] state.showOriginal', this.state.showOriginal)
        return (
            <div className="background-main">
                {this.state.showOriginal &&
                    <div
                        className={"item item-original" + (this.state.stylesOriginal ? ' is-loaded' : '')}
                        style={this.state.stylesOriginal || {}}
                        onTransitionEnd={this.originalTransitionEnd.bind(this)}
                    >
                        <img
                            src={this.props.currentBg.getPath()}
                            onLoad={this.originalLoaded.bind(this)}
                            onError={this.originalLoaded.bind(this)}
                            ref={(c) => this._original = c}
                        />
                    </div>
                }

                <div
                    className={"item item-blured" + (this.state.stylesBlured ? ' is-loaded' : '')}
                    style={this.state.stylesBlured || {}}
                    onTransitionEnd={this.bluredTransitionEnd.bind(this)}
                >
                    <img
                        src={this.props.currentBg.getPath('blured')}
                        onLoad={this.bluredLoaded.bind(this)}
                        onError={this.bluredLoaded.bind(this)}
                    />
                </div>
            </div>
        )
    }
}
/* only original
class BgMain extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            styles: false
        }
    }

    onLoad() {
        this.setState({
            styles: getStyles(this.props.currentBg, 'blured')
        })
    }

    onTransitionEnd(evt) {
        // console.log('originalTransitionEnd', evt.target)
        // console.log('showBlured', this.state.showBlured)
        if (evt.propertyName == 'opacity') {
            this.props.dispatch(bgimgApi.mainImgLoaded())
        }
    }

    render() {
        return (
            <div className="background-main">
                <div
                    className={"item" + (this.state.styles ? ' is-loaded' : '')}
                    style={this.state.styles || {}}
                    onTransitionEnd={this.onTransitionEnd.bind(this)}
                >
                    <img src={this.props.currentBg.getPath('blured')} onLoad={this.onLoad.bind(this)} />
                </div>
            </div>
        )
    }
}
*/
/* rev:1
class BgMain extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            stylesOriginal: false,
            stylesBlured: false,
            showOriginal: false,
            showBlured: true
        }
    }

    originalLoaded() {
        // console.log('originalLoaded')
        this.setState({
            stylesOriginal: getStyles(this.props.currentBg)
        })
    }

    originalAnimationEnd(evt) {
        // console.log('originalAnimationEnd')
        if (evt.nativeEvent.animationName == 'background-original-leave') {
            setTimeout(() => {
                document.body.classList.remove('mode-bg-leaving')
                document.body.classList.remove('mode-bg')
            }, evt.nativeEvent.elapsedTime * 1000 * 2)
        }
    }

    originalTransitionEnd(evt) {
        // console.log('originalTransitionEnd', evt.target)
        // console.log('showBlured', this.state.showBlured)
        if (evt.propertyName == 'opacity' && this.state.showBlured) {
            this.props.dispatch(bgimgApi.mainImgLoaded())
            this.setState({
                showBlured: false
            })
        }
    }

    bluredLoaded(evt) {
        // console.log('bluredLoaded')
        this.setState({
            stylesBlured: getStyles(this.props.currentBg, 'blured')
        })
        evt.target.parentNode.removeChild(evt.target)
    }

    bluredTransitionEnd(evt) {
        if (evt.propertyName == 'opacity' && !this.state.showOriginal) {
            this.setState({
                showOriginal: true
            })
        }
    }

    // bluredTransitionEnd(evt) {
    // console.log('bluredTransitionEnd', evt.target)
    // if (evt.propertyName == 'opacity' && !evt.target.style.opacity) {
    //     evt.target.parentNode.removeChild(evt.target)
    // }
    // }

    render() {
        return (
            <div className="background-main">
                {this.state.showOriginal &&
                    <div
                        className={"item" + (this.state.stylesOriginal ? ' is-loaded' : '')}
                        style={this.state.stylesOriginal || {}}
                        onAnimationEnd={this.originalAnimationEnd.bind(this)}
                        onTransitionEnd={this.originalTransitionEnd.bind(this)}
                    >
                        <img src={this.props.bgImg} onLoad={this.originalLoaded.bind(this)} />
                    </div>
                }

                {this.state.showBlured &&
                    <div
                        className={"item is-blured" + (this.state.stylesBlured ? ' is-loaded' : '')}
                        style={this.state.stylesBlured || {}}
                        onTransitionEnd={this.bluredTransitionEnd.bind(this)}
                    >
                        <img src={this.props.bgImgBlured} onLoad={this.bluredLoaded.bind(this)} />
                    </div>
                }
            </div>
        )
    }
}
*/

@connect(state => ({
    list: state.bgimg.list,
    index: state.bgimg.current && state.bgimg.current.index
}))
class BgList extends React.Component {
    change(obj) {
        setCookieSessionBackgroundIndex(obj.index)
        this.props.dispatch(bgimgApi.change(obj))
    }

    renderList(type) {
        return (
            <div className={`list-${type}`}>
                {
                    this.props.list[type].map((obj, index) => {
                        return (
                            <div
                                key={index}
                                className={`background-thumbnail${obj.index === this.props.index ? ' on' : ''}`}
                                onClick={() => this.change(obj)}
                            >
                                <span
                                    className="ratio"
                                    style={{
                                        backgroundImage: `url(${obj.getPath('thumbnail')})`
                                    }}
                                />
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    render() {
        return (
            <div className="list">
                {this.renderList('custom')}
                {this.renderList('default')}
            </div>
        )
        // return <div></div>
    }
}