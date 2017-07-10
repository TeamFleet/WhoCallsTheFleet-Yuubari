import React from 'react'
const Swiper = __CLIENT__ && require('swiper')
if (__CLIENT__) require('swiper/dist/css/swiper.css')

import { ImportStyle } from 'sp-css-import'
import style from './styles.less'

const defaults = {
    speed: 400,
    spaceBetween: 100
}

@ImportStyle(style)
export default class extends React.Component {
    componentDidMount() {
        if (Swiper) {
            const { ...props } = this.props
            delete props.className
            delete props.children
            delete props.slides;

            [
                'pagination',
                'prevButton',
                'nextButton',
                'scrollbar'
            ].forEach(key => {
                if (typeof props[key] === 'boolean') delete props[key]
            })

            this.illusts = new Swiper(
                this._container,
                Object.assign(defaults, props)
            );
        }
    }

    render() {
        return (
            <div className={"swiper-container " + this.props.className} ref={el => this._container = el}>
                <div className="swiper-wrapper">
                    {this.props.slides.map((el, index) => <div className="swiper-slide" key={index}>{el}</div>)}
                </div>
                {this.props.pagination && <div className="swiper-pagination"></div>}
                {this.props.prevButton && <div className="swiper-button-prev"></div>}
                {this.props.nextButton && <div className="swiper-button-next"></div>}
                {this.props.scrollbar && <div class="swiper-scrollbar"></div>}
            </div>
        )
    }
}