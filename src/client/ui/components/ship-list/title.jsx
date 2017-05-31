import React from 'react'
import { connect } from 'react-redux'

import translate from 'sp-i18n'
import db, { locale as dbLocaleId } from 'Logic/database'

import { ImportStyle } from 'sp-css-import'
import styleTitle from './title.less'

// indeterminate

const getChecked = (ownList, selectedList) => {
    let length = 0
    let matched = 0

    const showAll = false

    const check = (ship, index, arr) => {
        if (Array.isArray(ship))
            return ship.forEach(check)

        if (index === true || showAll || index >= arr.length - 1) {
            length++
            if (selectedList.indexOf(ship) > -1)
                matched++
        }
    }

    ownList.forEach(ship => check(ship, true))

    if (matched >= length)
        return true
    else if (matched)
        return 'indeterminate'
    else
        return false
}

@connect((state, ownProps) => ({
    // isModeCompare: ownProps.id ? state.shipList[ownProps.id].isModeCompare : false,
    // compareList: ownProps.id ? state.shipList[ownProps.id].compareList : [],
    checked: ownProps.id
        ? state.shipList[ownProps.id].isModeCompare
            ? getChecked(ownProps.ships || [], ownProps.id ? state.shipList[ownProps.id].compareList : [])
            : false
        : false
}))
@ImportStyle(styleTitle)
export default class ShipListTitle extends React.Component {
    render() {
        if (this.props.type) {
            const type = db.shipTypes[this.props.type]
            return (
                <h4 className={this.props.className} data-checked={this.props.checked}>
                    {type.name[dbLocaleId] || type.name.ja_jp}
                    {type.code && (<small className="code">[{type.code}]</small>)}
                </h4>
            )
        } else if (this.props.class) {
            return (
                <h5 className={this.props.className + ' is-sub'} data-checked={this.props.checked}>
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