import { memo } from 'react';
import classNames from 'classnames';
import shipTypes from 'kckit/src/types/ships';

import db from '@database';
import ensureArray from '@utils/ensure-array';
import parseShipTypes from '@utils/parse-ship-types';

import ListShips from '@ui/components/list/ships';
import Icon from '@ui/components/icon';

export default memo(({ className, condition = {} }) => {
    const components = [];

    if (condition.isType || condition.isNotType) {
        const isAt = condition.isType ? true : false;

        let types = parseShipTypes(condition.isType || condition.isNotType);
        if (isMatchMajorType(types, 'Destroyers')) {
            types = [1];
        }

        if (isMatchMajorType(types, 'Carriers')) {
            types = [];
            db.shipCollections.some((collection) => {
                if (collection.names.en_us === 'Carriers') {
                    types.push(collection.name);
                    return true;
                }
                return false;
            });
        }

        components.push(
            <div
                key="conditionType"
                className={classNames([
                    isAt ? 'at' : 'exclude',
                    'mod-need-sep',
                ])}
            >
                {isAt ? SymbolAt : SymbolExclude}
                {types.map((typeId, index) => (
                    <ConditionItem
                        children={
                            db.shipTypes[typeId]
                                ? db.shipTypes[typeId]._name
                                : typeId
                        }
                        key={index}
                    />
                ))}
            </div>
        );
    }
    if (condition.isClass || condition.isNotClass) {
        const isAt = condition.isClass ? true : false;
        const classIdList = ensureArray(
            condition.isClass || condition.isNotClass
        );
        components.push(
            <div
                key="conditionClass"
                className={classNames([
                    isAt ? 'at' : 'exclude',
                    'mod-need-sep',
                ])}
            >
                {isAt ? SymbolAt : SymbolExclude}
                {classIdList
                    .filter((classId) => {
                        if (classId === 96 && classIdList.includes(97))
                            return false;
                        return true;
                    })
                    .map((classId, index) => {
                        const cl = db.shipClasses[classId];
                        const type =
                            db.shipTypes[
                                cl.ship_type_id === 32 ? 9 : cl.ship_type_id
                            ];
                        return (
                            <ConditionItem
                                children={__('shiptypeclass', {
                                    class: cl._name,
                                    type: type._name,
                                })}
                                key={index}
                            />
                        );
                    })}
            </div>
        );
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
                children={SymbolAt}
            />
        );
    }
    if (condition.isNotID) {
        components.push(
            <div key="conditionNotID" className="exclude mod-need-sep">
                {SymbolExclude}
                {ensureArray(condition.isNotID).map((shipId, index) => {
                    return (
                        <ConditionItem
                            children={db.ships[shipId].getName(
                                __('shipname_dash_none')
                            )}
                            key={index}
                        />
                    );
                })}
            </div>
        );
    }

    return (
        <div
            key="conditions"
            className={classNames('condition', 'mod-ship', className)}
        >
            {components}
        </div>
    );
});

//

const ConditionItem = memo(({ children }) => (
    <span className="item" children={children} />
));

const SymbolAt = <Icon className="symbol is-at" icon="at-sign" />;
const SymbolExclude = <Icon className="symbol is-exclude" icon="cross" />;

//

/**
 * 给定类型列表是否满足对应的全部类型
 * @param {number[]} types
 * @param {string} majorType
 */
const isMatchMajorType = (types = [], majorType = '') =>
    shipTypes[majorType] &&
    shipTypes[majorType].length === types.length &&
    shipTypes[majorType].every((id) => types.includes(id));
