import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

// import { dir } from '../../core/defaults.js'
import * as bgimgApi from '../../logic/bgimg/api.js'

import './Bgimg.less'


/*
BgImg in App, contains:
 * base bgimg under layer of App view
 * bgimg controls view
 */
@connect(function mapStateToProps(state) {
    return {
        bgImg: state.bgimgState.current.original
    }
})
class Bgimg extends React.Component {
    static propTypes = {
        bgImg: PropTypes.string
    }

    closeBgControls() {
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
            <div id="bgimg">
                <BgInitial />
                <div className="controls">
                    <button type="button" className="back" onClick={this.closeBgControls}>[PH] BACK</button>
                    <div className="background-original" style={{
                        backgroundImage: `url(${this.props.bgImg})`
                    }} onAnimationEnd={this.originalAnimationEnd.bind(this)} />
                    <BgList />
                </div>
            </div>
        )
    }
}


/*
A standard bgimg container
 */
class BgContainer extends React.Component {
    static propTypes = {
        bgImg: PropTypes.string
    }
    render() {
        return (
            <div className="background-container">
                <div className="background" style={{
                    backgroundImage: `url(${this.props.bgImg})`
                }} />
            </div>
        )
    }
}



@connect(function mapStateToProps(state) {
    return {
        bgImgBlured: state.bgimgState.current.blured
    }
})
class BgContainerBlured extends React.Component {
    static propTypes = {
        bgImg: PropTypes.string
    }
    render() {
        return (
            <BgContainer bgImg={this.props.bgImgBlured} />
        )
    }
}



@connect(function mapStateToProps(state) {
    return {
        bgImg: state.bgimgState.current.original
    }
})
class BgContainerOriginal extends React.Component {
    static propTypes = {
        bgImg: PropTypes.string
    }
    render() {
        return (
            <BgContainer bgImg={this.props.bgImg} />
        )
    }
}


/*
base bgimg under layer of App view. animation/transition process
 1. blured bgimg load
    original bgimg load
 2. blured bgimg enter on blured img loaded
    original bgimg enter on original img loaded
 4. after original bgimg transition end
   1. delete blured container element
   2. dispatch INIT_BGIMG_LOADED
 */
@connect(function mapStateToProps(state) {
    return {
        bgImg: state.bgimgState.current.original,
        bgImgBlured: state.bgimgState.current.blured
    }
})
class BgInitial extends React.Component {
    static propTypes = {
        bgImg: PropTypes.string,
        bgImgBlured: PropTypes.string
    }

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
            bgimgApi.initImgLoaded()
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
            <div className="background-initial">
                <div
                    className={"item" + (this.state.stylesOriginal ? ' is-loaded' : '')}
                    style={this.state.stylesOriginal || {}}
                    onAnimationEnd={this.originalAnimationEnd.bind(this)}
                    onTransitionEnd={this.originalTransitionEnd.bind(this)}
                >
                    {<img src={this.props.bgImg} onLoad={this.originalLoaded.bind(this)} />}
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

@connect(function mapStateToProps(state) {
    return {
        list: state.bgimgState.list,
        index: state.bgimgState.current.index
    }
})
class BgList extends React.Component {
    constructor(props) {
        super(props)

        bgimgApi.initList()
    }

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
                                        backgroundImage: `url(${bgimgApi.getPath(obj.name, 'thumbnail')})`
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