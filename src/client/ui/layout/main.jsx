import React from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import lastScroll from 'Utils/last-scroll.js'

import { ImportStyle } from 'sp-css-import'
import style from './main.less'

// @connect(mapStateToProps, mapDispatchToProps)
@ImportStyle(style)
export default class extends React.Component {
    onAnimationStart(evt) {
        // if (__DEV__) console.log('onAnimationStart', evt.target, evt.nativeEvent.animationName)

        switch (evt.nativeEvent.animationName) {
            case 'main-transition-enter':
                var target = evt.target
                var y = lastScroll.get()
                target.setAttribute('style', `margin-top:${0 - y}px`)
                setTimeout(() => {
                    window.scrollTo(undefined, y)
                    target.removeAttribute('style')
                }, 200)
                break
            case 'main-transition-leave':
                // evt.target.setAttribute('data-last-scroll-y', window.scrollY)
                evt.target.setAttribute('style', `margin-top:${0 - window.scrollY}px`)
                // evt.target.setAttribute('data-style-margin-top', `${0 - window.scrollY}px`)
                window.scrollTo(undefined, 0)
                break
        }
    }
    render() {
        return (
            <main
                id="main"
                className={this.props.className}
                onAnimationStart={this.onAnimationStart.bind(this)}
            >
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
