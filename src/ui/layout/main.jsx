import { Component, createRef } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { extend } from 'koot';

import { updateMainKey } from '@api/app/api';
import getKey from '@utils/get-main-key';

import styles from './main.less';

// import lastScroll from '@utils/last-scroll.js'

// ============================================================================

let action;
let lastScrollY = 0;
const pathnameLastScrollY = {};
export const MainRef = createRef();

// ============================================================================

// @connect(state => {
//     console.log('state', state)
//     return {}
// })
@extend({
    connect: true,
    styles,
})
class Main extends Component {
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
            dom.setAttribute('style', `margin-top:${0 - window.scrollY}px`);
            window.scrollTo(undefined, 0);
        }
    }
    onExit = this.onExit.bind(this);

    shouldComponentUpdate(nextProps) {
        action = nextProps.location.action;
        lastScrollY = window.scrollY;
        pathnameLastScrollY[this.props.location.pathname] = window.scrollY;
        // if (JSON.stringify(this.props.location) !== JSON.stringify(nextProps.location))
        this.props.dispatch(updateMainKey(getKey(nextProps.location)));
        return true;
    }

    componentDidMount() {
        this.props.dispatch(updateMainKey(getKey(this.props.location)));
    }

    componentDidUpdate() {
        if (
            action === 'POP' &&
            typeof pathnameLastScrollY[this.props.location.pathname] !==
                'undefined'
        ) {
            // console.log(this.props.children)
            window.scrollTo(
                undefined,
                pathnameLastScrollY[this.props.location.pathname]
            );
            delete pathnameLastScrollY[this.props.location.pathname];
        }
    }

    render() {
        // console.log(this.props)
        return (
            <main id="main" className={this.props.className} ref={MainRef}>
                <TransitionGroup component="div" className="wrapper">
                    {this.props.children && (
                        <CSSTransition
                            key={getKey(this.props.location)}
                            classNames="main-transition"
                            timeout={250}
                            onExit={this.onExit}
                        >
                            <MainBody location={this.props.location}>
                                {this.props.children}
                            </MainBody>
                        </CSSTransition>
                    )}
                </TransitionGroup>
            </main>
        );
    }
}
export default Main;

//

const MainBody = ({ location, children }) => {
    const marginTop =
        __CLIENT__ && action === 'POP'
            ? pathnameLastScrollY[location.pathname] - lastScrollY
            : NaN;
    return (
        <div
            style={
                __CLIENT__ &&
                action === 'POP' &&
                location.pathname !== location.pathname
                    ? {
                          marginTop: isNaN(marginTop)
                              ? undefined
                              : `${marginTop}px`,
                      }
                    : null
            }
        >
            {children}
        </div>
    );
};
