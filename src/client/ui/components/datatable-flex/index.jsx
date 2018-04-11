import React from 'react'

import { ImportStyle } from 'sp-css-import'

@ImportStyle(require('./styles.less'))
export default class DataTableFlex extends React.Component {
    render() {
        const {
            TagName,
            children,
            ...props
        } = this.props

        const Component = TagName || 'div'

        return (
            <Component
                ref={el => this._table = el}
                {...props}
            >
                {children}
            </Component>
        )
    }
}

@ImportStyle(require('./styles-body.less'))
export class Body extends React.Component {
    render() {
        const {
            TagName,
            children,
            ...props
        } = this.props

        const Component = TagName || 'div'

        return (
            <Component {...props}>
                {children}
            </Component>
        )
    }
}

@ImportStyle(require('./styles-row.less'))
export class Row extends React.Component {
    render() {
        const {
            TagName,
            children,
            ...props
        } = this.props

        const Component = TagName || 'div'

        return (
            <Component {...props}>
                {children}
            </Component>
        )
    }
}

@ImportStyle(require('./styles-cell.less'))
export class Cell extends React.Component {
    render() {
        const {
            TagName,
            children,
            ...props
        } = this.props

        const Component = TagName || 'div'

        return (
            <Component {...props}>
                {children}
            </Component>
        )
    }
}