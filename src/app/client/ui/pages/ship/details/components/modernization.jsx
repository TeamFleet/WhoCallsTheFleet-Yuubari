import React from 'react'
import classNames from 'classnames'

import ComponentContainer from '../commons/component-container.jsx'
import Stat from '../commons/stat.jsx'
import getValue from '@appUtils/get-value'

import translate from 'sp-i18n'

import { ImportStyle } from 'sp-css-import'
import styles from './modernization.less'

const stats = [
    'fire',
    'torpedo',
    'aa',
    'armor'
]

// @connect()
@ImportStyle(styles)
export default class ShipDetailsComponentModernization extends React.Component {
    renderItem(stat, index, value) {
        if (Array.isArray(value)) value = getValue(this.props.ship.modernization[index])
        return (
            <Stat
                className={
                    classNames(['item', {
                        disabled: !value
                    }])
                }
                key={index}
                stat={stat}
            >
                +{value}
            </Stat>
        )
    }
    render() {
        return (
            <ComponentContainer className={this.props.className} title={translate("ship_details.modernization")}>
                {stats.map(this.renderItem.bind(this))}
                {this.props.ship.id === 163 && this.renderItem('luck', undefined, 1.2)}
                {this.props.ship.id === 402 && this.renderItem('luck', undefined, 1.6)}
            </ComponentContainer>
        )
    }
}