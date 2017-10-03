import React from 'react'
import { ImportStyle } from 'sp-css-import'

@ImportStyle(require('./title.less'))
export default class Title extends React.Component {
    render() {
        const {
            component, tag, tagname, element,
            children,
            ...props
        } = this.props
        const Component = component || tag || tagname || element || 'div'
        return (
            <Component {...props}>
                {children}
            </Component>
        )
    }
}
