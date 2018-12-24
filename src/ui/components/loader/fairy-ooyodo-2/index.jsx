import React from 'react'
import { extend } from 'koot'

const LoaderFairyOoyodo2 = extend({
    styles: require('./styles.less')
})(
    (props) => <span {...props} />
)

export default LoaderFairyOoyodo2
