import React from 'react'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { ImportStyle } from 'sp-css-import'
import style from './main-mask.less'

@connect(state => ({
    realtimeLocation: state.location
}))
@ImportStyle(style)
export default class extends React.Component {
    componentWillReceiveProps(newProps) {
        if (newProps.realtimeLocation) {
            this.el.childNodes.forEach(node => {
                node.classList.add('fadeout')
            })
            // while (this.el.firstChild) {
            //     this.el.removeChild(this.el.firstChild);
            // }
        }
    }

    onAnimationEnd(evt) {
        if (!evt) return
        if (evt && evt.nativeEvent) evt = evt.nativeEvent

        if(evt.animationName === 'fadeout')
            evt.target.parentNode.removeChild(evt.target)
    }

    render() {
        return (
            <div
                id="main-mask"
                className={this.props.className}
                ref={(c) => this.el = c}
                onAnimationEnd={this.onAnimationEnd.bind(this)}
            >
                {this.props.children}
            </div>
        )
    }
}
