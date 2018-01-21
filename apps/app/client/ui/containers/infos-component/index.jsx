import React from 'react'

import Title from '@appUI/components/title'

import { ImportStyle } from 'sp-css-import'
import styles from './styles.less'

// @connect()
@ImportStyle(styles)
export default class InfosComponentContainer extends React.Component {
    renderTitle(title) {
        if (typeof title === 'undefined' || title === null) return null

        if (typeof title !== 'object' && typeof title !== 'function')
            return <Title tag="h2" className="title">{title}</Title>

        return title
    }
    render() {
        const {
            title,
            children,
            ...props
        } = this.props

        return (
            <div {...props}>
                {this.renderTitle(title)}
                {children}
            </div>
        )
    }
}