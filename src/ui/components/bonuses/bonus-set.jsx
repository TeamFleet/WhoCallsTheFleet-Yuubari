import React, { memo } from 'react';
import classNames from 'classnames';
import { get } from 'kckit';
import checkEquipment from 'kckit/src/check/equipment';
import equipmentTypes from 'kckit/src/types/equipments';

import LinkEquipment from '@ui/components/link/equipment';
import ListEquipments from '@ui/components/list/equipments';
import Icon from '@ui/components/icon';

import bonusIsSet from './bonus-is-set';

import Stats from './stats';
import ConditionShip from './condition-ship';

export default ({ className, bonus, thisShip, thisEquipment }) => {
    if (!bonusIsSet(bonus)) return null;

    const { listStar: stars = [] } = bonus;

    let condition = null;
    const getPropsEquipment = (id, o = {}) => {
        const { star, isCurrent: _isCurrent = false } = o;
        const isCurrent =
            _isCurrent || (thisEquipment && id === thisEquipment.id);
        return {
            equipment: id,
            iconSize: 'large',
            className: classNames(['equipment'], {
                'is-current': isCurrent,
                'color-alt': !isCurrent,
            }),
            star,
        };
    };

    // 条件
    if (typeof thisShip === 'object') {
    } else if (typeof thisEquipment === 'object') {
        condition = <ConditionShip condition={bonus.ship} />;
    }

    let isOneOf = Array.isArray(bonus.equipments?.hasOneOf);

    return (
        <div className={classNames([className, 'is-set'])}>
            {condition}
            <div className="condition mod-equipments">
                {bonus.list.map((item, index) => {
                    if (!isNaN(item))
                        return (
                            <Item
                                index={index}
                                key={index}
                                // className="mod-underline"
                                {...getPropsEquipment(item, {
                                    star: stars[index],
                                })}
                            />
                        );
                    if (Array.isArray(item)) {
                        return item.map((item, index2) => (
                            <Item
                                index={index}
                                key={index + '-' + index2}
                                // className="mod-underline"
                                {...getPropsEquipment(item, {
                                    star: stars[index],
                                })}
                            />
                        ));
                    }
                    if (typeof item === 'object' && item.id) {
                        return (
                            <Item
                                index={index}
                                key={index}
                                // className="mod-underline"
                                {...getPropsEquipment(item.id, {
                                    star: item.star,
                                })}
                            />
                        );
                    }
                    if (typeof item === 'string') {
                        let type = item;
                        let ids;
                        const matches = /([a-zA-Z0-9]+)\[([0-9,]+)\]/.exec(
                            item
                        );
                        if (Array.isArray(matches) && matches.length > 2) {
                            type = matches[1];
                            ids = matches[2].split(',');
                            isOneOf = false;
                        }
                        switch (type) {
                            case 'SurfaceRadar':
                                return (
                                    <Item
                                        index={index}
                                        key={index}
                                        {...getPropsEquipment(27, {
                                            isCurrent: checkEquipment(
                                                thisEquipment,
                                                {
                                                    isSurfaceRadar: true,
                                                }
                                            ),
                                        })}
                                        component="span"
                                        equipmentName={__(
                                            'equipment_types.surface_radar'
                                        )}
                                        ids={ids}
                                        thisEquipment={thisEquipment}
                                    >
                                        <span className="equipment-type-explain">
                                            {__('stat.los')} ≥ 5
                                        </span>
                                    </Item>
                                );
                            case 'AARadar': {
                                return (
                                    <Item
                                        index={index}
                                        key={index}
                                        {...getPropsEquipment(27, {
                                            isCurrent: checkEquipment(
                                                thisEquipment,
                                                {
                                                    isAARadar: true,
                                                }
                                            ),
                                        })}
                                        component="span"
                                        equipmentName={__(
                                            'equipment_types.aa_radar'
                                        )}
                                        ids={ids}
                                        thisEquipment={thisEquipment}
                                    >
                                        <span className="equipment-type-explain">
                                            {__('stat.aa')} ≥ 1
                                        </span>
                                    </Item>
                                );
                            }
                            default: {
                                if (equipmentTypes[item]) {
                                    // console.log(item);
                                    // console.log(equipmentTypes[item]);
                                    // console.log(
                                    //     get.equipmentType(equipmentTypes[item])
                                    // );
                                    const eType = get.equipmentType(
                                        equipmentTypes[item]
                                    );
                                    return (
                                        <Item
                                            index={index}
                                            key={index}
                                            {...getPropsEquipment(1, {
                                                isCurrent: checkEquipment(
                                                    thisEquipment,
                                                    {
                                                        [`is${item}`]: true,
                                                    }
                                                ),
                                            })}
                                            component="span"
                                            equipmentName={eType._name}
                                            icon={eType.icon}
                                            ids={ids}
                                            thisEquipment={thisEquipment}
                                        />
                                    );
                                }
                                return null;
                            }
                        }
                    }
                    return null;
                })}
                {isOneOf && (
                    <OneOfList
                        list={bonus.equipments.hasOneOf.map(({ isID }) => isID)}
                        thisEquipment={thisEquipment}
                    />
                )}
            </div>
            <Stats
                bonus={bonus}
                // isOneOf={isOneOf}
            />
        </div>
    );
};

const Item = ({ index, children, ids, thisEquipment, ...props }) => (
    <>
        <LinkEquipment {...props}>
            <Icon
                icon={!index ? 'hammer-wrench' : 'plus3'}
                className="symbol"
            />
            {children}
        </LinkEquipment>
        <OneOfList list={ids} thisEquipment={thisEquipment} />
    </>
);

const OneOfList = memo(
    ({ list, thisEquipment }) =>
        Array.isArray(list) &&
        list.length > 0 && (
            <div className="one-of">
                <div className="wrapper">
                    <span
                        className="only"
                        data-text={__('bonuses.based_set_one_of_only')}
                    />
                    <ListEquipments
                        className="list"
                        // classNameLink="mod-underline"
                        list={list}
                        highlight={[thisEquipment?.id]}
                    />
                </div>
            </div>
        )
);
