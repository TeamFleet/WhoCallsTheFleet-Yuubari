import React from 'react';
import classNames from 'classnames';
import checkEquipment from 'kckit/src/check/equipment';

import LinkEquipment from '@ui/components/link/equipment';
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
                                {...getPropsEquipment(item.id, {
                                    star: item.star,
                                })}
                            />
                        );
                    }
                    if (typeof item === 'string') {
                        switch (item) {
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
                                    >
                                        <span className="equipment-type-explain">
                                            {__('stat.aa')} ≥ 1
                                        </span>
                                    </Item>
                                );
                            }
                            default: {
                                return null;
                            }
                        }
                    }
                    return null;
                })}
            </div>
            <Stats bonus={bonus} />
        </div>
    );
};

const Item = ({ index, children, ...props }) => (
    <LinkEquipment {...props}>
        <Icon icon={!index ? 'hammer-wrench' : 'plus3'} className="symbol" />
        {children}
    </LinkEquipment>
);
