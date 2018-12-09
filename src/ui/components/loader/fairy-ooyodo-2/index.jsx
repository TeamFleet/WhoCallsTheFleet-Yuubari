import React from 'react'
import { ImportStyle } from 'sp-css-import'

export default ImportStyle(require('./styles.less'))(
    (props) => (
        <span {...props} />
    )
)