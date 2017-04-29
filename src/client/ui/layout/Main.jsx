import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { ImportStyle } from 'sp-css-import'
import style from './Main.less'

// @connect(mapStateToProps, mapDispatchToProps)
@ImportStyle(style)
export default class extends React.Component {
    render() {
        return (
            <main id="main" className={this.props.className}>
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
            </main>
        )
    }
}