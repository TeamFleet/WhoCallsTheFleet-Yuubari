import classNames from 'classnames';
import { extend } from 'koot';

import DataTable from '@ui/components/datatable.jsx';

import { stats } from './table-body';

const headers = ['', ...stats];

const ShipListTableHeader = extend({
    connect: (state, ownProps) => ({
        collection: state.equipmentList[ownProps.id].collection,
        //     sortType: state.shipList[ownProps.id].compareSort[0],
        //     sortOrder: state.shipList[ownProps.id].compareSort[1],
        //     scrollLeft: state.shipList[ownProps.id].compareScrollLeft
        // columnHighlight: state.equipmentList[ownProps.id].column
    }),
    styles: require('./table-header.less'),
})(({ className, collection }) => (
    <DataTable
        className={className}
        tag="div"
        headers={headers.map((stat) => {
            if (collection === 2 && stat === 'range') stat = 'distance';
            return [
                stat ? __('stat', stat) : null,
                {
                    className: classNames({
                        'cell-name': !stat,
                        // 'is-highlight': columnHighlight === stat
                    }),
                    'data-stat': stat.replace(/^equipment\./, '') || undefined,
                },
            ];
        })}
    />
));

export default ShipListTableHeader;
