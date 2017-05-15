import React from 'react'

import db from '../../../logic/database'

import { ImportStyle } from 'sp-css-import'
import styleTitle from './title.less'

@ImportStyle(styleTitle)
export default class ShipListTitle extends React.Component {
    render() {
        if (this.props.type) {
            const type = db.shipTypes[this.props.type]
            return (
                <h4 className={this.props.className}>
                    {type.full_zh}
                    {type.code && (<small className="code">[{type.code}]</small>)}
                </h4>
            )
        } else
            return (
                <h4 className={this.props.className}>--</h4>
            )
    }
}