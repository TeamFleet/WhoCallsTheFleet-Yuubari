import React from 'react'
import { connect } from 'react-redux'
import { ImportStyle } from 'sp-css-import'

// import { dir } from '../../core/defaults.js'
import * as bgimgApi from '../../logic/bgimg/api.js'

import style from './Bgimg.less'

/* Bgimg
 * main background image beneath App view
 * bgimg controls UI
 */
@connect(state => ({
    bgImg: state.bgimg.currentPath.original
}))
@ImportStyle(style)
class Bgimg extends React.Component {
    constructor(props) {
        super(props)
        this.props.dispatch(bgimgApi.initList())
    }
    closeControls() {
        document.body.classList.add('mode-bg-leaving')
    }

    originalAnimationEnd(evt) {
        if (evt.nativeEvent.animationName == 'background-original-leave') {
            setTimeout(() => {
                document.body.classList.remove('mode-bg-leaving')
                document.body.classList.remove('mode-bg')
            }, evt.nativeEvent.elapsedTime * 1000 * 2)
        }
    }

    render() {
        return (
            <div id="bgimg" className={this.props.className}>
                <BgMain />
                <div className="controls">
                    <button type="button" className="back" onClick={this.closeControls}>[PH] BACK</button>
                    <div
                        className="background-original"
                        style={{
                            backgroundImage: `url(${this.props.bgImg})`
                        }}
                        onAnimationEnd={this.originalAnimationEnd.bind(this)}
                    />
                    <BgList />
                </div>
            </div>
        )
    }
}


/* A standard bgimg container
 */
class BgContainer extends React.Component {
    render() {
        return (
            <div className="background-container">
                <div
                    className="background"
                    style={{
                        backgroundImage: `url(${this.props.bgImg})`
                    }}
                />
            </div>
        )
    }
}



@connect(state => ({
    bgImgBlured: state.bgimg.currentPath.blured
}))
class BgContainerBlured extends React.Component {
    render() {
        return (
            <BgContainer bgImg={this.props.bgImgBlured} />
        )
    }
}



@connect(state => ({
    bgImg: state.bgimg.currentPath.original
}))
class BgContainerOriginal extends React.Component {
    render() {
        return (
            <BgContainer bgImg={this.props.bgImg} />
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
    bgImg: state.bgimg.currentPath.original,
    bgImgBlured: state.bgimg.currentPath.blured
}))
class BgMain extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            stylesOriginal: false,
            stylesBlured: false,
            showBlured: true
        }
    }

    originalLoaded() {
        // console.log('originalLoaded')
        this.setState({
            stylesOriginal: {
                backgroundImage: `url(${this.props.bgImg})`
            }
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
            stylesBlured: {
                backgroundImage: `url(${this.props.bgImgBlured})`
            }
        })
        evt.target.parentNode.removeChild(evt.target)
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
                <div
                    className={"item" + (this.state.stylesOriginal ? ' is-loaded' : '')}
                    style={this.state.stylesOriginal || {}}
                    onAnimationEnd={this.originalAnimationEnd.bind(this)}
                    onTransitionEnd={this.originalTransitionEnd.bind(this)}
                >
                    <img src={this.props.bgImg} onLoad={this.originalLoaded.bind(this)} />
                </div>

                {this.state.showBlured &&
                    <div
                        className={"item is-blured" + (this.state.stylesBlured ? ' is-loaded' : '')}
                        style={this.state.stylesBlured || {}}
                        ref={(el) => { this.elItemBlured = el }}
                    >
                        <img src={this.props.bgImgBlured} onLoad={this.bluredLoaded.bind(this)} />
                    </div>
                }
            </div>
        )
    }
}

@connect(state => ({
    list: state.bgimg.list,
    index: state.bgimg.currentIndex
}))
class BgList extends React.Component {
    change(indexString) {
        bgimgApi.change(indexString)
    }

    renderList(type) {
        return (
            <div className={`list-${type}`}>
                {
                    this.props.list[type].map((obj, index) => {
                        const _index = type + '-' + index
                        return (
                            <div
                                key={index}
                                className={`background-thumbnail${_index === this.props.index ? ' on' : ''}`}
                                onClick={() => this.change(_index)}
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