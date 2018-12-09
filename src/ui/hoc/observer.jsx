import React, { Component } from 'react'

export const observer = (options = {}) => (WrappedComponent) => (

    class Observer extends Component {

        constructor(props) {
            super(props)

            if (__CLIENT__ &&
                'IntersectionObserver' in window &&
                'IntersectionObserverEntry' in window &&
                'intersectionRatio' in window.IntersectionObserverEntry.prototype
            ) {

                const {
                    root = null,
                    rootMargin = "0px",
                    threshold = [0, 1],
                    classNameInView = 'is-inview'
                } = options

                const settings = {
                    root,
                    rootMargin,
                    threshold
                }

                const handleIntersect = (entries/*, observer*/) => {
                    entries.forEach(entry => {
                        if (entry.intersectionRatio <= 0) {
                            // out of view
                            entry.target.classList.remove(classNameInView)
                        } else {
                            entry.target.classList.add(classNameInView)
                        }
                    })
                }

                this.observer = new IntersectionObserver(handleIntersect, settings)
            } else {
                this.observer = undefined
            }
        }

        componentWillUnmount() {
            if (this.observer)
                this.observer.disconnect()
        }

        render() {
            const props = {
                ...this.props,
                ...this.state
            }

            return (
                <WrappedComponent
                    observer={this.observer}
                    {...props}
                >
                    {this.props.children}
                </WrappedComponent>
            )
        }
    }

)

export const observerItem = () => (WrappedComponent) => {

    class ObserverItem extends Component {

        componentDidMount() {
            if (!this._item && typeof document !== 'undefined') {
                // console.log('observerItem this', this)
                const { findDOMNode } = require('react-dom')
                this._item = findDOMNode(this)
            }
            // console.log('componentDidMount', this.observer, this._item)
            if (this.observer && this._item)
                this.observer.observe(this._item)
        }
        componentWillUnmount() {
            if (this.observer && this._item)
                this.observer.unobserve(this._item)
        }

        render() {
            const {
                children,
                observer,
                forwardedRef,
                ...props
            } = this.props

            this.observer = observer

            return (
                <WrappedComponent
                    ref={forwardedRef}
                    {...props}
                    {...this.state}
                >
                    {children}
                </WrappedComponent>
            )
        }
    }

    return React.forwardRef((props, ref) => {
        return <ObserverItem {...props} forwardedRef={ref} />
    })
}
