import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import CSSTransition from 'react-transition-group/CSSTransition'
import classNames from 'classnames'
import { ImportStyle } from 'sp-css-import'
// import { REALTIME_LOCATION_REDUCER_NAME } from 'sp-isomorphic-utils/realtime-location'

// import checkCssProp from 'check-css-prop'

import Background from '@appUI/components/background.jsx'

@connect(state => ({
    mainKey: state.app.mainKey,
    // appReady: state.app.ready,
}))
@ImportStyle(require('./styles.less'))
export default class extends React.Component {
    state = {
        waiting: true
    }

    componentDidMount() {
        this.setState({
            waiting: false
        })
    }

    renderContent(isPortal) {
        const {
            className,
            children,
            ...props
        } = this.props

        delete props.mainKey
        // delete props.appReady
        delete props.dispatch

        return (
            <div
                className={classNames({
                    [className]: true,
                    'main-header': true,
                    'wrapper': isPortal
                })}
                {...props}
            >
                {children}
                {__CLIENT__ && <Background className="bg-container" type="blured" />}
            </div>
        )
    }

    render() {
        if (__SERVER__)
            return this.renderContent()

        if (!this.key)
            this.key = this.props.mainKey

        if (this.state.waiting)
            return null

        // console.log(this.key, this.props.mainKey)

        return (
            <TransitionGroup
                data-role="transition-group"
                appear={true}
                enter={false}
            >
                {this.props.mainKey &&
                    this.key === this.props.mainKey &&
                    <CSSTransition
                        key={this.props.key}
                        classNames="transition"
                        timeout={250}
                    >
                        <MainHeaderPortal key={this.key}>
                            {this.renderContent(true)}
                        </MainHeaderPortal>
                    </CSSTransition>
                }
            </TransitionGroup>
        )
    }
}

class MainHeaderPortal extends React.Component {
    // constructor() {
    //     super()
    //     this.state = {
    //         waiting: true
    //     }
    // }
    // componentDidMount() {
    //     this.setState({
    //         waiting: false
    //     })
    // }

    render() {
        // if (this.state.waiting) return null
        return ReactDOM.createPortal(
            this.props.children,
            document.getElementById('main-mask'),
        )
    }
}

// class MainHeaderPortal extends React.Component {
//     componentWillReceiveProps(newProps) {
//         this.renderPortal(newProps);
//     }

//     renderPortal(props = this.props) {
//         if (!this.parent) {
//             this.parent = document.getElementById('main-mask')
//         }

//         if (!this.node) {
//             this.node = document.createElement('div');
//             this.node.className = 'wrapper'
//             this.parent.appendChild(this.node);
//         }

//         let children = props.children;
//         // https://gist.github.com/jimfb/d99e0678e9da715ccf6454961ef04d1b
//         if (typeof props.children.type === 'function') {
//             children = React.cloneElement(props.children)
//         }

//         this.portal = ReactDOM.unstable_renderSubtreeIntoContainer(
//             this,
//             children,
//             this.node
//         )
//     }

//     componentDidMount() {
//         this.renderPortal()
//     }

//     render() {
//         return null
//     }
// }
