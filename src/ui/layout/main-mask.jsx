import React from 'react'
import { extend } from 'koot'

const MainMask = extend({
    connect: state => ({
        currentBg: state.bgimg.current,
    }),
    styles: require('./main-mask.less')
})(
    ({ className, children }) => (
        <div
            id="main-mask"
            className={className}
        >
            {children}
        </div>
    )
)
export default MainMask

// import { connect } from 'react-redux'
// // import bindEvent from 'bind-event'
// import { ImportStyle } from 'sp-css-import'

// // @connect(/*state => ({
// //     realtimeLocation: state.location
// // })*/)
// @connect(state => ({
//     currentBg: state.bgimg.current,
// }))
// @ImportStyle(require('./main-mask.less'))
// export default class extends React.Component {
//     // componentDidMount() {
//     //     if (__SERVER__) return
//     //     bindEvent(
//     //         this.el,
//     //         'animationend',
//     //         (evt) => {
//     //             if (evt.animationName === 'fadein' && evt.target.offsetParent === this.el) {
//     //                 evt.target.setAttribute('data-enter', true)
//     //             }
//     //         }
//     //     )
//     // }

//     render() {
//         // console.log(this.props.pathname)
//         // if (__CLIENT__ && this.el && window.isAppReadyFull)
//         //     for (let i = 1; i < this.el.childNodes.length; ++i) {
//         //         if (this.el.childNodes[i].dataset.enter === 'true')
//         //             this.el.childNodes[i].classList.add('fadeout')
//         //     }

//         return (
//             <div
//                 id="main-mask"
//                 className={this.props.className}
//                 ref={(c) => this.el = c}
//             >
//                 {this.props.children}
//             </div>
//         )
//     }
// }
