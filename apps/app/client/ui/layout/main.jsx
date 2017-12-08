import React from 'react'
import { connect } from 'react-redux'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import CSSTransition from 'react-transition-group/CSSTransition'
import { ImportStyle } from 'sp-css-import'

import { updateMainKey } from '@appLogic/app/api'

// import lastScroll from '@appUtils/last-scroll.js'

let action
let lastScrollY = 0
let pathnameLastScrollY = {}

const getKey = location => {
    // console.log(location)
    const pathname = location.pathname.substr(0, 1) === '/'
        ? location.pathname.substr(1)
        : location.pathname
    const segs = pathname.split('/')

    if (segs[0] === 'arsenal')
        return segs.slice(0, 1).join('/')

    return segs.slice(0, 2).join('/')
}

// @connect(state => {
//     console.log('state', state)
//     return {}
// })
@connect()
@ImportStyle(require('./main.less'))
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
        this.props.dispatch(
            updateMainKey(getKey(nextProps.location))
        )
    }

    componentDidMount() {
        this.props.dispatch(
            updateMainKey(getKey(this.props.location))
        )
    }

    componentDidUpdate() {
        if (action === 'POP' && typeof pathnameLastScrollY[this.props.location.pathname] !== 'undefined') {
            window.scrollTo(undefined, pathnameLastScrollY[this.props.location.pathname])
            delete pathnameLastScrollY[this.props.location.pathname]
        }
    }

    render() {
        // console.log(this.props)
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
                            key={getKey(this.props.location)}
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
