import React from 'react'
import { extend } from 'koot'

import { stats } from './table-body'
import DataTableFlex, { Row, Cell } from '@ui/components/datatable-flex'


//


const EquipmentListTableBodyHeaderInterceptor = extend({
    styles: require('./table-body-header-interceptor.less')
})(
    ({ className }) => (
        <div className={className}>
            <Body />
        </div>
    )
)
export default EquipmentListTableBodyHeaderInterceptor


//


const Body = extend({
    styles: require('./table-body.less')
})(
    ({ className, collection }) => (
        <DataTableFlex className={className + ' flex is-header'}>
            <Row className="row">
                <Cell className="cell cell-name" />
                {stats.map((stat) => {
                    if (collection === 2 && stat === 'range')
                        stat = 'distance'

                    let content = null

                    if (stat === 'hit')
                        content = __('stat.antibomber')
                    else if (stat === 'evasion')
                        content = __('stat.interception')

                    return (
                        <Cell
                            key={stat}
                            className={`cell stat-${stat}`}
                            data-stat={stat.replace(/^equipment\./, '') || undefined}
                        >
                            {content}
                        </Cell>
                    )
                })}
            </Row>
        </DataTableFlex>
    )
)
