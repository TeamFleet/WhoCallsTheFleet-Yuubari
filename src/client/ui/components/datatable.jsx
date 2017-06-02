import React from 'react'

import { ImportStyle } from 'sp-css-import'
import style from './datatable.less'

@ImportStyle(style)
export default class DataTable extends React.Component {
    renderHeader() {
        if(!this.props.headers) return null
        const TagName = this.props.tag || 'thead'
        return (
            <TagName className="header">
                {this.renderRow(this.props.headers)}
            </TagName>
        )
    }

    renderBody() {
        if(!this.props.data) return null
        const TagName = this.props.tag || 'tbody'
        return (
            <TagName className="body">
                {this.props.data.map(this.renderRow.bind(this))}
            </TagName>
        )
    }

    renderRow(data, index = 0) {
        const TagName = this.props.tag || 'tr'
        const TagNameCell = this.props.tag || 'td'
        return (
            <TagName className="row" key={index}>
                {data.map((children, index2) => 
                    <TagNameCell className="cell" key={index + '-' + index2}>
                        {children}
                    </TagNameCell>
                )}
            </TagName>
        )
    }

    render() {
        const TagName = this.props.tag || 'table'
        return (
            <TagName className={
                this.props.className + 
                (TagName !== 'table' ? ' flex' : '')
            }>
                {this.renderHeader()}
                {this.renderBody()}
            </TagName>
        )
    }
}