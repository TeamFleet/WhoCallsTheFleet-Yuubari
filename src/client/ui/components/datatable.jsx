import React from 'react'

import { ImportStyle } from 'sp-css-import'
import style from './datatable.less'

@ImportStyle(style)
export default class DataTable extends React.Component {
    componentDidUpdate(prevProps) {
        // console.log(prevProps.scrollLeft, this.props.scrollLeft, this._table, this._table.scrollLeft)
        if (!this._table || typeof this.props.scrollLeft === 'undefined' || this._table.scrollLeft === this.props.scrollLeft)
            return
        this._table.scrollLeft = this.props.scrollLeft
    }

    renderHeader() {
        if (!this.props.headers) return null
        const TagName = this.props.tag || 'thead'
        return (
            <TagName className="header">
                {this.renderRow(this.props.headers)}
            </TagName>
        )
    }

    renderBody() {
        if (!this.props.data) return null
        const TagName = this.props.tag || 'tbody'
        return (
            <TagName className="body">
                {this.props.data.map((row, index) => {
                    if (typeof row === 'object' && row.cells)
                        return this.renderRow(row.cells, row.key || index, row.props)
                    return this.renderRow(row, index)
                })}
            </TagName>
        )
    }

    renderRow(data, index = 0, props = {}) {
        const TagName = this.props.tag || 'tr'
        return (
            <TagName className="row" key={index} {...props}>
                {data.map((children, index2) => this.renderCell(children, index, index2))}
            </TagName>
        )
    }

    renderCell(data, indexRow, indexCell) {
        const TagName = this.props.tag || 'td'
        let content = data
        let props = {}

        if (Array.isArray(data)) {
            content = data[0]
            props = data[1]
        }

        if (props.className)
            props.className = 'cell ' + props.className
        else
            props.className = 'cell'

        return (
            <TagName key={indexRow + '-' + indexCell} {...props}>
                {content}
            </TagName>
        )
    }

    render() {
        // const {
        //     tag,
        //     className,
        //     headers,
        //     data,
        //     scrollLeft,
        //     children,
        //     ...props
        // } = this.props

        const TagName = this.props.tag || 'table'

        return (
            <TagName
                className={this.props.className
                    + (TagName !== 'table' ? ' flex' : '')
                }
                onScroll={this.props.onScroll}
                ref={el => this._table = el}
            >
                {this.renderHeader()}
                {this.renderBody()}
            </TagName>
        )
    }
}