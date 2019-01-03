import React from 'react'
import { extend } from 'koot'

const UnderConstruction = extend({
    styles: require('./styles.less')
})(
    ({
        className,
        component, tag, element,
    }) => {
        const Component = component || tag || element || 'span'
        return (
            <Component className={className} children={__('under_construction')} />
        )
    }
)

export default UnderConstruction
