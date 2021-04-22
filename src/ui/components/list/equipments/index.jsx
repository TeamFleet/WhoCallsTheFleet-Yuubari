import { memo } from 'react';
import { extend } from 'koot';
import classNames from 'classnames';

import getEquipment from '@utils/get-equipment';

import LinkEquipment from '@ui/components/link/equipment';

const ListEquipments = extend({
    styles: require('./styles.less'),
})(
    memo(
        ({
            className,
            classNameLink,
            list,
            array,
            children,
            highlight = [],
            ...props
        }) => {
            const _list = list || array || [];
            const hasItem = _list.length ? true : false;
            delete props.type;
            return (
                <div className={className}>
                    {hasItem &&
                        _list
                            .map((equipmentId) => getEquipment(equipmentId))
                            .sort((a, b) => a.order - b.order)
                            .map((equipment) => (
                                <LinkEquipment
                                    equipment={equipment}
                                    key={equipment.id}
                                    className={classNames([
                                        'item',
                                        'color-alt',
                                        classNameLink,
                                        {
                                            'mod-highlight': highlight.includes(
                                                equipment.id
                                            ),
                                        },
                                    ])}
                                    {...props}
                                />
                            ))}
                    {children}
                </div>
            );
        }
    )
);

export default ListEquipments;
