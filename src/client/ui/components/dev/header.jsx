import React from 'react'

import MainHeader from 'UI/components/main-header.jsx'

import { ImportStyle } from 'sp-css-import'
import style from './header.less'

@ImportStyle(style)
export default class extends React.Component {
    render() {
        return (
            <MainHeader>
                <div className={this.props.className}>
                    <h2>THIS IS A MASK!</h2>
                </div>
            </MainHeader>
        )
    }
}