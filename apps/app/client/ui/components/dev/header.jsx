import React from 'react'

import MainHeader from '@appUI/components/main-header'

import { ImportStyle } from 'sp-css-import'
import style from './header.less'

@ImportStyle(style)
export default class extends React.Component {
    render() {
        return (
            <MainHeader>
                <div className={this.props.className}>
                    <h2>@appUI/components/main-header</h2>
                </div>
            </MainHeader>
        )
    }
}