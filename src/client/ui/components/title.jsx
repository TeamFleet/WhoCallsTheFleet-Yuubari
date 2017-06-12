import React from 'react'

import { ImportStyle } from 'sp-css-import'
import styles from './title.less'

@ImportStyle(styles)
export default class Title extends React.Component {
    render() {
        const TagName = this.props.tag || this.props.tagname || 'div'
        return (
            <TagName className={this.props.className}>
                {this.props.children}
            </TagName>
        )
    }
}