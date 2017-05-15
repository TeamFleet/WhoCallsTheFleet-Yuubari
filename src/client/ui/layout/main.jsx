import React from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import { ImportStyle } from 'sp-css-import'
import style from './main.less'

// @connect(mapStateToProps, mapDispatchToProps)
@ImportStyle(style)
export default class extends React.Component {
    render() {
        return (
            <main id="main" className={this.props.className}>
                <CSSTransitionGroup
                    component="div"
                    className="wrapper"
                    transitionName="main-transition"
                    transitionEnterTimeout={200}
                    transitionLeaveTimeout={200}>
                    {this.props.children && React.cloneElement(this.props.children, {
                        key: this.props.location.pathname
                    })}
                </CSSTransitionGroup>
            </main>
        )
    }
}
