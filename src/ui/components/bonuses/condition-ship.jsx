import React from 'react'
import classNames from 'classnames'

import db from '@database'
import ensureArray from '@utils/ensure-array'

import ListShips from '@ui/components/list/ships'

export default ({
    className,
    condition = {}
}) => {
    const components = []

    if (condition.isType || condition.isNotType) {
        components.push(
            <div key="conditionType" className={classNames([condition.isType ? "at" : 'exclude', 'mod-need-sep'])}>
                {ensureArray(condition.isType || condition.isNotType).map((typeId, index) => {
                    const type = db.shipTypes[typeId]
                    return (
                        <ConditionItem children={type._name} key={index} />
                    )
                })}
            </div>
        )
    }
    if (condition.isClass || condition.isNotClass) {
        components.push(
            <div key="conditionClass" className={classNames([condition.isClass ? "at" : 'exclude', 'mod-need-sep'])}>
                {ensureArray(condition.isClass || condition.isNotClass).map((classId, index) => {
                    const cl = db.shipClasses[classId]
                    const type = db.shipTypes[cl.ship_type_id]
                    return (
                        <ConditionItem
                            children={__('shiptypeclass', {
                                'class': cl._name,
                                'type': type._name,
                            })}
                            key={index}
                        />
                    )
                })}
            </div>
        )
    }
    if (condition.isID) {
        components.push(
            <ListShips
                className="at is-ship-list"
                classNameItem="item"
                list={ensureArray(condition.isID)}
                size="mini"
                grid={false}
                key="conditionID"
            />
        )
    }
    if (condition.isNotID) {
        components.push(
            <div key="conditionNotID" className={'exclude mod-need-sep'}>
                {ensureArray(condition.isNotID).map((shipId, index) => {
                    return (
                        <ConditionItem
                            children={db.ships[shipId].getName(__('shipname_dash_none'))}
                            key={index}
                        />
                    )
                })}
            </div>
        )
    }

    return (
        <div key="conditions" className={classNames("condition", "is-ship", className)}>
            {components}
        </div>
    )
}

const ConditionItem = ({ children }) => (
    <span className="item" children={children} />
)
