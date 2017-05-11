import React from 'react'
import { connect } from 'react-redux'
import { ImportStyle } from 'sp-css-import'

// import { dir } from '../../core/defaults.js'
import { leave as appModeLeave } from '../../logic/app-mode/api.js'
import * as bgimgApi from '../../logic/bgimg/api.js'

import style from './bgimg.less'

const getStyles = (bgObj, type = '') => {
    if (bgObj && bgObj.getPath)
        return {
            backgroundImage: bgObj && `url(${bgObj.getPath(type)})`,
            backgroundPosition: bgObj && bgObj.position
        }
    return {}
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
class Bgimg extends React.Component {
    constructor(props) {
        super(props)

        if (__CLIENT__)
            this.props.dispatch(bgimgApi.initList(
                __CLIENT__
                    ? 'default-' + Math.floor(Math.random() * self.__BGIMG_LIST__.length)
                    : 'default-0'
            ))
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
                    <BgContainerBlured />
                </div>
                <div className="background-main-blured main">
                    <BgContainerBlured />
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


/* A standard bgimg container
 */
class BgContainer extends React.Component {
    render() {
        return (
            <div className={"background-container" + (this.props.className ? ' ' + this.props.className : '')}>
                <div
                    className="background"
                    style={getStyles(this.props.bg || this.props.bgObj || this.props.backgroundObj, this.props.type)}
                />
            </div>
        )
    }
}

@connect(state => ({
    currentBg: state.bgimg.current
}))
class BgContainerBlured extends React.Component {
    render() {
        return (
            <BgContainer className={this.props.className} bg={this.props.currentBg} type="blured" />
        )
    }
}

@connect(state => ({
    currentBg: state.bgimg.current
}))
class BgContainerOriginal extends React.Component {
    render() {
        return (
            <BgContainer bg={this.props.currentBg} />
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

    originalTransitionEnd(evt) {
        // console.log('originalTransitionEnd', evt.target)
        // console.log('showBlured', this.state.showBlured)
        if (evt.propertyName == 'opacity' && this.state.showBlured) {
            this.props.dispatch(bgimgApi.mainImgLoaded())
        }
    }

    bluredLoaded(evt) {
        // console.log('bluredLoaded')
        this.setState({
            stylesBlured: getStyles(this.props.currentBg, 'blured')
        })
    }

    bluredTransitionEnd(evt) {
        if (evt.propertyName == 'opacity' && !this.state.showOriginal) {
            this.setState({
                showOriginal: true
            })
        }
    }

    render() {
        return (
            <div className="background-main">
                {this.state.showOriginal &&
                    <div
                        className={"item item-original" + (this.state.stylesOriginal ? ' is-loaded' : '')}
                        style={this.state.stylesOriginal || {}}
                        onTransitionEnd={this.originalTransitionEnd.bind(this)}
                    >
                        <img src={this.props.currentBg.getPath()} onLoad={this.originalLoaded.bind(this)} />
                    </div>
                }

                <div
                    className={"item item-blured" + (this.state.stylesBlured ? ' is-loaded' : '')}
                    style={this.state.stylesBlured || {}}
                    onTransitionEnd={this.bluredTransitionEnd.bind(this)}
                >
                    <img src={this.props.currentBg.getPath('blured')} onLoad={this.bluredLoaded.bind(this)} />
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


export {
    Bgimg as default,
    BgContainer,
    BgContainerBlured
}
