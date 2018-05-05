import React from 'react'
import { connect } from 'react-redux'
// import classNames from 'classnames'
import { ImportStyle } from 'sp-css-import'

import {
    maxBaseCount,
    maxSquadronInBaseCount,
} from '@appLogic/fleets'

export default connect(state => {
    // console.log(state)
    if (
        !state.fleets.current ||
        state.fleets.current.currentTab !== 'base'
    ) return {}
    return {
        id: state.fleets.current._id,
    }
})(ImportStyle(require('./styles.less'))(
    ({
        id,
        className,
    }) => {
        if (typeof id === 'undefined')
            return null

        const bases = []
        for (let i = 0; i < maxBaseCount; i++) {
            const squadrons = []
            for (let l = 0; l < maxSquadronInBaseCount; l++) {
                squadrons.push(
                    <div
                        key={l}
                        data-squadron-index={l}
                    >Squadron #{l + 1}</div>
                )
            }
            bases.push(
                <div
                    key={i}
                    data-base-index={i}
                >
                    <strong>Base #{i + 1}</strong>
                    {squadrons}
                </div>
            )
        }

        return (
            <div className={className}>
                {bases}
            </div>
        )
    }
))
