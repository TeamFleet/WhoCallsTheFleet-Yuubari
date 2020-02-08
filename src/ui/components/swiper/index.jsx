import React from 'react';
import { extend } from 'koot';
import './swiper.g.less';

const Swiper = typeof window !== 'undefined' && require('swiper').default;

const defaults = {
    // speed: 400,
    // spaceBetween: 100
};

@extend({
    styles: require('./styles.less')
})
class SwiperComponent extends React.Component {
    // swiper
    ContainerRef = React.createRef();
    PrevButtonRef = React.createRef();
    NextButtonRef = React.createRef();

    componentDidMount() {
        if (
            Swiper &&
            !this.swiper &&
            this.ContainerRef &&
            this.ContainerRef.current
        ) {
            const { ...settings } = this.props;

            delete settings.className;
            delete settings.children;
            delete settings.slides;

            if (settings.pagination === true) {
                settings.pagination = {
                    el: '.swiper-pagination',
                    clickable: true
                };
            }

            ['prevButton', 'nextButton'].forEach(key => {
                if (
                    settings[key] === true ||
                    React.isValidElement(settings[key])
                ) {
                    if (typeof settings.navigation !== 'object')
                        settings.navigation = {};

                    if (key === 'prevButton')
                        settings.navigation.prevEl = this.PrevButtonRef.current;
                    if (key === 'nextButton')
                        settings.navigation.nextEl = this.NextButtonRef.current;

                    delete settings[key];
                }
            });

            ['prevButton', 'nextButton', 'scrollbar'].forEach(key => {
                if (typeof settings[key] === 'boolean') delete settings[key];
            });

            ['controlsWrapper'].forEach(key => {
                delete settings[key];
            });

            if (typeof settings.on === 'object') {
                const createEventHandler = (eventName, handler) => (
                    ...args
                ) => {
                    setTimeout(() => {
                        // console.log(eventName, this.swiper, ...args)
                        handler(this.swiper, ...args);
                    });
                };
                for (const eventName of Object.keys(settings.on)) {
                    if (typeof settings.on[eventName] === 'function') {
                        const handler = settings.on[eventName];
                        settings.on[eventName] = createEventHandler(
                            eventName,
                            handler
                        );
                    }
                }
            }

            // console.log('swiper init', settings)

            setTimeout(() => {
                this.swiper = new Swiper(this.ContainerRef.current, {
                    ...defaults,
                    ...settings
                });

                this._init = true;
            });
        }
    }

    renderButtonPrev(prevButton = this.props.prevButton) {
        if (
            typeof prevButton !== 'undefined' &&
            prevButton !== false &&
            prevButton !== null
        )
            return (
                <div className="swiper-button-prev" ref={this.PrevButtonRef}>
                    {prevButton !== true && prevButton}
                </div>
            );

        return undefined;
    }

    renderButtonNext(nextButton = this.props.nextButton) {
        if (
            typeof nextButton !== 'undefined' &&
            nextButton !== false &&
            nextButton !== null
        )
            return (
                <div className="swiper-button-next" ref={this.NextButtonRef}>
                    {nextButton !== true && nextButton}
                </div>
            );

        return undefined;
    }

    render() {
        return (
            <div
                className={'swiper-container ' + this.props.className}
                ref={this.ContainerRef}
            >
                <div className="swiper-wrapper">
                    {this.props.slides.map((el, index) => (
                        <div className="swiper-slide" key={index}>
                            {el}
                            {this.props.lazy && (
                                <div className="swiper-lazy-preloader"></div>
                            )}
                        </div>
                    ))}
                </div>

                {this.props.controlsWrapper && (
                    <div className="swiper-controls">
                        {this.props.pagination === true && (
                            <div className="swiper-pagination"></div>
                        )}
                        {this.renderButtonPrev()}
                        {this.renderButtonNext()}
                        {React.isValidElement(this.props.controlsWrapper) &&
                            this.props.controlsWrapper}
                    </div>
                )}

                {!this.props.controlsWrapper &&
                    this.props.pagination === true && (
                        <div className="swiper-pagination"></div>
                    )}
                {!this.props.controlsWrapper && this.renderButtonPrev()}
                {!this.props.controlsWrapper && this.renderButtonNext()}

                {this.props.scrollbar === true && (
                    <div className="swiper-scrollbar"></div>
                )}

                {this.props.children}
            </div>
        );
    }
}
export default SwiperComponent;
