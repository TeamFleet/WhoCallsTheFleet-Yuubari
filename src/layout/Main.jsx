import React, { PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import './Main.less'
import { BgContainer } from './Bgimg.jsx'

class Main extends React.Component {
    render() {
        // console.log(this.props.location)
        return (
            <main id="main">
                <div className="wrapper">
                    <ReactCSSTransitionGroup
                        component="div"
                        className="wrapper-inner"
                        transitionName="main-transition"
                        transitionEnterTimeout={200}
                        transitionLeaveTimeout={200}>
                        {React.cloneElement(this.props.children, {
                            key: this.props.location.pathname
                        })}
                    </ReactCSSTransitionGroup>
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
