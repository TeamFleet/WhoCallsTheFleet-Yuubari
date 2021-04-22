import { Fragment } from 'react';
import classNames from 'classnames';
import { extend } from 'koot';

import DataTableFlex, { Row, Cell } from '@ui/components/datatable-flex';

import { stats } from './table-body';

//

const EquipmentListTableBodyHeaderInterceptor = extend({
    styles: require('./table-body-header-interceptor.less'),
})(({ className }) => (
    <div className={className}>
        <Body />
    </div>
));
export default EquipmentListTableBodyHeaderInterceptor;

//

const Body = extend({
    styles: require('./table-body.less'),
})(({ className, collection }) => (
    <DataTableFlex className={className + ' flex is-header'}>
        <Row className="row">
            <Cell className="cell cell-name" />
            {stats.map((stat) => {
                if (collection === 2 && stat === 'range') stat = 'distance';

                let content = null;

                if (stat === 'aa') {
                    content = (
                        <Fragment>
                            {__('stat.aa')}
                            <sup>{__('stat.aa_interceptor_sortie')}</sup>
                            <sub>{__('stat.aa_interceptor_defense')}</sub>
                        </Fragment>
                    );
                } else if (stat === 'hit') content = __('stat.antibomber');
                else if (stat === 'evasion') content = __('stat.interception');

                return (
                    <Cell
                        key={stat}
                        className={classNames(['cell', `stat-${stat}`], {
                            'stat-aa-interceptor': stat === 'aa',
                        })}
                        data-stat={
                            stat.replace(/^equipment\./, '') || undefined
                        }
                    >
                        {content}
                    </Cell>
                );
            })}
        </Row>
    </DataTableFlex>
));
