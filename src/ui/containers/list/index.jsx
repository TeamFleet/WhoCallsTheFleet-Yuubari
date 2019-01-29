import React from 'react'
import classNames from 'classnames'
import { extend } from 'koot'

// import times from '@utils/times'

// export const placeholders = (() => {
//     const arr = []
//     times(10)(index => arr.push(
//         <span className="item placeholder" key={index}></span>
//     ))
//     return arr
// })()

const ListContainer = extend({
    styles: require('./styles.less')
})(
    ({
        className,
        grid = true,
        children,
        ...props
    }) =>
        <div
            className={classNames({
                [className]: true,
                'mod-grid': !!grid,
            })}
            {...props}
        >
            {children}
            {/* {grid && placeholders} */}
        </div>
)
export default ListContainer
