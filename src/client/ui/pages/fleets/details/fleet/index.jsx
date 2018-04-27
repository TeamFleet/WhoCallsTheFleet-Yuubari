import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import translate from 'super-i18n'
import { ImportStyle } from 'sp-css-import'

import {
    defaultShipInFleetCount,
} from '@appLogic/fleets'
import selectShip from '@actions/select-ship'

import Button from '@appUI/components/button'

export default connect(state => {
    // console.log(state)
    if (
        !state.fleets.current ||
        typeof state.fleets.current.currentTab !== 'number'
    ) return {}
    const index = state.fleets.current.currentTab
    return {
        id: state.fleets.current._id,
        index,
        count: Math.max(
            defaultShipInFleetCount,
            (state.fleets.current.fleets[index] || []).length
        )
    }
})(ImportStyle(require('./styles.less'))(
    ({
        index,
        count,
        className,
    }) => {
        if (typeof index !== 'number')
            return null

        const ships = []
        for (let i = 0; i < count; i++) {
            ships.push(
                <div
                    key={i}
                    data-ship-index={i}
                    data-fleet-index={index}
                    onClick={() => selectShip()}
                >Fleet #{index + 1} | Ship #{i + 1}</div>
            )
        }

        return (
            <div className={className}>
                {ships}
                <Button
                    children="+ [WIP] ADD"
                />
            </div>
        )
    }
))
