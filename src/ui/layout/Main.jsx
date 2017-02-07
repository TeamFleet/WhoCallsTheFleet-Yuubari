import React, { PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import './Main.less'
import { BgContainer } from './Bgimg.jsx'

export default class extends React.Component {
    static propTypes = {
        children: PropTypes.node,
        bgBlured: PropTypes.string
    }

    render() {
        console.log(this.props)
        return (
            <main id="main">
                <div className="wrapper">
                    <ReactCSSTransitionGroup
                        component="div"
                        className="wrapper-inner"
                        transitionName="main-transition"
                        transitionEnterTimeout={200}
                        transitionLeaveTimeout={200}>
                        {this.props.children && React.cloneElement(this.props.children, {
                            key: this.props.location.pathname
                        })}
                    </ReactCSSTransitionGroup>
                </div>
                <BgContainer bgImg={this.props.bgBlured} />
            </main>
        )
    }
}
