import React from 'react'

import { ImportStyle } from 'sp-css-import'

import Title from '@appUI/components/title'
import MainHeader from '@appUI/components/main-header'

@ImportStyle(require('./header.less'))
export default class extends React.Component {
    render() {
        return (
            <MainHeader>
                <div className={this.props.className}>
                    <Title component="h2">@appUI/components/main-header</Title>
                </div>
            </MainHeader>
        )
    }
}