import React from 'react'
import { extend } from 'koot'

import Icon from '@ui/components/icon'

const UnderConstruction = extend({
    styles: require('./styles.less')
})(
    ({
        className,
        component, tag, element,
    }) => {
        const Component = component || tag || element || 'span'
        return (
            <Component className={className}>
                <Icon icon="warning2" className="icon" />
                {__('under_construction')}
            </Component>
        )
    }
)

export default UnderConstruction
