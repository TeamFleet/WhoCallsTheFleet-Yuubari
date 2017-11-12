import React from 'react'
// import { connect } from 'react-redux'
import bindEvent from 'bind-event'
import { ImportStyle } from 'sp-css-import'

// @connect(/*state => ({
//     realtimeLocation: state.location
// })*/)
@ImportStyle(require('./main-mask.less'))
export default class extends React.Component {
    // componentWillReceiveProps(newProps) {
    //     if (newProps.realtimeLocation) {
    //         this.el.childNodes.forEach(node => {
    //             node.classList.add('fadeout')
    //         })
    //         while (this.el.firstChild) {
    //             this.el.removeChild(this.el.firstChild);
    //         }
    //     }
    // }

    // onAnimationEnd(evt) {
    //     if (!evt) return
    //     if (evt && evt.nativeEvent) evt = evt.nativeEvent

    //     if (evt.animationName === 'fadeout') {
    //         evt.target.parentNode.removeChild(evt.target)
    //     }

    //     if (evt.nativeEvent.animationName === 'fadein') {
    //         console.log(evt.target)
    //     }
    // }

    // shouldComponentUpdate(nextProps/*, nextState*/) {
    //     if(nextProps.pathname === this.props.pathname) return false
    //     return true
    // }

    componentDidMount() {
        if (__SERVER__) return
        bindEvent(
            this.el,
            'animationend',
            (evt) => {
                if (evt.animationName === 'fadein' && evt.target.offsetParent === this.el) {
                    evt.target.setAttribute('data-enter', true)
                }
            }
        )
    }

    render() {
        // console.log('#main-mask - render()', this.props.pathname)
        if (__CLIENT__ && this.el && window.isAppReadyFull)
            for (let i = 0; i < this.el.childNodes.length; ++i) {
                if (this.el.childNodes[i].dataset.enter === 'true')
                    this.el.childNodes[i].classList.add('fadeout')
            }
        // this.el.childNodes.forEach(node => {
        //     if (!node.classList.contains('is-entering'))
        //         node.classList.add('fadeout')
        // })
        return (
            <div
                id="main-mask"
                className={this.props.className}
                ref={(c) => this.el = c}
            >
                {this.props.children}
            </div>
        )
    }
}
