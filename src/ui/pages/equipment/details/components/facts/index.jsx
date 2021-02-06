import React from 'react';
import classNames from 'classnames';
import { extend } from 'koot';

import ComponentContainer from '@ui/containers/infos-component';
import Bullet from '@ui/components/bullet';
import LinkMini from '@ui/components/link-mini';
import Stat from '@ui/components/stat';

import arrStats from '@const/equipment-stats';
import arrResources from '@const/resources';
// import getEquipment from '@utils/get-equipment'
// import equipmentTypes from 'kckit/src/types/equipments'
import getValue from '@utils/get-value';
import { get } from 'kckit';

/*
 * non-aircraft: 开发 | 改修 | 升级
 * aircraft: 开发 | 改修 | 升级 | 提升熟练度
 */

// ============================================================================

const EquipmentDetailsComponentFacts = extend({
    // connect: true,
    styles: require('./styles.less'),
})(({ className, equipment }) => (
    <ComponentContainer className={className}>
        <EquipmentDetailsComponentFactsFacts equipment={equipment} />
        <EquipmentDetailsComponentFactsStats equipment={equipment} />
        {/* <EquipmentDetailsComponentFactsScrap equipment={equipment} /> */}
    </ComponentContainer>
));

// ============================================================================

const EquipmentDetailsComponentFactsContainer = extend({
    styles: require('./styles-container.less'),
})(({ className, children }) => <div className={className}>{children}</div>);

// ============================================================================

const EquipmentDetailsComponentFactsFacts = extend({
    styles: require('./styles-facts.less'),
})(({ equipment, className }) => {
    const items = [
        ['craftable', !!equipment.craftable],
        ['improvable', !!equipment.improvable],
        [
            'upgradable',
            Array.isArray(equipment.upgrade_to) && equipment.upgrade_to.length,
        ],
    ];

    if (equipment.isType('Aircraft'))
        items.push(['rankupgradable', equipment.rankupgradable]);

    return (
        <EquipmentDetailsComponentFactsContainer className={className}>
            {items.map((pair) => (
                <Bullet
                    className="item"
                    title={__(
                        `equipment_details.facts`,
                        `${pair[1] ? '' : 'un'}${pair[0]}`
                    )}
                    level={pair[1] ? 2 : 0}
                    key={pair[0]}
                />
            ))}
        </EquipmentDetailsComponentFactsContainer>
    );
});

// ============================================================================

const EquipmentDetailsComponentFactsStats = extend({
    styles: require('./styles-stats.less'),
})(({ equipment, className }) => {
    const stats = [...arrStats];
    const isInterceptor = equipment.isType('Interceptor');
    const valueTP = equipment.getTP();

    if (equipment.isType('Aircraft')) stats.push('distance');

    return (
        <EquipmentDetailsComponentFactsContainer className={className}>
            {stats.map((stat) => {
                const value =
                    stat === 'range'
                        ? get.range(equipment.stat[stat])
                        : getValue(equipment.stat[stat]);

                if (isInterceptor) {
                    if (stat === 'hit') stat = 'antibomber';
                    else if (stat === 'evasion') stat = 'interception';
                }

                return (
                    <StatValue
                        key={stat}
                        className="item"
                        stat={stat}
                        value={value}
                    />
                );
            })}

            {!!valueTP && (
                <Stat type={__(`tp`)} className="item is-positive" key="tp">
                    {valueTP}
                </Stat>
            )}

            <BonusStat bonus={equipment.stat_bonus} />
            <Scrap scrap={equipment.dismantle} />
        </EquipmentDetailsComponentFactsContainer>
    );
});

// ============================================================================

const StatValue = ({ stat, value, className, hideTitle }) => (
    <Stat
        type={hideTitle ? undefined : __(`stat`, stat)}
        key={stat}
        className={classNames([
            className,
            {
                'is-negative': value < 0,
                'is-positive':
                    value > 0 && stat !== 'range' && stat !== 'distance',
                disabled: !value,
            },
        ])}
        stat={stat}
    >
        {`${value > 0 && stat !== 'range' && stat !== 'distance' ? '+' : ''}${
            !value ? '-' : value
        }`}
    </Stat>
);

// ============================================================================

const Scrap = extend({
    styles: require('./styles-stats-scrap.less'),
})(({ scrap }) => (
    <Stat
        type={__(`equipment_details.scrap`)}
        className="item scrap"
        key="scrap"
    >
        {arrResources.map((resource, index) => {
            const value = getValue(scrap[index]);
            return (
                <Stat
                    className={classNames([
                        'scrap-resource',
                        {
                            disabled: !value,
                        },
                    ])}
                    key={index}
                    stat={resource}
                >
                    {value}
                </Stat>
            );
        })}
    </Stat>
));

// ============================================================================

const getStrShipClass = (shipTypeId, shipClass) => {
    if (shipTypeId)
        return __('shiptypeclass', {
            type: get.shipType(shipTypeId)._name,
            class: shipClass._name,
        });
    return __('shipclass', {
        class: shipClass._name,
    });
};
const BonusStat = extend({
    styles: require('./styles-stats-bonus.less'),
})(({ bonus, className }) => {
    if (!Array.isArray(bonus) || !bonus.length) return null;

    return (
        <div className={className}>
            {bonus.map((o, index) => {
                const stats = [];
                const hasShipClasses =
                    Array.isArray(o.ship_classes) && o.ship_classes.length;
                const hasShips = Array.isArray(o.ships) && o.ships.length;
                for (const key in o.bonus) {
                    if (o.bonus[key])
                        stats.push({
                            stat: key,
                            value: o.bonus[key],
                        });
                }
                return (
                    <div className="bonus-item" key={index}>
                        {hasShipClasses && (
                            <div className="ship-classes">
                                {o.ship_classes.map((classId /*, index*/) => {
                                    const shipClass = get.shipClass(classId);
                                    const shipTypeId = shipClass.ship_type_id;
                                    return (
                                        <span
                                            className="ship-class"
                                            key={classId}
                                        >
                                            {getStrShipClass(
                                                shipTypeId,
                                                shipClass
                                            )}
                                        </span>
                                    );
                                })}
                            </div>
                        )}
                        {hasShips && (
                            <div className="ships">
                                {o.ships.map((ship) => (
                                    <LinkMini
                                        className="ship"
                                        ship={ship}
                                        key={ship.id || ship}
                                    />
                                ))}
                            </div>
                        )}
                        <div className="bonus">
                            <span className="title">
                                {__(`equipment_details.bonus_stat`)}
                            </span>
                            {stats.map((o) => (
                                <StatValue
                                    key={o.stat}
                                    className="stat"
                                    stat={o.stat}
                                    value={o.value}
                                    hideTitle={true}
                                />
                            ))}
                        </div>
                    </div>
                );
            })}
            {bonus.length > 1 && (
                <div className="bonus-item bonus-note">
                    {__('equipment_details.bonus_note_max_value')}
                </div>
            )}
        </div>
    );
});

// ============================================================================

// import stylesScrap from './styles-scrap.less'
// @ImportStyle(stylesScrap)
// class EquipmentDetailsComponentFactsScrap extends React.Component {
//     render() {
//         return (
//             <ComponentContainer className={this.props.className} title={__("equipment_details.scrap")}>
//                 <EquipmentDetailsComponentFactsContainer className={this.props.className}>
//                     {arrResources.map((resource, index) => {
//                         const value = getValue(this.props.equipment.dismantle[index])
//                         return (
//                             <Stat
//                                 className={
//                                     classNames(['item', {
//                                         disabled: !value
//                                     }])
//                                 }
//                                 key={index}
//                                 stat={resource}
//                             >
//                                 {value}
//                             </Stat>
//                         )
//                     })}
//                 </EquipmentDetailsComponentFactsContainer>
//             </ComponentContainer>
//         )
//     }
// }

// ============================================================================

export default EquipmentDetailsComponentFacts;
