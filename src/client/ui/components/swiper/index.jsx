import React from 'react'

const Swiper = typeof window !== 'undefined' && require('swiper')
typeof window !== 'undefined' && require('swiper/dist/css/swiper.min.css')

import { ImportStyle } from 'sp-css-import'
import style from './styles.less'

const defaults = {
    // speed: 400,
    // spaceBetween: 100
}

@ImportStyle(style)
export default class extends React.Component {
    componentDidMount() {
        if (Swiper) {
            const { ...props } = this.props
            delete props.className
            delete props.children
            delete props.slides;

            if (this.props.pagination === true) {
                props.pagination = '.swiper-pagination'
                props.paginationClickable = true
            }

            [
                'prevButton',
                'nextButton',
            ].forEach(key => {
                if (this.props[key] === true || React.isValidElement(props[key])) {
                    props[key] = this['_' + key]
                }
            });

            [
                'prevButton',
                'nextButton',
                'scrollbar',
                'controlsWrapper'
            ].forEach(key => {
                if (typeof props[key] === 'boolean') delete props[key]
            })

            this.illusts = new Swiper(
                this._container,
                Object.assign(defaults, props)
            );
        }
    }

    renderButtonPrev() {
        if (this.props.prevButton === true)
            return <div className="swiper-button-prev" ref={el => this._prevButton = el}></div>
        else if (React.isValidElement(this.props.prevButton))
            return <div className="swiper-button-prev" ref={el => this._prevButton = el}>{this.props.prevButton}</div>
        else
            return undefined
    }

    renderButtonNext() {
        if (this.props.nextButton === true)
            return <div className="swiper-button-next" ref={el => this._nextButton = el}></div>
        else if (React.isValidElement(this.props.nextButton))
            return <div className="swiper-button-next" ref={el => this._nextButton = el}>{this.props.nextButton}</div>
        else
            return undefined
    }

    render() {
        return (
            <div className={"swiper-container " + this.props.className} ref={el => this._container = el}>
                <div className="swiper-wrapper">
                    {this.props.slides.map((el, index) => (
                        <div className="swiper-slide" key={index}>
                            {el}
                            {this.props.lazyLoading && <div className="swiper-lazy-preloader"></div>}
                        </div>
                    ))}
                </div>

                {this.props.controlsWrapper && <div className="swiper-controls">
                    {this.props.pagination === true && <div className="swiper-pagination"></div>}
                    {this.renderButtonPrev()}
                    {this.renderButtonNext()}
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