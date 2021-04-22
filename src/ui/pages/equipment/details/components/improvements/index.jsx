import { extend } from 'koot';

import ComponentContainer from '@ui/containers/infos-component';
import { placeholders } from '@ui/containers/flex';
import { DayAndShip, Resources, Star } from '@ui/components/improvement';
import Bullet from '@ui/components/bullet';
import LinkEquipment from '@ui/components/link/equipment';

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
                            data={data}
                            key={index}
                            upgradable={upgradable}
                            className="flex-item"
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
})(({ className, upgradable, data: { upgrade, req, resource } }) => (
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
                        <Star className="default-star" star={upgrade[1]} />
                    )}
                </LinkEquipment>
            )}
        </Bullet>
        <DayAndShip className="dayships" data={req} />
        <Resources
            className="resources"
            data={resource}
            upgradable={upgradable}
        />
    </div>
));
