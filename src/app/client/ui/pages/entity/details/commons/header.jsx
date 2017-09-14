import React from 'react'

// import translate, { localeId } from 'sp-i18n'
// import db from '@appLogic/database'

import Header from '@appUI/containers/infos-header'

import { ImportStyle } from 'sp-css-import'

@ImportStyle(require('./header.less'))
export default class EntityDetailsHeader extends React.Component {
    render() {
        if (!this.props.entity) return null

        return (
            <Header
                className={this.props.className}
                title={this.props.entity._name}
            >
            </Header>
        )
    }
}