import {
    Fragment,
    useEffect,
    // forwardRef
} from 'react';
import { extend } from 'koot';
import { get } from 'kckit';
import equipmentTypes from 'kckit/src/types/equipments';

import { highlightColumn } from '@api/equipment-list/api';
import getFromState from '@api/equipment-list/get-from-state';
import arrStats from '@const/equipment-stats';
import routerPush from '@utils/router-push';
import getLink from '@utils/get-link';

import DataTable from '@ui/components/datatable';
import Link from '@ui/components/link';
import { observerItem } from '@ui/hoc/observer';

export const stats = [
    ...arrStats,
    'equipment.craftable',
    'equipment.improvable',
];

const getData = (props) => {
    if (!Array.isArray(props.equipments)) return [];
    // console.log(props.equipments)

    return props.equipments.map((equipment) => {
        const cells = [
            {
                className: 'cell-name',
                children: (
                    <Link to={getLink('equipment', equipment.id)}>
                        {equipment._name}
                    </Link>
                ),
            },
        ];
        const isInterceptor = equipmentTypes.Interceptors.includes(
            equipment.type
        );

        stats.forEach((stat, indexStat) => {
            if (props.collection === 2 && stat === 'range') stat = 'distance';

            const value = equipment.stat[stat];
            let children = value;
            let className = 'stat-' + stat;
            let trueValue = value;

            if (stat.indexOf('equipment.') > -1) {
                const type = stat.substr('equipment.'.length);
                if (equipment[type]) {
                    children = '✓';
                    trueValue = 1;
                } else {
                    children = '-';
                    trueValue = 0;
                    className += ' empty';
                }
            } else if (value < 0) {
                className += ' negative';
            } else if (!value) {
                className += ' empty';
                children = '-';
            } else if (stat === 'range' || stat === 'speed') {
                trueValue = value;
                children = get[stat](value);
            } else if (isInterceptor && stat === 'aa') {
                className += ' stat-aa-interceptor';
                children = (
                    <Fragment>
                        {value}
                        <sup>{value + (equipment.stat.evasion * 1.5 || 0)}</sup>
                        <sub>
                            {value +
                                (equipment.stat.evasion || 0) +
                                (equipment.stat.hit * 2 || 0)}
                        </sub>
                    </Fragment>
                );
            }

            if (props.sortType === stat) className += ' is-sorting';

            // if (!index && props.columnHighlight === stat)
            //     className += ' is-hover'

            cells.push({
                className,
                children,
                'data-stat': stat.replace(/^equipment\./, '') || undefined,
                // "data-value": trueValue,
                value: trueValue,
                onMouseEnter: () => {
                    // this.getContainer(evt.target).setAttribute('data-highlighting', indexStat)
                    props.dispatch(
                        highlightColumn(props.id, indexStat, stat)
                        // highlightColumn(props.id, indexStat)
                        // highlightColumn(props.id, stat)
                    );
                },
                onMouseLeave: () => {
                    // this.getContainer(evt.target).removeAttribute('data-highlighting')
                    props.dispatch(
                        highlightColumn(props.id, undefined, undefined)
                    );
                },
            });
        });

        return {
            key: equipment.id,
            cells,
            props: {
                className: isInterceptor ? 'mod-interceptor' : null,
                onClick: () => {
                    if (__CLIENT__)
                        routerPush(getLink('equipment', equipment.id));
                },
            },
        };
    });
};

const EquipmentListTableBody = extend({
    connect: (state, ownProps) => ({
        collection: getFromState(state, ownProps).collection,
        observer: getFromState(state, ownProps).observer,
        // columnHighlight: state.equipmentList[ownProps.id].column
    }),
    styles: require('./table-body.less'),
})(
    observerItem(({ className, forwardedRef, ...props }) => {
        useEffect(() => {
            console.log('EquipmentListTableBody didMount', forwardedRef);
        }, [forwardedRef]);
        return (
            <DataTable
                className={className}
                forwardedRef={forwardedRef}
                tag="div"
                data={getData(props)}
            />
        );
    })
);

export default EquipmentListTableBody;
