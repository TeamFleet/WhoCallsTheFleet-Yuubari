import React from 'react';
import { extend } from 'koot';

import db, { locale as dbLocaleId } from '@database';
import { compareAdd, compareRemove } from '@api/ship-list/api';

import Icon from '@ui/components/icon';
import Title from '@ui/components/title';

// ============================================================================

/**
 * 检查并返回标题选择状态
 * @param {Array} ownShipList
 * @param {Array} selectedList
 * @returns {String|Boolean}
 */
const getChecked = (ownShipList, selectedList) => {
    let matched = 0;

    const check = (ship) => {
        if (selectedList.includes(ship.id)) matched++;
    };

    ownShipList.forEach(check);

    if (matched >= ownShipList.length) return true;
    else if (matched) return 'indeterminate';
    else return false;
};

// ============================================================================

const ShipListTitle = extend({
    connect: (state, ownProps) => ({
        checked: ownProps.id
            ? state.shipList[ownProps.id].isModeCompare
                ? getChecked(
                      ownProps.ships || [],
                      ownProps.id ? state.shipList[ownProps.id].compareList : []
                  )
                : undefined
            : undefined,
    }),
    styles: require('./title.less'),
})(
    ({
        className,
        id,
        ships,
        type: typeId,
        checked,
        class: shipClassId,
        dispatch,
        name,
    }) => {
        function toggle() {
            if (typeof checked === 'undefined') return false;

            switch (checked) {
                case true:
                    return dispatch(compareRemove(id, ships));

                case 'indeterminate':
                case false:
                    return dispatch(compareAdd(id, ships));

                default: {
                }
            }
        }

        if (typeId) {
            const type = db.shipTypes[typeId];
            return (
                <div
                    className={className}
                    data-checked={checked}
                    onClick={toggle}
                >
                    <Checkmark checked={checked} />
                    <Title
                        component="h4"
                        className={className + '-title'}
                        children={
                            typeof name === 'object' && name[dbLocaleId]
                                ? name[dbLocaleId]
                                : type.name[dbLocaleId] || type.name.ja_jp
                        }
                    />
                    {type.code && <small className="code">[{type.code}]</small>}
                </div>
            );
        } else if (shipClassId) {
            return (
                <h5
                    className={className + ' is-sub'}
                    data-checked={checked}
                    onClick={toggle}
                >
                    <Checkmark checked={checked} />
                    {__('shipclass', {
                        class: db.shipClasses[shipClassId]._name,
                    })}
                </h5>
            );
        } else
            return (
                <h4 className={className} disabled>
                    --
                </h4>
            );
    }
);

const Checkmark = ({ checked }) => {
    if (typeof checked === 'undefined') return null;
    return <Icon className="icon" icon="checkbox-checked" />;
};

// ============================================================================

export default ShipListTitle;
