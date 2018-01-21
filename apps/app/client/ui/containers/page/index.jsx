import React from 'react'
import { connect } from 'react-redux'

import SpPageContainer from 'sp-ui-pagecontainer'

const lastScrollY = {}

/**
 * Page - a container component. Will restore last scroll position when re-mounting.
 * 
 * @prop {string} pathname Pathname for this page, can be extracted from a react-router component's `this.props.location.pathname`.
 * @prop {boolean} [rendering=false] Flag for wheather this page component is currently rendering or loading data. When this prop change from `true` to `false`, last scroll position will be restored.
 */
@connect(state => ({
    locationBeforeTransitions: state.routing.locationBeforeTransitions
}))
export default class extends React.Component {
    restoreScrollY() {
        if (typeof lastScrollY[this.props.pathname] !== 'undefined') {
            // console.log('restoring scrollY')
            window.scrollTo(undefined, lastScrollY[this.props.pathname])
            delete lastScrollY[this.props.pathname]
        }
    }

    shouldComponentUpdate(newProps) {
        // un-mounting
        if (newProps.pathname !== newProps.locationBeforeTransitions.pathname) {
            if (__DEV__)
                console.log(
                    `⏏ UN-MOUNTING:`
                    + ` ${newProps.pathname} -> ${newProps.locationBeforeTransitions.pathname}`
                    + ` @0,${window.scrollY}`
                )
            lastScrollY[newProps.pathname] = window.scrollY
            return false
        }

        // rendered
        if (newProps.rendering !== this.props.rendering && !newProps.rendering) {
            this.restoreScrollY()
            return false
        }

        return true
    }

    componentDidMount() {
        if (!this.props.rendering && this.props.locationBeforeTransitions.action === 'POP')
            this.restoreScrollY()
    }

    render() {
        const {
            locationBeforeTransitions,
            rendering,
            ...props
        } = this.props

        // if (__DEV__ && __CLIENT__) console.log('render', locationBeforeTransitions)

        return (
            <SpPageContainer
                {...props}
            />
        )
    }
}