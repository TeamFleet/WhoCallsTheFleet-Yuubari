import React from 'react'
import ReactDOM from 'react-dom'

// import checkCssProp from 'check-css-prop'

import Background from './background.jsx'

import { ImportStyle } from 'sp-css-import'
import style from './main-header.less'

@ImportStyle(style)
export default class extends React.Component {
    // getProps() {
    //     let props = { ...this.props }
    //     delete props.className

    //     return props
    // }
    renderContent() {
        const {
            className,
            children,
            ...props
        } = this.props
        return (
            <div
                className={className + " main-header"}
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
                {this.renderContent()}
            </MainHeaderPortal>
        )
    }
}

class MainHeaderPortal extends React.Component {
    componentWillReceiveProps(newProps) {
        this.renderPortal(newProps);
    }

    renderPortal(props = this.props) {
        if (!this.parent) {
            this.parent = document.getElementById('main-mask')
        }

        if (!this.node) {
            this.node = document.createElement('div');
            this.node.className = 'wrapper'
            this.parent.appendChild(this.node);
        }

        let children = props.children;
        // https://gist.github.com/jimfb/d99e0678e9da715ccf6454961ef04d1b
        if (typeof props.children.type === 'function') {
            children = React.cloneElement(props.children)
        }

        this.portal = ReactDOM.unstable_renderSubtreeIntoContainer(
            this,
            children,
            this.node
        )
    }

    componentDidMount() {
        this.renderPortal()
    }

    render() {
        return null
    }
}