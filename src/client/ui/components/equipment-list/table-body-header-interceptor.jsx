import React from 'react'

import { stats } from './table-body'
import DataTableFlex, { Row, Cell } from '@appUI/components/datatable-flex'

import translate from 'sp-i18n'
import { ImportStyle } from 'sp-css-import'

@ImportStyle(require('./table-body-header-interceptor.less'))
export default class EquipmentListTableBodyHeaderInterceptor extends React.Component {
    render() {
        return (
            <div className={this.props.className}>
                <EquipmentListTableBodyHeaderInterceptorBody />
            </div>
        )
    }
}

@ImportStyle(require('./table-body.less'))
class EquipmentListTableBodyHeaderInterceptorBody extends React.Component {
    renderCellStat(stat) {
        if (this.props.collection === 2 && stat === 'range')
            stat = 'distance'

        let content = null

        if (stat === 'hit')
            content = translate('stat.antibomber')
        else if (stat === 'evasion')
            content = translate('stat.interception')

        return (
            <Cell
                key={stat}
                className={`cell stat-${stat}`}
                data-stat={stat.replace(/^equipment\./, '') || undefined}
            >
                {content}
            </Cell>
        )
    }

    render() {
        return (
            <DataTableFlex className={this.props.className + ' flex is-header'}>
                <Row className="row">
                    <Cell className="cell cell-name" />
                    {stats.map(this.renderCellStat.bind(this))}
                </Row>
            </DataTableFlex>
        )
    }
}