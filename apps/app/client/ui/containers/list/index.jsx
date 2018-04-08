import React from 'react'
import { ImportStyle } from 'sp-css-import'

// @connect()
@ImportStyle(require('./styles.less'))
export default class ListContainer extends React.Component {
    insertPlaceHolders() {
        let i = 0;
        let arr = []
        while (i++ < 10)
            arr.push(<span className="item placeholder" key={i}></span>)
        return arr
    }
    render() {
        const {
            className: _className,
            grid = true,
            children,
            ...props
        } = this.props

        const className = _className.split(' ')
        if (grid) className.push('mod-grid')

        return (
            <div className={className.join(' ')} {...props}>
                {children}
                {grid && this.insertPlaceHolders()}
            </div>
        )
    }
}