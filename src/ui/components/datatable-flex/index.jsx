import React from 'react'
import { extend } from 'koot'


const Base = ({ tag, element, component, ...props }) => {
    const Component = tag || element || component || 'div'
    return (
        <Component {...props} />
    )
}


//


const DataTableFlex = extend({
    styles: require('./styles.less')
})(
    (props) => <Base {...props} />
)
export default DataTableFlex


//


export const Body = extend({
    styles: require('./styles-body.less')
})(
    (props) => <Base {...props} />
)


//


export const Row = extend({
    styles: require('./styles-row.less')
})(
    (props) => <Base {...props} />
)


//


export const Cell = extend({
    styles: require('./styles-cell.less')
})(
    (props) => <Base {...props} />
)
