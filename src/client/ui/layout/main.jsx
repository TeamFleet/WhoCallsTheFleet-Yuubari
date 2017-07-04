import React from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

// import lastScroll from 'Utils/last-scroll.js'

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
    onAnimationStart(evt) {
        switch (evt.nativeEvent.animationName) {
            // case 'main-transition-enter':
            //     break
            case 'main-transition-leave':
                // console.log('main-transition-leave', action)
                if (action === 'PUSH') {
                    evt.target.setAttribute('style', `margin-top:${0 - window.scrollY}px`)
                    window.scrollTo(undefined, 0)
                }
                break
        }
    }

    componentWillUpdate(nextProps) {
        action = nextProps.location.action
        lastScrollY = window.scrollY
        pathnameLastScrollY[this.props.location.pathname] = window.scrollY
    }

    componentDidUpdate() {
        if(action === 'POP' && typeof pathnameLastScrollY[this.props.location.pathname] !== 'undefined'){
            window.scrollTo(undefined, pathnameLastScrollY[this.props.location.pathname])
            delete pathnameLastScrollY[this.props.location.pathname]
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
                    transitionEnterTimeout={250}
                    transitionLeaveTimeout={250}>
                    {this.props.children && (
                        <MainBody
                            key={this.props.location.pathname.split('/').slice(0, 3).join('/')}
                            location={this.props.location}
                        >
                            {this.props.children}
                        </MainBody>
                    )}
                </CSSTransitionGroup>
            </main>
        )
    }
}

class MainBody extends React.Component {
    render() {
        return (
            <div style={
                __CLIENT__ && action === 'POP' && this.props.location.pathname !== location.pathname
                    ? {
                        marginTop: `${pathnameLastScrollY[location.pathname] - lastScrollY}px`
                    }
                    : null
            }>
                {this.props.children}
            </div>
        )
    }
}
