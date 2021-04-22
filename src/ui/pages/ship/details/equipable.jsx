import { Component } from 'react';
import classNames from 'classnames';
import { extend } from 'koot';

import ComponentContainer from '@ui/containers/infos-component';
import IconEquipment from '@ui/components/icon-equipment';
import Link from '@ui/components/link';
import LinkMini from '@ui/components/link-mini';

// import getPic from '@utils/get-pic'
import getLink from '@utils/get-link';
import db from '@database';

// const equipmentTypeIdExclude = [
//     2,  // 小口径高角主炮
//     3,  // 小口径高角主炮 (AAFD)
//     8,  // 高角副炮
//     9,  // 高角副炮 (AAFD)
//     16, // 夜侦
//     56, // 喷气机
//     53, // 陆攻
//     54, // 局战
//     59, // 陆战
//     30, // 机枪 (CD)
// ]

// @connect()
@extend({
    styles: require('./equipable.less'),
})
class ShipDetailsContentEquipable extends Component {
    renderCollection(collection, collectionIndex) {
        return (
            <ComponentContainer key={collectionIndex} title={collection.name}>
                <ShipDetailsContentEquipableListContainer>
                    {collection.list
                        .filter(
                            (list) =>
                                !db.equipmentTypesExclude.includes(list.type)
                        )
                        .map((list, listIndex) => (
                            <ShipDetailsContentEquipableItem
                                className="item"
                                key={`${collectionIndex}-${listIndex}`}
                                type={db.equipmentTypes[list.type]}
                                ship={this.props.ship}
                            />
                        ))}
                </ShipDetailsContentEquipableListContainer>
            </ComponentContainer>
        );
    }
    renderAdditional() {
        if (!Array.isArray(this.props.ship.additional_items)) return null;
        return (
            <ComponentContainer
                title={__('ship_details.equipable_additional')}
                titleType="line-append"
                className="additional"
            >
                <ShipDetailsContentEquipableListContainer className="is-exslot">
                    {this.props.ship.additional_items
                        .sort(
                            (a, b) =>
                                db.equipments[a].order - db.equipments[b].order
                        )
                        .map((equipmentID, index) => (
                            <ShipDetailsContentEquipableItem
                                className="item is-exslot"
                                key={index}
                                equipment={db.equipments[equipmentID]}
                            />
                        ))}
                </ShipDetailsContentEquipableListContainer>
            </ComponentContainer>
        );
    }
    renderExSolot() {
        return (
            <ComponentContainer
                title={__('ship_details.equipable_exslot')}
                titleType="line-append"
                className="exslots"
            >
                <ShipDetailsContentEquipableListContainer className="is-exslot">
                    {this.props.ship
                        .getExSlotEquipmentTypes()
                        .filter(
                            (typeID) =>
                                !db.equipmentTypesExclude.includes(typeID) &&
                                this.props.ship.canEquip(typeID)
                        )
                        .sort(
                            (a, b) =>
                                db.equipmentTypes[a].order -
                                db.equipmentTypes[b].order
                        )
                        .map((typeID, index) => (
                            <ShipDetailsContentEquipableItem
                                className="item is-exslot"
                                key={index}
                                type={db.equipmentTypes[typeID]}
                            />
                        ))}
                </ShipDetailsContentEquipableListContainer>

                <div className="noflex and">
                    {__('ship_details.equipable_exslot_and')}
                </div>

                <ShipDetailsContentEquipableListContainer className="is-exslot">
                    {this.props.ship
                        .getExSlotOtherEquipments()
                        .sort(
                            (a, b) =>
                                db.equipments[a].order - db.equipments[b].order
                        )
                        .map((equipmentID, index) => (
                            <ShipDetailsContentEquipableItem
                                className="item is-exslot"
                                key={index}
                                equipment={db.equipments[equipmentID]}
                            />
                        ))}
                </ShipDetailsContentEquipableListContainer>
            </ComponentContainer>
        );
    }
    render() {
        if (__CLIENT__ && __DEV__)
            // eslint-disable-next-line no-console
            console.log(
                'thisShip equipable',
                this.props.ship.getEquipmentTypes()
            );
        return (
            <div className={this.props.className}>
                <div className="legends">
                    <ComponentContainer className="wrapper">
                        <ShipDetailsContentEquipableLegend
                            className="item off"
                            text={__('ship_details.equipable_legend_no')}
                        />
                        <ShipDetailsContentEquipableLegend
                            className="item on"
                            text={__('ship_details.equipable_legend_yes')}
                        />
                        <ShipDetailsContentEquipableLegend
                            className="item on is-special"
                            text={__('ship_details.equipable_legend_yes')}
                            textSmall={__(
                                'ship_details.equipable_legend_yes_extra',
                                {
                                    type:
                                        db.shipTypes[
                                            this.props.ship.type_display
                                        ]._name,
                                }
                            )}
                        />
                    </ComponentContainer>
                </div>
                {db.equipmentCollections.map(this.renderCollection.bind(this))}
                {this.renderAdditional()}
                {this.renderExSolot()}
            </div>
        );
    }
}

@extend({
    styles: require('./components/equipable-list.less'),
})
class ShipDetailsContentEquipableListContainer extends Component {
    insertPlaceHolders() {
        let i = 0;
        const arr = [];
        while (i++ < 10)
            arr.push(<span className="item placeholder" key={i}></span>);
        return arr;
    }
    render() {
        const { children, ...props } = this.props;
        return (
            <div {...props}>
                {children}
                {this.insertPlaceHolders()}
            </div>
        );
    }
}

@extend({
    styles: require('./components/equipable-item.less'),
})
class ShipDetailsContentEquipableItem extends Component {
    render() {
        if (this.props.equipment)
            return (
                <Link
                    className={this.props.className + ' equipment'}
                    to={getLink('equipment', this.props.equipment.id)}
                >
                    <IconEquipment
                        className="equipment-wrapper"
                        icon={this.props.equipment._icon}
                    >
                        <span className="name">
                            <span className="name-wrapper">
                                {this.props.equipment._name}
                            </span>
                        </span>
                    </IconEquipment>
                </Link>
            );

        // const isNotAV = this.props.ship && !this.props.ship.isType('AV')
        const canEquip = this.props.ship
            ? this.props.ship.canEquip(this.props.type.id)
            : undefined;
        const canEquipShipType = this.props.ship
            ? this.props.type.equipable_on_type.includes(
                  this.props.ship.type_display
              )
            : undefined;
        // const remodels = this.props.ship.getSeriesData()
        //     .map(d => d.id)
        //     .filter(id => id !== this.props.ship.id)
        // let otherRemodels = canEquip ? [] : remodels.filter(id => db.ships[id].canEquip(this.props.type.id))
        let specialList =
            canEquipShipType === false
                ? db.shipsSpecial[this.props.ship.type_display] || []
                : [];
        specialList = specialList.filter(
            (shipId) =>
                shipId !== this.props.ship.id &&
                // && !remodels.includes(shipId)
                canEquipShipType !==
                    db.ships[shipId].canEquip(this.props.type.id)
        );

        const spCount =
            specialList.length + (canEquip !== canEquipShipType ? 1 : 0);

        return (
            <IconEquipment
                className={classNames([
                    this.props.className,
                    {
                        on: canEquip === true,
                        off: canEquip === false,
                        'is-special':
                            /*isNotAV && */ canEquip && !canEquipShipType,
                    },
                ])}
                icon={this.props.type.icon}
                data-special-count={spCount > 0 ? spCount : undefined}
            >
                <span className="name">
                    <span className="name-wrapper">
                        {this.props.type._name}
                    </span>
                </span>

                {specialList.length > 0 &&
                    specialList.map((shipId, index) => (
                        <span className="block" key={index}>
                            <LinkMini
                                className="other on ship is-special"
                                ship={shipId}
                            />
                        </span>
                    ))}
                {canEquip !== canEquipShipType && (
                    <span className="block">
                        <LinkMini
                            className={classNames([
                                'other',
                                {
                                    on: canEquipShipType,
                                    off: !canEquipShipType,
                                },
                            ])}
                        >
                            {__('other_ships_of_type', {
                                type:
                                    db.shipTypes[this.props.ship.type_display]
                                        ._name,
                            })}
                        </LinkMini>
                    </span>
                )}
            </IconEquipment>
        );
    }
}

const ShipDetailsContentEquipableLegend = extend({
    styles: require('./components/equipable-legend.less'),
})(({ className, text, textSmall }) => (
    <span className={className}>
        <span className="wrapper">
            {text}
            {textSmall && <small>{textSmall}</small>}
        </span>
    </span>
));

export default ShipDetailsContentEquipable;
