import React from 'react'
import { ImportStyle } from 'sp-css-import'

@ImportStyle(require('./title.less'))
export default class Title extends React.Component {
    render() {
        const {
            className,
            component, tag, tagname, element,
            children,
            type,
            ...props
        } = this.props

        const Component = component || tag || tagname || element || 'div'

        const classNames = className.split(' ')
        const classNameSelf = classNames[0]
        // const classNameComponent = classNames.length
        //     ? [classNameSelf + '-child'].concat(classNames.slice(1)).join(' ')
        //     : undefined

        switch (type) {
            case 'line-append': {
                return (
                    <div className={className} data-title-type={type}>
                        <Component className={classNameSelf + '-child'} {...props}>
                            {children}
                        </Component>
                    </div>
                )
            }
        }

        return (
            <Component data-title-type={type} className={className} {...props}>
                {children}
            </Component>
        )
    }
}
