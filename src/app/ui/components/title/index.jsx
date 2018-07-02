import React from 'react'
import classNames from 'classnames'
import { ImportStyle } from 'sp-css-import'

@ImportStyle(require('./styles.less'))
export default class Title extends React.Component {
    render() {
        // console.log(this.props)
        const {
            className, classNameInner,
            component, tag, tagname, element, level,
            children,
            type, inherit,
            ...props
        } = this.props

        const Component = component
            || tag
            || tagname
            || element
            || (typeof level === 'undefined' ? undefined : `h${level}`)
            || 'div'

        const arrClassName = className.split(' ')
        const classNameSelf = arrClassName[0]
        // const classNameComponent = classNames.length
        //     ? [classNameSelf + '-child'].concat(classNames.slice(1)).join(' ')
        //     : undefined

        props.children = children
        props['data-text'] = children
        if (inherit) {
            props['data-title-is-inherit'] = ""
        }

        switch (type) {
            case 'line-append': {
                return (
                    <div className={className} data-title-type={type}>
                        <Component
                            className={classNames([classNameSelf + '-child', classNameInner])}
                            {...props}
                        />
                    </div>
                )
            }
        }

        return (
            <Component
                data-title-type={type}
                className={className}
                {...props}
            />
        )
    }
}
