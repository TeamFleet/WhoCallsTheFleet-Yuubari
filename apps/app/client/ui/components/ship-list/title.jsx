import React from 'react'
import { connect } from 'react-redux'

import { ImportStyle } from 'sp-css-import'
import translate from 'sp-i18n'

import db, { locale as dbLocaleId } from '@appLogic/database'
import {
    compareAdd,
    compareRemove
} from '@appLogic/ship-list/api.js'

import Icon from '@appUI/components/icon.jsx'
import Title from '@appUI/components/title'

const getChecked = (ownList, selectedList) => {
    let matched = 0

    const check = (ship) => {
        if (selectedList.indexOf(ship) > -1)
            matched++
    }

    ownList.forEach(check)

    if (matched >= ownList.length)
        return true
    else if (matched)
        return 'indeterminate'
    else
        return false
}

@connect((state, ownProps) => ({
    checked: ownProps.id
        ? state.shipList[ownProps.id].isModeCompare
            ? getChecked(ownProps.ships || [], ownProps.id ? state.shipList[ownProps.id].compareList : [])
            : undefined
        : undefined
}))
@ImportStyle(require('./title.less'))
export default class ShipListTitle extends React.Component {
    toggle() {
        if (typeof this.props.checked === 'undefined') return false

        switch (this.props.checked) {
            case true:
                return this.props.dispatch(
                    compareRemove(this.props.id, this.props.ships)
                )

            case 'indeterminate':
            case false:
                return this.props.dispatch(
                    compareAdd(this.props.id, this.props.ships)
                )
        }
    }

    renderCheckmark() {
        if (typeof this.props.checked === 'undefined') return null
        return (
            <Icon className="icon" icon="checkbox-checked" />
        )
    }

    render() {
        if (this.props.type) {
            const type = db.shipTypes[this.props.type]
            return (
                <div
                    className={this.props.className}
                    data-checked={this.props.checked}
                    onClick={this.toggle.bind(this)}
                >
                    {this.renderCheckmark()}
                    <Title
                        component="h4"
                        className={this.props.className + '-title'}
                        children={type.name[dbLocaleId] || type.name.ja_jp}
                    />
                    {type.code && (<small className="code">[{type.code}]</small>)}
                </div>
            )
        } else if (this.props.class) {
            return (
                <h5 className={this.props.className + ' is-sub'} data-checked={this.props.checked} onClick={this.toggle.bind(this)}>
                    {this.renderCheckmark()}
                    {translate("shipclass", {
                        class: db.shipClasses[this.props.class].name[dbLocaleId] || db.shipClasses[this.props.class].name.ja_jp
                    })}
                </h5>
            )
        } else
            return (
                <h4 className={this.props.className} disabled>--</h4>
            )
    }
}