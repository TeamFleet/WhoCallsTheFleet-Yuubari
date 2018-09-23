import React from 'react'
import { ImportStyle } from 'sp-css-import'

const Swiper = typeof window !== 'undefined' && require('swiper').default
if (typeof document !== 'undefined' && !document.getElementById('__swiper')) {
    const style = document.createElement('style')
    style.id = '__swiper'
    style.type = "text/css"
    style.innerHTML = __SWIPER_CSS__
    document.getElementsByTagName('head')[0].appendChild(style)
}

const defaults = {
    // speed: 400,
    // spaceBetween: 100
}

@ImportStyle(require('./styles.less'))
export default class extends React.Component {
    componentDidMount() {
        // if (typeof window !== 'undefined')
        //     require('swiper/dist/css/swiper.min.css')
        // if (typeof window !== 'undefined')
        //     require('./swiper.g.less')
        if (Swiper && !this._init) {
            let thisSwiper

            const {
                ...props
            } = this.props

            delete props.className
            delete props.children
            delete props.slides;

            if (this.props.pagination === true) {
                // props.pagination = '.swiper-pagination'
                // props.paginationClickable = true
                props.pagination = {
                    el: '.swiper-pagination',
                    clickable: true
                }
            }

            [
                'prevButton',
                'nextButton',
            ].forEach(key => {
                if (this.props[key] === true || React.isValidElement(props[key])) {
                    if (typeof props.navigation !== 'object')
                        props.navigation = {}
                    // props[key] = this['_' + key]

                    if (key === 'prevButton')
                        props.navigation.prevEl = this['_' + key]
                    if (key === 'nextButton')
                        props.navigation.nextEl = this['_' + key]

                    delete props[key]
                }
            });

            [
                'prevButton',
                'nextButton',
                'scrollbar'
            ].forEach(key => {
                if (typeof props[key] === 'boolean') delete props[key]
            });

            [
                'controlsWrapper'
            ].forEach(key => {
                delete props[key]
            });

            if (typeof props.on === 'object') {
                for (const event in props.on) {
                    if (typeof props.on[event] === 'function') {
                        const cb = props.on[event]
                        props.on[event] = (...args) => {
                            setTimeout(() => {
                                // console.log(event, thisSwiper, ...args)
                                cb(thisSwiper, ...args)
                            })
                        }
                    }
                }
            }

            // console.log('swiper init', props)

            thisSwiper = new Swiper(
                this._container,
                Object.assign(defaults, props)
            )

            this._init = true
        }
    }

    renderButtonPrev(prevButton = this.props.prevButton) {
        if (
            typeof prevButton !== 'undefined'
            && prevButton !== false
            && prevButton !== null
        )
            return (
                <div
                    className="swiper-button-prev"
                    ref={el => this._prevButton = el}
                >
                    {prevButton !== true && prevButton}
                </div>
            )

        return undefined
    }

    renderButtonNext(nextButton = this.props.nextButton) {
        if (
            typeof nextButton !== 'undefined'
            && nextButton !== false
            && nextButton !== null
        )
            return (
                <div
                    className="swiper-button-next"
                    ref={el => this._nextButton = el}
                >
                    {nextButton !== true && nextButton}
                </div>
            )

        return undefined
    }

    render() {
        return (
            <div className={"swiper-container " + this.props.className} ref={el => this._container = el}>
                <div className="swiper-wrapper">
                    {this.props.slides.map((el, index) => (
                        <div className="swiper-slide" key={index}>
                            {el}
                            {this.props.lazy && <div className="swiper-lazy-preloader"></div>}
                        </div>
                    ))}
                </div>

                {this.props.controlsWrapper && <div className="swiper-controls">
                    {this.props.pagination === true && <div className="swiper-pagination"></div>}
                    {this.renderButtonPrev()}
                    {this.renderButtonNext()}
                    {React.isValidElement(this.props.controlsWrapper) && this.props.controlsWrapper}
                </div>}

                {!this.props.controlsWrapper && this.props.pagination === true && <div className="swiper-pagination"></div>}
                {!this.props.controlsWrapper && this.renderButtonPrev()}
                {!this.props.controlsWrapper && this.renderButtonNext()}

                {this.props.scrollbar === true && <div class="swiper-scrollbar"></div>}

                {this.props.children}
            </div>
        )
    }
}
