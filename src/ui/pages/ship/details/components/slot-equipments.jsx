import { Link } from 'react-router';
import classNames from 'classnames';
import { extend } from 'koot';

import ComponentContainer from '@ui/containers/infos-component';
import IconEquipment from '@ui/components/icon-equipment';
import ImprovementStar from '@ui/components/improvement/star';

import db from '@database';
import times from '@utils/times';

const ShipDetailsComponentSlotEquipments = extend({
    styles: require('./slot-equipments.less'),
})((props) => {
    const renderArr = [];
    times(Math.max(4, props.ship.slot.length))((index) => {
        const slot = props.ship.slot[index];
        const hasSlot = typeof slot !== 'undefined';
        const data = props.ship.equip[index] || undefined;
        const equipmentId = hasSlot
            ? typeof data === 'object'
                ? data.id
                : data
            : undefined;
        const equipment = equipmentId && db.equipments[equipmentId];
        const star = typeof data === 'object' ? data.star : undefined;
        renderArr.push(
            <dl
                key={index}
                className={classNames([
                    'item',
                    {
                        disabled: !hasSlot,
                        'is-empty': !equipmentId,
                    },
                ])}
                // className={'item' + (!hasSlot ? ' disabled' : '')}
            >
                <dt className="slot">{hasSlot ? slot : '-'}</dt>
                <dd className="equipment">
                    {equipmentId && (
                        <Link
                            to={`/equipments/${equipmentId}`}
                            className="equipment-name"
                        >
                            <IconEquipment
                                className="icon"
                                icon={equipment._icon}
                            />
                            {equipment._name}
                            {star ? (
                                <ImprovementStar className="equipment-star">
                                    {star}
                                </ImprovementStar>
                            ) : null}
                        </Link>
                    )}
                    {!equipmentId && hasSlot && (
                        <span className="equipment-name">
                            <IconEquipment className="icon" />
                            {__('ship_details.emptyslot')}
                        </span>
                    )}
                    {!equipmentId && !hasSlot && (
                        <span className="equipment-name">
                            <IconEquipment className="icon" />
                            {__('ship_details.noslot')}
                        </span>
                    )}
                </dd>
            </dl>
        );
    });
    return (
        <ComponentContainer
            className={props.className}
            title={__('ship_details.slot_equipments')}
        >
            {renderArr}
        </ComponentContainer>
    );
});
export default ShipDetailsComponentSlotEquipments;
