import React from 'react'
import { extend } from 'koot'

const lastScrollY = {}

/**
 * Page - a container component. Will restore last scroll position when re-mounting.
 * 
 * @prop {string} pathname Pathname for this page, can be extracted from a react-router component's `this.props.location.pathname`.
 * @prop {boolean} [rendering=false] Flag for wheather this page component is currently rendering or loading data. When this prop change from `true` to `false`, last scroll position will be restored.
 */
@extend({
    connect: state => ({
        locationBeforeTransitions: state.routing.locationBeforeTransitions
    })
})
class ContainerPage extends React.Component {
    updating = false

    restoreScrollY() {
        if (typeof lastScrollY[this.props.pathname] !== 'undefined') {
            // console.log('restoring scrollY')
            window.scrollTo(undefined, lastScrollY[this.props.pathname])
            delete lastScrollY[this.props.pathname]
        }
    }

    shouldComponentUpdate(newProps) {
        // un-mounting
        if (
            // !this.updating &&
            typeof this.props.locationBeforeTransitions === 'object' &&
            typeof newProps.locationBeforeTransitions === 'object' &&
            // newProps.pathname !== newProps.locationBeforeTransitions.pathname
            this.props.locationBeforeTransitions.pathname !== newProps.locationBeforeTransitions.pathname
        ) {
            if (__DEV__) {
                const style = (str) => [
                    `line-height: 2em`,
                    `display: inline-block`,
                    `margin: 0 -7px`,
                    `border-radius: 100px`,
                    `padding: 0 1em`,
                    `float: left`,
                    str,
                ].join(';')
                console.log(
                    `%c%s%c%s%c%s`,
                    style(`background: #800; color: #fee;`),
                    `[Page] onChange/onUnmount`,
                    style(`background: #080; color: #efe;`),
                    `${this.props.locationBeforeTransitions.pathname} -> ${newProps.locationBeforeTransitions.pathname}`,
                    style(`background: #008; color: #eef;`),
                    `@ 0,${window.scrollY}`,
                )
            }
            lastScrollY[this.props.locationBeforeTransitions.pathname] = window.scrollY
            return false
        }

        // rendered
        // console.log(newProps.rendering, this.props.rendering)
        if (
            // !this.updating &&
            newProps.rendering !== this.props.rendering && !newProps.rendering
        ) {
            this.restoreScrollY()
            return false
        }

        this.updating = true
        return true
    }

    componentDidMount() {
        if (this.props.locationBeforeTransitions.action === 'POP') {
            if (!this.props.rendering) this.restoreScrollY()
        } else
            delete lastScrollY[this.props.pathname]
    }

    componentDidUpdate() {
        this.updating = false
    }

    render() {
        const { ...props } = this.props;

        [
            'locationBeforeTransitions',
            'rendering',
            'dispatch',
        ].forEach(key => delete props[key])

        // if (__DEV__ && __CLIENT__) console.log('render', locationBeforeTransitions)

        return (
            <div
                {...props}
            />
        )
    }
}

export default ContainerPage
