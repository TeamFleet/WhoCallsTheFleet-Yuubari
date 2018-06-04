import React from 'react'
import classNames from 'classnames'
import { ImportStyle } from 'sp-css-import'

@ImportStyle(require('./styles.less'))
export default class Image extends React.Component {
    state = {
        isLoading: true,
        isLoaded: false,
        isError: false
    }

    onLoad(/*evt*/) {
        this.setState({
            isLoading: false,
            isLoaded: true
        })
    }

    onError(/*evt*/) {
        this.setState({
            isLoading: false,
            isError: true
        })
    }

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
        } = this.props

        const Component = tag || component || 'span'
        const src = _src || _img || _pic || _picture || undefined

        return (
            <Component className={classNames({
                [className]: true,
                'is-loading': this.state.isLoading,
                'is-loaded': this.state.isLoaded,
                'is-error': this.state.isError
            })} {...props}>
                <img
                    className={classNames(['img', classNameImg])}
                    src={src}
                    onLoad={this.onLoad.bind(this)}
                    onError={this.onError.bind(this)}
                    style={styleImg}
                />
                {children}
            </Component>
        )
    }
}
