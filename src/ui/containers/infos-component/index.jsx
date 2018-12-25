import React from 'react'
import { extend } from 'koot'

import Title from '@ui/components/title'

const InfosComponentContainer = extend({
    styles: require('./styles.less')
})(
    ({ title, titleType, children, ...props }) => (
        <div {...props}>
            {(() => {
                if (typeof title === 'undefined' || title === null)
                    return null

                if (typeof title !== 'object' && typeof title !== 'function')
                    return <Title tag="h2" className="title" type={titleType} inherit={true}>{title}</Title>

                return title
            })()}
            {children}
        </div>
    )
)

export default InfosComponentContainer
