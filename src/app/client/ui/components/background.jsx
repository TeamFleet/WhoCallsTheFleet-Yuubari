import React from 'react'
import { connect } from 'react-redux'

import getStyles from '@appUtils/background-styles.js'

import { ImportStyle } from 'sp-css-import'
import style from './background.less'

@connect(state => ({
    currentBg: state.bgimg.current
}))
@ImportStyle(style)
export default class extends React.Component {
    render() {
        return (
            <div className={"background-container " + this.props.className}>
                <div
                    className="background"
                    style={getStyles(this.props.currentBg, this.props.type)}
                />
            </div>
        )
    }
}