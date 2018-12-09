import React from 'react'
import { extend } from 'koot'

import getSubtitle from '../get-subtitle'
// import db from '@database'

import Header from '@ui/components/main-header/infos'

@extend({
    connect: state => ({
        localeId: state.localeId
    }),
    styles: require('./header.less')
})
class EntityDetailsHeader extends React.Component {
    render() {
        if (!this.props.entity) return null

        const {
            className,
            entity,
            // ...props
        } = this.props

        let subtitle = getSubtitle(entity)

        return (
            <Header
                className={className}
                title={entity._name}
                subtitle={subtitle}
            >
                {this.props.localeId !== 'ja' && (
                    <span className="name-ja">{entity.getName('ja_jp')}</span>
                )}
            </Header>
        )
    }
}

export default EntityDetailsHeader
