import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import { ImportStyle } from 'sp-css-import'

// import checkCssProp from 'check-css-prop'

import Background from './background.jsx'

@ImportStyle(require('./main-header.less'))
export default class extends React.Component {
    // getProps() {
    //     let props = { ...this.props }
    //     delete props.className

    //     return props
    // }
    renderContent(isPortal) {
        const {
            className,
            children,
            ...props
        } = this.props
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
                {__CLIENT__ && <Background type="blured" />}
            </div>
        )
    }
    render() {
        if (__SERVER__) return this.renderContent()

        return (
            <MainHeaderPortal>
                {this.renderContent(true)}
            </MainHeaderPortal>
        )
    }
}

class MainHeaderPortal extends React.Component {
    componentDidMount() {
        // modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        // modalRoot.removeChild(this.el);
    }

    render() {
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