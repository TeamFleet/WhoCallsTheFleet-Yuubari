import { Fragment } from 'react';
import { extend } from 'koot';

import getShip from '@utils/get-ship';
// import sortShips from '@utils/sort-ships'

import ComponentContainer from '@ui/containers/infos-component';
import ListEquipments from '@ui/components/list/equipments';
import ListShips from '@ui/components/list/ships';
// import LinkMini from '@ui/components/link-mini'

const EquipmentDetailsComponentAcquisition = extend({
    styles: require('./styles.less'),
})(({ className, equipment }) => {
    const classNameThis = className.split([' '])[0];
    const {
        upgrade_from: listUpgradeFrom = [],
        default_equipped_on: listStocked = [],
    } = equipment;
    return (
        <ComponentContainer title={__('equipment_details.acquisition')}>
            <dl className={className}>
                <List
                    title={__('equipment_details.upgrade_from')}
                    list={
                        listUpgradeFrom.length ? (
                            <ListEquipments list={listUpgradeFrom} />
                        ) : undefined
                    }
                />
                <List
                    title={__('equipment_details.stocked')}
                    list={
                        listStocked.length ? (
                            <ListStockedBody
                                className={classNameThis + '-stocked'}
                                list={listStocked}
                            />
                        ) : undefined
                    }
                />
            </dl>
        </ComponentContainer>
    );
});
export default EquipmentDetailsComponentAcquisition;

const List = ({ title, list }) => (
    <Fragment>
        <dt>{title}</dt>
        {!list ? <dd className="empty">{__('none')}</dd> : <dd>{list}</dd>}
    </Fragment>
);

const ListStockedBody = ({ list: arrShipId, className }) => {
    const list = {};
    const levels = [];
    const classNameThis = className.split([' '])[0];
    arrShipId.forEach((shipId) => {
        const ship = getShip(shipId);
        // console.log(ship._name, ship._minLv)
        if (Array.isArray(list[ship._minLv])) {
            list[ship._minLv] = list[ship._minLv].concat(ship);
        } else {
            list[ship._minLv] = [ship];
            levels.push(ship._minLv);
        }
    });
    levels.sort();
    // console.log(list, levels)
    return (
        <div className={className}>
            {levels.map((level) => (
                <div className={classNameThis + '-line'} key={level}>
                    <span className="badge">Lv.{level}</span>
                    <ListShips list={list[level]} size="mini" grid={false} />
                </div>
            ))}
        </div>
    );
};
