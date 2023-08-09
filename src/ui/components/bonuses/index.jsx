import { memo } from 'react';
import { extend } from 'koot';
import classNames from 'classnames';

import getHybridRadars from '@utils/get-hybrid-radars';
import getEquipment from '@utils/get-equipment';

import ComponentContainer from '@ui/containers/infos-component';
import Icon from '@ui/components/icon';
import ListEquipments from '@ui/components/list/equipments';
import bonusIsSet from './bonus-is-set';
import BonusSingle from './bonus-single';
import BonusSet from './bonus-set';

import styles from './styles.less';

const { wrapper: classNameModule } = styles;

export default extend({
    styles,
})(
    memo(
        ({
            className, //['data-class-name']: classNameThis,
            bonuses,
            ship,
            equipment,
        }) => {
            if (!Array.isArray(bonuses) && (ship || equipment))
                bonuses = (ship || equipment).getBonuses();

            const single = [];
            const set = [];

            let setHasSurfaceRadar = false;
            let setHasAARadar = false;

            bonuses.forEach((bonus) => {
                if (bonusIsSet(bonus)) {
                    if (!setHasSurfaceRadar)
                        setHasSurfaceRadar = Boolean(
                            bonus.equipments && bonus.equipments.hasSurfaceRadar
                        );
                    if (!setHasAARadar)
                        setHasAARadar = Boolean(
                            bonus.equipments && bonus.equipments.hasAARadar
                        );
                    set.push(bonus);
                } else single.push(bonus);
            });

            const setHasHybridRadar = setHasSurfaceRadar && setHasAARadar;

            // 检查所有套装加成
            // 如果 list 为 Number[]，检查是否是其他某个套装加成的子集
            // 如果是，修改对应套装加成，添加 bonusAccumulate
            // set.forEach((bonus, index) => {
            //     if (!bonus.list.every(item => !isNaN(item)))
            //         return
            //     set.forEach((toCheck, indexToCheck) => {
            //         if (index === indexToCheck ||
            //             bonus.list.length >= toCheck.list.length ||
            //             !bonus.list.every(item => toCheck.list.includes(item))
            //         )
            //             return
            //         if (!toCheck.bonusAccumulate)
            //             toCheck.bonusAccumulate = {}
            //         Object.keys(bonus.bonus).forEach(stat => {
            //             if (typeof toCheck.bonusAccumulate[stat] === 'undefined')
            //                 toCheck.bonusAccumulate[stat] = 0
            //             toCheck.bonusAccumulate[stat] += bonus.bonus[stat]
            //         })
            //     })
            // })

            // eslint-disable-next-line no-console
            if (__CLIENT__ && __DEV__) console.log('Bonuses', single, set);

            // const classNameBonuses = classNameModule + '-bonuses'
            const classNameList = classNameModule + '-list';
            const classNameItem = classNameModule + '-bonus';

            return (
                <div className={className}>
                    <ComponentContainer
                    // className={classNameBonuses}
                    // title={__('bonuses.single')}
                    // titleType="line-append"
                    >
                        {single.length ? (
                            <>
                                <div className="note-bonus-condition">
                                    <div className="wrapper">
                                        <p className="note">
                                            <Icon
                                                icon="warning2"
                                                className="icon"
                                            />
                                            {__('bonuses.note_bonus_condition')}
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className={classNames({
                                        [classNameList]: true,
                                        'mod-gird': single.length > 1,
                                        'is-single': true,
                                        'is-ship': !!ship,
                                        'is-equipment': !!equipment,
                                    })}
                                >
                                    {single.map((bonus, index) => (
                                        <BonusSingle
                                            key={index}
                                            className={classNameItem}
                                            bonus={bonus}
                                            thisShip={ship}
                                            thisEquipment={equipment}
                                        />
                                    ))}
                                </div>
                            </>
                        ) : (
                            <span className="disabled">{__('none')}</span>
                        )}
                    </ComponentContainer>
                    <ComponentContainer
                        // className={classNames([classNameBonuses, "is-sets"])}
                        title={__('bonuses.sets')}
                        titleType="line-append"
                    >
                        {!equipment && ship && setHasHybridRadar ? (
                            <div className="note-hybrid-radar has-list">
                                <div className="wrapper">
                                    <p className="note">
                                        <Icon
                                            icon="warning2"
                                            className="icon"
                                        />
                                        {__('bonuses.note_hybrid_radar')}
                                    </p>
                                </div>
                                <ListEquipments
                                    className="list"
                                    list={getHybridRadars(ship)}
                                />
                            </div>
                        ) : null}
                        {equipment && !ship && setHasHybridRadar ? (
                            getEquipment(equipment).isType('SurfaceRadar') &&
                            getEquipment(equipment).isType('AARadar') ? (
                                <div className="note-hybrid-radar">
                                    <p className="note">
                                        <Icon
                                            icon="warning2"
                                            className="icon"
                                        />
                                        {__(
                                            'bonuses.note_hybrid_radar_this_equipment'
                                        )}
                                    </p>
                                </div>
                            ) : (
                                <div className="note-hybrid-radar has-list">
                                    <div className="wrapper">
                                        <p className="note">
                                            <Icon
                                                icon="warning2"
                                                className="icon"
                                            />
                                            {__('bonuses.note_hybrid_radar')}
                                        </p>
                                    </div>
                                    <ListEquipments
                                        className="list"
                                        list={getHybridRadars()}
                                    />
                                </div>
                            )
                        ) : null}
                        {set.length ? (
                            <div
                                className={classNames({
                                    [classNameList]: true,
                                    'mod-gird': set.length > 1,
                                    'is-set': true,
                                    'is-ship': !!ship,
                                    'is-equipment': !!equipment,
                                })}
                            >
                                {set.map((bonus, index) => (
                                    <BonusSet
                                        key={index}
                                        className={classNameItem}
                                        bonus={bonus}
                                        thisShip={ship}
                                        thisEquipment={equipment}
                                    />
                                ))}
                            </div>
                        ) : (
                            <span className="disabled">{__('none')}</span>
                        )}
                    </ComponentContainer>
                </div>
            );
        }
    )
);
