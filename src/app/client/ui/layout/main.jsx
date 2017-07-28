import React from 'react'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import CSSTransition from 'react-transition-group/CSSTransition'

// import lastScroll from '@appUtils/last-scroll.js'

import { ImportStyle } from 'sp-css-import'
import style from './main.less'

let action
let lastScrollY = 0
let pathnameLastScrollY = {}

// @connect(state => {
//     console.log('state', state)
//     return {}
// })
@ImportStyle(style)
export default class extends React.Component {
    // onAnimationStart(evt) {
    //     switch (evt.nativeEvent.animationName) {
    //         case 'main-transition-enter':
    //             if (action === 'PUSH') {
    //                 window.scrollTo(undefined, 0)
    //             }
    //             break
    //         case 'main-transition-exit':
    //             // console.log('main-transition-leave', action)
    //             if (action === 'PUSH') {
    //                 evt.target.setAttribute('style', `margin-top:${0 - window.scrollY}px`)
    //                 // window.scrollTo(undefined, 0)
    //             }
    //             break
    //     }
    // }

    onExit(dom) {
        // console.log('onExit', dom)
        if (action === 'PUSH') {
            dom.setAttribute('style', `margin-top:${0 - window.scrollY}px`)
            window.scrollTo(undefined, 0)
        }
    }

    componentWillUpdate(nextProps) {
        action = nextProps.location.action
        lastScrollY = window.scrollY
        pathnameLastScrollY[this.props.location.pathname] = window.scrollY
    }

    componentDidUpdate() {
        if (action === 'POP' && typeof pathnameLastScrollY[this.props.location.pathname] !== 'undefined') {
            window.scrollTo(undefined, pathnameLastScrollY[this.props.location.pathname])
            delete pathnameLastScrollY[this.props.location.pathname]
        }
    }

    render() {
        return (
            <main
                id="main"
                className={this.props.className}
            >
                <TransitionGroup
                    component="div"
                    className="wrapper"
                >
                    {this.props.children && (
                        <CSSTransition
                            key={this.props.location.pathname.split('/').slice(0, 3).join('/')}
                            classNames="main-transition"
                            timeout={250}
                            onExit={this.onExit.bind(this)}
                        >
                            <MainBody
                                location={this.props.location}
                            >
                                {this.props.children}
                            </MainBody>
                        </CSSTransition>
                    )}
                </TransitionGroup>
            </main>
        )
    }
}

class MainBody extends React.Component {
    render() {
        const marginTop = __CLIENT__ && action === 'POP' ? pathnameLastScrollY[location.pathname] - lastScrollY : NaN
        return (
            <div style={
                __CLIENT__ && action === 'POP' && this.props.location.pathname !== location.pathname
                    ? {
                        marginTop: isNaN(marginTop) ? undefined : `${marginTop}px`
                    }
                    : null
            }>
                {this.props.children}
            </div>
        )
    }
}
