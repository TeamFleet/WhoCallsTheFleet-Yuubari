import React, { PropTypes } from 'react'

import './Bgimg.less'

class Bgimg extends React.Component {
    render() {
        const file = '/bgimgs/bob-1.jpg'
        const fileBlured = '/bgimgs/blured/bob-1.jpg'
        return (
            <div id="bgimg">
                <div className="blured nav">
                    <div className="reverse" style={{
                        backgroundImage: `url(${fileBlured})`
                    }}></div>
                </div>
                <div className="blured main">
                    <div className="reverse" style={{
                        backgroundImage: `url(${fileBlured})`
                    }}></div>
                </div>
                <div className="original" style={{
                    backgroundImage: `url(${file})`
                }}></div>
            </div>
        )
    }
}

Bgimg.propTypes = {
}

export default Bgimg
