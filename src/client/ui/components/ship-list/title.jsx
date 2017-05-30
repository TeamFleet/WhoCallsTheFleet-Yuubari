import React from 'react'

import translate from 'sp-i18n'
import db, { locale as dbLocaleId } from 'Logic/database'

import { ImportStyle } from 'sp-css-import'
import styleTitle from './title.less'

@ImportStyle(styleTitle)
export default class ShipListTitle extends React.Component {
    render() {
        if (this.props.type) {
            const type = db.shipTypes[this.props.type]
            return (
                <h4 className={this.props.className}>
                    {type.name[dbLocaleId] || type.name.ja_jp}
                    {type.code && (<small className="code">[{type.code}]</small>)}
                </h4>
            )
        } else if (this.props.class) {
            return (
                <h5 className={this.props.className + ' is-sub'}>
                    {translate("shipclass", {
                        class: db.shipClasses[this.props.class].name[dbLocaleId] || db.shipClasses[this.props.class].name.ja_jp
                    })}
                </h5>
            )
        } else
            return (
                <h4 className={this.props.className}>--</h4>
            )
    }
}