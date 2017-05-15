import React from 'react'

import translate from 'sp-i18n'
import db from '../../../logic/database'

import { ImportStyle } from 'sp-css-import'
import styleSubTitle from './title-sub.less'

@ImportStyle(styleSubTitle)
export default class ShipListTitleSub extends React.Component {
    render() {
        return (
            <h5 className={this.props.className}>
                {translate("shipclass", { class: db.shipClasses[this.props.class].name_zh })}
            </h5>
        )
    }
}