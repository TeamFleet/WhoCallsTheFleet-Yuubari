import React, { memo } from 'react';
// import classNames from 'classnames';
import { extend } from 'koot';

// import kckit from 'kckit'
// const checkAACI = kckit.check.aaci
// import getShip from '@utils/get-ship';

import ComponentContainer from '@ui/containers/infos-component';
// import IconEquipment from '@ui/components/icon-equipment';
// import Icon from '@ui/components/icon'
import Bullet from '@ui/components/bullet';
import AACITable from '@components/aaci-table';

const ShipDetailsAACI = extend({
    styles: require('./aaci.less')
})(
    memo(({ className, ship }) => {
        // const aaciTypes = getShip(ship).getAACI();
        // const ableToAACI =
        //     Array.isArray(aaciTypes) && aaciTypes.length ? true : false;
        return (
            <ComponentContainer
                className={className}
                title={__('ship_details.aaci')}
            >
                <AACITable
                    className="aaci-table"
                    ship={ship}
                    unable={
                        <Bullet
                            title={__('ship_details.aaci_unable')}
                            level={0}
                        />
                    }
                />
                {/* {!ableToAACI && (
                <Bullet title={__('ship_details.aaci_unable')} level={0} />
            )}
            {ableToAACI && (
                <dl className="item header">
                    <dt className="id" />
                    <dd className="icons" />
                    <dd className="fixed">{__('aaci.fixed')}</dd>
                    <dd className="modifier">{__('aaci.modifier')}</dd>
                </dl>
            )}
            {ableToAACI &&
                aaciTypes.map((aaci, index) => (
                    <RowAACI key={index} aaci={aaci} />
                ))} */}
            </ComponentContainer>
        );
    })
);

// const RowAACI = ({ aaci }) => (
//     <dl
//         className={classNames([
//             'item',
//             {
//                 'is-limited':
//                     aaci.ship.isID ||
//                     aaci.ship.isClass ||
//                     aaci.ship.isType ||
//                     aaci.ship.isBB
//             }
//         ])}
//     >
//         <dt className="id">
//             #{aaci.id}
//             {aaci.ship.isID && (
//                 <small>{__('ship_details.aaci_req.ship')}</small>
//             )}
//             {aaci.ship.isClass && (
//                 <small>{__('ship_details.aaci_req.class')}</small>
//             )}
//             {(aaci.ship.isType || aaci.ship.isBB) && (
//                 <small>{__('ship_details.aaci_req.type')}</small>
//             )}
//         </dt>
//         <dd className="icons">
//             {aaci.icons.map((icon, index) => (
//                 <IconEquipment key={index} icon={icon} />
//             ))}
//         </dd>
//         <dd className="fixed">+{aaci.fixed}</dd>
//         <dd className="modifier">x{aaci.modifier}</dd>
//     </dl>
// );

export default ShipDetailsAACI;
