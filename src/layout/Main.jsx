import React, { PropTypes } from 'react'

import './Main.less'
import { BgContainer } from './Bgimg.jsx'

class Main extends React.Component {
    render() {
        return (
            <main id="main">
                <div className="wrapper">
                    {this.props.children}
                </div>
                <BgContainer bgImg={this.props.bgBlured} />
            </main>
        )
    }
}

Main.propTypes = {
    children: PropTypes.node,
    bgBlured: PropTypes.string
}

export default Main
