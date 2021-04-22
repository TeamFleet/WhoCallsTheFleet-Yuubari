import { memo } from 'react';
import { extend } from 'koot';
import classNames from 'classnames';

import db from '@database';
import getShip from '@utils/get-ship';

import LinkEquipment from '@ui/components/link/equipment';

// ============================================================================

const AACITable = extend({
    styles: require('./styles.less'),
})(
    memo(
        ({
            className,
            component,
            tag,
            element,
            ship: _ship,
            empty,
            unable,
        }) => {
            if (!_ship) return null;

            const Component = component || tag || element || 'div';

            const ship = getShip(_ship);
            const listAACI = getShip(ship).getAACI();

            if (!Array.isArray(listAACI) || !listAACI.length) {
                return (
                    empty ||
                    unable || (
                        <Component
                            className={classNames([className, 'is-unable'])}
                        >
                            {__('ship_details.aaci_unable')}
                        </Component>
                    )
                );
            }

            // eslint-disable-next-line no-console
            if (__DEV__ && __CLIENT__) console.log('thisShip > AACI', listAACI);

            return (
                <Component className={className}>
                    <Row className="header">
                        <dt className="cell" />
                        <Cell type="equipments" />
                        <Cell type="fixed" children={__('aaci.fixed')} />
                        <Cell type="modifier" children={__('aaci.modifier')} />
                    </Row>
                    {listAACI.map((aaci, index) => (
                        <Row key={index} className="row-aaci">
                            <dt className="cell">#{aaci.id}</dt>
                            <Cell type="equipments">
                                <Equipments icons={aaci.icons} />
                            </Cell>
                            <Cell type="fixed" children={`+${aaci.fixed}`} />
                            <Cell
                                type="modifier"
                                children={`x${aaci.modifier}`}
                            />
                        </Row>
                    ))}
                </Component>
            );
        }
    )
);
export default AACITable;

// ============================================================================

const Row = ({ className, ...props }) => (
    <dl className={classNames('row', className)} {...props} />
);

const Cell = ({ className, type, ...props }) => (
    <dd
        className={classNames('cell', className)}
        data-cell-type={type}
        {...props}
    />
);

// ============================================================================

const Equipments = ({ icons }) => {
    if (!Array.isArray(icons)) return null;
    if (!icons.length) return null;
    return icons.map((item, index) => <Equipment key={index} show={item} />);
};
const Equipment = ({ className, show, children, ...props }) => {
    let [, icon, , id, , atLeast, , atMost] =
        /^(.+?)(:(\d+))*(\[(\d)*(,(\d*))*\])*$/.exec(show) || [];
    let name;
    const stat = 'aa';

    switch (icon) {
        case '15+': {
            // icon = 15
            atLeast = 9;
            break;
        }
        case 16:
        case '16': {
            name = __('equipment_types.ha_mount');
            break;
        }
        case '16+': {
            // icon = 16
            name = __('equipment_types.ha_mount');
            atLeast = 8;
            break;
        }
        case '11AA': {
            // icon = 11
            atLeast = 1;
            name = __('equipment_types.aa_radar');
            break;
        }
        default: {
        }
    }

    const theProps = {
        equipment: id,
        className: 'equipment color-alt-lighter mod-underline',
        // iconSize: 'large'
    };

    if (!id) {
        theProps.component = 'span';
        theProps.icon = icon;

        if (!name)
            Object.values(db.equipmentTypes).some((type) => {
                if (type.icon === parseInt(icon)) {
                    name = type._name;
                    return true;
                }
                return false;
            });

        if (atLeast || atMost) {
            name = (
                <span className="name-with-sup">
                    {name}
                    <sup>
                        {__('stat', stat)}
                        {atLeast && !atMost ? ` ≥ ${atLeast}` : null}
                        {!atLeast && atMost ? ` ≤ ${atMost}` : null}
                        {atLeast && atMost ? ` ${atLeast} ~ ${atMost}` : null}
                    </sup>
                </span>
            );
        }

        theProps.children = name;
    }

    // if (id) {
    //     return (
    //         <LinkEquipment
    //             className="equipment color-alt-lighter link-equipment"
    //             equipment={id}
    //             iconSize="large"
    //          />
    //     )
    // }

    return <LinkEquipment {...theProps} />;
};
