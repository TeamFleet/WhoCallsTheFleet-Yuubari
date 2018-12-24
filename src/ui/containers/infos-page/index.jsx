import React from 'react'
import classNames from 'classnames'
import { extend } from 'koot'

import Page from '@ui/containers/page'

const InfosPageContainer = extend({
    styles: require('./styles.less')
})(
    ({
        className,
        ['has-tabs']: hasTabs = true,
        ...props
    }) =>
        <Page
            className={classNames({
                [className]: true,
                'has-tabs': hasTabs
            })}
            {...props}
        />
)
export default InfosPageContainer
