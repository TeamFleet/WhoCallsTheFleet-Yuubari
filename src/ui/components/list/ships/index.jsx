import { memo } from 'react';
import classNames from 'classnames';
import { extend } from 'koot';

import getShip from '@utils/get-ship.js';
import sortShips from '@utils/sort-ships.js';

import ListContainer from '@ui/containers/list';

import LinkShip from '@ui/components/link/ship';
import LinkMini from '@ui/components/link-mini';

const ListShips = extend({
    styles: require('./styles.less'),
})(
    memo(
        ({
            className,
            classNameItem,

            list: _list,
            array: _array,
            ships: _ships,

            empty,

            grid = true,
            size,
            gutter,

            type,
            sort = true,

            children,
            ...props
        }) => {
            const list = _list || _array || _ships || [];
            const hasItem = Array.isArray(list) && list.length ? true : false;
            const listSorted = hasItem
                ? sort
                    ? sortShips(list.map((shipId) => getShip(shipId)))
                    : list.map((shipId) => getShip(shipId)) /*.sort((a, b) => (
                    a.order - b.order
                ))*/
                : false;

            return (
                <ListContainer
                    className={classNames({
                        [className]: true,
                        'no-grid': !grid,
                    })}
                    grid={grid}
                    gutter={gutter}
                >
                    {hasItem &&
                        listSorted
                            .filter((s) => !!s)
                            .map((ship, index) =>
                                size === 'mini' ? (
                                    <LinkMini
                                        ship={ship}
                                        key={ship?.id ?? `__${index}__`}
                                        className={classNames([
                                            classNameItem,
                                            'item',
                                        ])}
                                        {...props}
                                    />
                                ) : (
                                    <LinkShip
                                        ship={ship}
                                        key={ship.id}
                                        className={classNames([
                                            classNameItem,
                                            'item',
                                        ])}
                                        type={
                                            typeof type === 'undefined'
                                                ? true
                                                : type
                                        }
                                        {...props}
                                    />
                                )
                            )}
                    {!hasItem && !!empty && (
                        <span className="list-empty">{empty}</span>
                    )}
                    {children}
                </ListContainer>
            );
        }
    )
);

export default ListShips;
