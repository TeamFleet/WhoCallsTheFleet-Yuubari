import { Component } from 'react';
import classNames from 'classnames';
import { extend } from 'koot';

@extend({
    styles: require('./styles.less'),
})
class Image extends Component {
    state = {
        isLoading: true,
        isLoaded: false,
        isError: false,
    };

    onLoad(/*evt*/) {
        this.setState({
            isLoading: false,
            isLoaded: true,
        });
    }
    onLoad = this.onLoad.bind(this);

    onError(/*evt*/) {
        this.setState({
            isLoading: false,
            isError: true,
        });
    }
    onError = this.onError.bind(this);

    render() {
        const {
            className,
            classNameImg,
            children,
            tag,
            component,

            src: _src,
            img: _img,
            pic: _pic,
            picture: _picture,

            styleImg,

            ...props
        } = this.props;

        const Component = tag || component || 'span';
        const src = _src || _img || _pic || _picture || undefined;

        return (
            <Component
                className={classNames({
                    [className]: true,
                    'is-loading': this.state.isLoading,
                    'is-loaded': this.state.isLoaded,
                    'is-error': this.state.isError,
                })}
                {...props}
            >
                <img
                    className={classNames(['img', classNameImg])}
                    src={src}
                    onLoad={this.onLoad}
                    onError={this.onError}
                    style={styleImg}
                    loading="lazy"
                    alt={tag}
                />
                {children}
            </Component>
        );
    }
}

export default Image;
