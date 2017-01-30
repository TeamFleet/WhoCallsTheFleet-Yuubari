import React, { PropTypes } from 'react'

import './Bgimg.less'

class Bgimg extends React.Component {
    render() {
        return (
            <div id="bgimg">
                <BgContainer bgImg={this.props.bgImg} />
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
