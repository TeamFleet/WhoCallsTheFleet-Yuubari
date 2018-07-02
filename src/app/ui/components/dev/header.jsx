import React from 'react'

import { ImportStyle } from 'sp-css-import'

import Title from '@ui/components/title'
import MainHeader from '@ui/components/main-header'

@ImportStyle(require('./header.less'))
export default class extends React.Component {
    render() {
        return (
            <MainHeader>
                <div className={this.props.className}>
                    <Title component="h2">@ui/components/main-header</Title>
                </div>
            </MainHeader>
        )
    }
}
