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
            children,
            ...props
        } = this.props

        return (
            <div {...props}>
                {children}
                {this.insertPlaceHolders()}
            </div>
        )
    }
}