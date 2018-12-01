import React from 'react'
import { extend } from 'koot'

import Title from '@ui/components/title'

@extend({
    styles: require('./styles.less')
})
class InfosComponentContainer extends React.Component {
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

export default InfosComponentContainer
