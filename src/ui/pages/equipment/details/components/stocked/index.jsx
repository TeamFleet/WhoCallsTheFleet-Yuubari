import { extend } from 'koot';

import getShip from '@utils/get-ship';

import ComponentContainer from '@ui/containers/infos-component';
import ListShips from '@ui/components/list/ships';

const EquipmentDetailsComponentStocked = extend({
    styles: require('./styles.less'),
})(({ className, equipment }) => {
    const stockedOn = equipment.default_equipped_on || [];
    return (
        <ComponentContainer
            className={className}
            title={__('equipment_details.stocked')}
        >
            {!!stockedOn.length && (
                <List className={className} stockedOn={stockedOn} />
            )}
            {!stockedOn.length && (
                <span className="disabled">{__('none')}</span>
            )}
            {/* <ListShips
                    list={this.props.equipment.default_equipped_on || []}
                    empty={__("equipment_details.stocked_list_empty")}
                    sort={true}

                    navy={true}
                    min-level={true}
                /> */}
        </ComponentContainer>
    );
});
export default EquipmentDetailsComponentStocked;

const List = ({ className, stockedOn }) => {
    const list = {};
    const levels = [];
    const classNameThis = className.split([' '])[0];

    stockedOn.forEach((shipId) => {
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
    return levels.map((level, index) => (
        <div
            className={
                classNameThis +
                '-level' +
                (!index ? ' is-first' : '') +
                (index >= levels.length - 1 ? ' is-last' : '')
            }
            key={level}
        >
            <span className="level">{level}</span>
            <ListShips
                className={classNameThis + '-list'}
                list={list[level]}
                size="mini"
                grid={false}
            />
        </div>
    ));
};
