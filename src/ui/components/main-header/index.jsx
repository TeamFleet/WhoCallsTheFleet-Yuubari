import React from 'react';
import ReactDOM from 'react-dom';
import { extend } from 'koot';
import classNames from 'classnames';

// import checkCssProp from 'check-css-prop';

import Background from '@ui/components/background';

// const cssBackdropFilter = __CLIENT__ && checkCssProp('backdrop-filter');

@extend({
    connect: state => ({
        mainKey: state.app.mainKey
        // appReady: state.app.ready,
    }),
    styles: require('./styles.less')
})
class MainHeader extends React.Component {
    state = {
        enter: true,
        enterActive: false
    };

    mounted = false;

    componentDidMount() {
        this.mounted = true;
        // setTimeout(() => {
        //     this.setState({
        //         enter: true
        //     })
        // })
        setTimeout(() => {
            if (!this.mounted) return;
            this.setState({
                enterActive: true
            });
        });
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    renderContent(isPortal) {
        const {
            className,
            children,
            mainKey,
            onAnimationEnd,
            ...props
        } = this.props;

        // delete props.appReady
        delete props.dispatch;

        // console.log(this.state)

        return (
            <div
                className={classNames({
                    [className]: true,
                    'main-header': true,
                    wrapper: isPortal,
                    'mod-transition-enter': this.state.enter,
                    'mod-transition-enter-active': this.state.enterActive,
                    'mod-transition-exit': this.keyCurrent !== mainKey
                })}
                // onTransitionEnd={evt => {
                //     // console.log(
                //     //     evt.target === evt.currentTarget,
                //     //     evt.target.classList.contains('mod-transition-enter-active'),
                //     //     parseFloat(getComputedStyle(evt.target).opacity)
                //     // )
                //     if (evt.target === evt.currentTarget &&
                //         evt.target.classList.contains('mod-transition-enter-active') &&
                //         parseFloat(getComputedStyle(evt.target).opacity) >= 0.9
                //     ) {
                //         this.setState({
                //             enter: false,
                //             enterActive: false,
                //         })
                //     }
                // }}
                onAnimationEnd={evt => {
                    // console.log(evt.target, evt.currentTarget, evt.animationName)
                    if (
                        evt.target === evt.currentTarget &&
                        evt.nativeEvent.animationName === 'fadein'
                    ) {
                        this.setState({
                            enter: false,
                            enterActive: false
                        });
                    }
                    if (typeof onAnimationEnd === 'function')
                        return onAnimationEnd(evt);
                }}
                {...props}
            >
                {children}
                {__CLIENT__ && (
                    <Background className="bg-container" type="blured" />
                )}
            </div>
        );
    }

    render() {
        if (__SERVER__) return this.renderContent();

        if (!this.props.mainKey) return null;

        if (!this.keyCurrent) this.keyCurrent = this.props.mainKey;

        // if (__DEV__) console.log('MainHeader', { current: this.keyCurrent, main: this.props.mainKey })

        return (
            <MainHeaderPortal key={this.keyCurrent}>
                {this.renderContent(true)}
            </MainHeaderPortal>
        );
        // return (
        //     <MainHeaderPortal>
        //         <TransitionGroup
        //             // data-role="transition-group"
        //             appear={true}
        //             enter={false}
        //             exit={true}
        //             component={React.Fragment}
        //         >
        //             {this.props.mainKey &&
        //                 this.keyCurrent === this.props.mainKey &&
        //                 <CSSTransition
        //                     key={this.keyCurrent}
        //                     classNames="transition"
        //                     timeout={{
        //                         appear: 200,
        //                         exit: 200,
        //                     }}
        //                 >
        //                     {this.renderContent(true)}
        //                 </CSSTransition>
        //             }
        //         </TransitionGroup>
        //     </MainHeaderPortal>
        // )
    }
}

export default MainHeader;

const MainHeaderPortal = ({ children }) =>
    ReactDOM.createPortal(children, document.getElementById('main-mask'));
// class MainHeaderPortal extends React.Component {
//     // constructor() {
//     //     super()
//     //     this.state = {
//     //         waiting: true
//     //     }
//     // }
//     // componentDidMount() {
//     //     this.setState({
//     //         waiting: false
//     //     })
//     // }

//     render() {
//         // if (this.state.waiting) return null
//         return ReactDOM.createPortal(
//             this.props.children,
//             document.getElementById('main-mask'),
//         )
//     }
// }

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
