import React, { PropTypes } from 'react'

import './Bgimg.less'

class Bgimg extends React.Component {
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
                <BgContainer bgImg={this.props.bgImg} />
                <div className="controls">
                    <button type="button" className="back" onClick={this.closeBgControls}>[PH] BACK</button>
                    <div className="background-original" style={{
                        backgroundImage: `url(${this.props.bgImg})`
                    }} onAnimationEnd={this.originalAnimationEnd.bind(this)} />
                    <div className="list" />
                </div>
            </div>
        )
    }
}
Bgimg.propTypes = {
    bgImg: PropTypes.string
}

class BgContainer extends React.Component {
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
Bgimg.propTypes = {
    bgImg: PropTypes.string
}

export {
    Bgimg as default,
    BgContainer
}
