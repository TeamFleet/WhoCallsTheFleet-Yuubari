import React from 'react'
import { ImportStyle } from 'sp-css-import'

const ImprovementStar = ({ star, level, lvl, children, ...props }) => (
    <span
        {...props}
        children={'★+' + (star || level || lvl || children)}
    />
)

export default ImportStyle(require('./styles.less'))(ImprovementStar)