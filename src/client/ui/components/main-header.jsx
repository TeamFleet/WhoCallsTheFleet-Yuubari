import React from 'react'
import ReactDOM from 'react-dom'

import Background from './background.jsx'

import { ImportStyle } from 'sp-css-import'
import style from './main-header.less'

@ImportStyle(style)
export default class extends React.Component {
    render() {
        return (
            <MainHeaderPortal>
                <div className={this.props.className + " main-header"}>
                    {this.props.children}
                    <Background type="blured" />
                </div>
            </MainHeaderPortal>
        )
    }
}

class MainHeaderPortal extends React.Component {
    componentWillReceiveProps(newProps) {
        this.renderPortal(newProps);
    }

    renderPortal(props = this.props) {
        let children = props.children;
        // https://gist.github.com/jimfb/d99e0678e9da715ccf6454961ef04d1b
        if (typeof props.children.type === 'function') {
            children = React.cloneElement(props.children, { closePortal: this.closePortal });
        }

        if (!this.node) {
            this.node = document.getElementById('main-mask')
        }

        this.portal = ReactDOM.unstable_renderSubtreeIntoContainer(
            this,
            children,
            this.node,
            this.props.onUpdate
        )
    }

    componentDidMount() {
        this.renderPortal()
    }

    render() {
        return null
    }
}