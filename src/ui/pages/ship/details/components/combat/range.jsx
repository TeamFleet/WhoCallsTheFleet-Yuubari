import kckit from 'kckit';
import db from '@database';

import Bullet from '@ui/components/bullet';

const shipTypeRangeNormal = {
    BB: 3,
    CV: 1,
    CL: 2,
    CA: 2,
    DD: 1,
};

export default ({ ship }) => {
    let defaultRange;

    Object.keys(shipTypeRangeNormal).some((type) => {
        if (
            ship.isType(type) &&
            ship.stat.range !== shipTypeRangeNormal[type]
        ) {
            defaultRange = shipTypeRangeNormal[type];
            return true;
        }
        return false;
    });

    if (typeof defaultRange === 'undefined') return null;

    let type = db.shipTypes[ship.type_display]._name;
    db.shipCollections.some(({ list, name }) => {
        if (list.some(({ type }) => ship.type_display === type)) {
            type = name;
            return true;
        }
        return false;
    });

    return (
        <Bullet
            titleHtml={__('ship_details.range_different_title', {
                range: `<strong class="color-positive">${ship._range}</strong>`,
            })}
            stat="range"
        >
            {__('ship_details.range_different_note', {
                range: kckit.get.range(defaultRange),
                type,
            })}
        </Bullet>
    );
};
