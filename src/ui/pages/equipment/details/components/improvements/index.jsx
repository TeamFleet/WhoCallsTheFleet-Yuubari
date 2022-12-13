import { useCallback, useMemo } from 'react';
import { extend } from 'koot';
import classNames from 'classnames';

import useImprovementWatch from '@ui/hooks/use-improvement-watch';

import ComponentContainer from '@ui/containers/infos-component';
import { placeholders } from '@ui/containers/flex';
import { DayAndShip, Resources, Star } from '@ui/components/improvement';
import Bullet from '@ui/components/bullet';
import LinkEquipment from '@ui/components/link/equipment';
import Icon from '@ui/components/icon';

const EquipmentDetailsComponentImprovements = extend({
    styles: require('./styles.less'),
})(({ className, equipment }) => {
    const list = equipment.improvement || [];
    const hasItem = !!list.length;
    const upgradable =
        Array.isArray(equipment.upgrade_to) && equipment.upgrade_to.length;

    return (
        <ComponentContainer
            className={className}
            title={__('equipment_details.improvements')}
        >
            {hasItem && (
                <div className="list">
                    {list.map((data, index) => (
                        <EquipmentDetailsComponentImprovementsImprovement
                            key={index}
                            data={data}
                            upgradable={upgradable}
                            className="flex-item"
                            equipment={equipment}
                            index={index}
                        />
                    ))}
                    {list.length > 1 && placeholders}
                </div>
            )}
            {!hasItem && <span className="disabled">{__('none')}</span>}
        </ComponentContainer>
    );
});
export default EquipmentDetailsComponentImprovements;

const EquipmentDetailsComponentImprovementsImprovement = extend({
    styles: require('./styles-improvement.less'),
})(
    ({
        className,
        upgradable,
        equipment,
        index,
        data: { upgrade, req, resource },
    }) => {
        const {
            list: watchList,
            add: watchAdd,
            remove: watchRemove,
        } = useImprovementWatch();

        const watchId = useMemo(
            () => `${equipment.id}-${index}`,
            [equipment.id, index]
        );

        const isWatching = useMemo(
            function () {
                return Array.isArray(watchList) && watchList.includes(watchId);
            },
            [watchId, watchList]
        );

        const watch = useCallback(
            function () {
                if (isWatching) {
                    watchRemove(watchId);
                } else {
                    watchAdd(watchId);
                }
            },
            [isWatching, watchAdd, watchId, watchRemove]
        );

        return (
            <div className={className}>
                <Bullet className="upgradability" level={upgrade ? 2 : 0}>
                    <span className="subtitle">
                        {upgrade
                            ? __(`equipment_details.upgrade_to`)
                            : __(`equipment_details.facts.unupgradable`)}
                    </span>
                    {upgrade && (
                        <LinkEquipment
                            equipment={upgrade[0]}
                            className="equipment color-alt"
                        >
                            {upgrade && !!upgrade[1] && (
                                <Star
                                    className="default-star"
                                    star={upgrade[1]}
                                />
                            )}
                        </LinkEquipment>
                    )}
                    <button
                        type="button"
                        className={classNames([
                            `btn-watch`,
                            {
                                'is-watching': isWatching,
                            },
                        ])}
                        onClick={watch}
                    >
                        <Icon
                            icon={isWatching ? 'heart3' : 'heart4'}
                            className="heart"
                        />
                    </button>
                </Bullet>
                <DayAndShip className="dayships" data={req} />
                <Resources
                    className="resources"
                    data={resource}
                    upgradable={upgradable}
                />
            </div>
        );
    }
);
