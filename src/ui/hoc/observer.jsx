import { Component, createRef, forwardRef, useEffect, useRef } from 'react';

export const observer =
    (options = {}) =>
    (WrappedComponent) =>
        class Observer extends Component {
            constructor(props) {
                super(props);

                if (
                    __CLIENT__ &&
                    'IntersectionObserver' in window &&
                    'IntersectionObserverEntry' in window &&
                    'intersectionRatio' in
                        window.IntersectionObserverEntry.prototype
                ) {
                    const {
                        root = null,
                        rootMargin = '0px',
                        threshold = [0, 1],
                        classNameInView = 'is-inview',
                    } = options;

                    const settings = {
                        root,
                        rootMargin,
                        threshold,
                    };

                    const handleIntersect = (entries /*, observer*/) => {
                        entries.forEach((entry) => {
                            if (entry.intersectionRatio <= 0) {
                                // out of view
                                entry.target.classList.remove(classNameInView);
                            } else {
                                entry.target.classList.add(classNameInView);
                            }
                        });
                    };

                    this.observer = new IntersectionObserver(
                        handleIntersect,
                        settings
                    );
                } else {
                    this.observer = undefined;
                }
            }

            componentWillUnmount() {
                if (this.observer) this.observer.disconnect();
            }

            render() {
                const props = {
                    ...this.props,
                    ...this.state,
                };

                return (
                    <WrappedComponent observer={this.observer} {...props}>
                        {this.props.children}
                    </WrappedComponent>
                );
            }
        };

export const observerItem = (WrappedComponent) => {
    const ObserverItem = ({
        children,
        observer,
        ref,
        forwardedRef,
        ...props
    }) => {
        const CRef = useRef(null);
        const TrueRef = ref ?? forwardedRef ?? CRef;

        useEffect(() => {
            const el =
                observer && TrueRef && TrueRef.current instanceof Element
                    ? TrueRef.current
                    : undefined;
            if (el) observer.observe(el);
            return () => {
                if (el) observer.unobserve(el);
            };
        }, [TrueRef, observer]);

        return (
            <WrappedComponent
                forwardedRef={TrueRef}
                {...props}
                // {...this.state}
            >
                {children}
            </WrappedComponent>
        );
    };
    // class ObserverItem extends Component {
    //     Ref = createRef();

    //     componentDidMount() {
    //         if (!this._item && typeof document !== 'undefined') {
    //             if (!this.Ref.current) {
    //                 if (!observerItem.warnedNoForwardedRef) {
    //                     console.warn(
    //                         'Please use `forwardedRef` prop in @observerItem component'
    //                     );
    //                     observerItem.warnedNoForwardedRef = true;
    //                 }
    //             } else {
    //                 this._item = this.Ref.current;
    //             }
    //             // console.log('observerItem this', this)
    //             // const { findDOMNode } = require('react-dom');
    //             // this._item = findDOMNode(this);
    //         }
    //         console.log(
    //             'ObserverItem didMount',
    //             this.observer,
    //             this.Ref,
    //             this._item,
    //             this.props,
    //             '\n'
    //         );
    //         if (this.observer && this._item && this._item instanceof Element)
    //             this.observer.observe(this._item);
    //     }
    //     componentWillUnmount() {
    //         if (this.observer && this._item)
    //             this.observer.unobserve(this._item);
    //     }

    //     render() {
    //         const { children, observer, ...props } = this.props;

    //         this.observer = observer;

    //         return (
    //             <WrappedComponent
    //                 forwardedRef={this.Ref}
    //                 {...props}
    //                 // {...this.state}
    //             >
    //                 {children}
    //             </WrappedComponent>
    //         );
    //     }
    // }

    return forwardRef((props, ref) => {
        if (ref) return <ObserverItem {...props} forwardedRef={ref} />;
        return <ObserverItem {...props} />;
    });
};
