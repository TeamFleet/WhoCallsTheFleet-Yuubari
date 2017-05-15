import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import translate from 'sp-i18n'
import PageContainer from 'sp-ui-pagecontainer'
import htmlHead from 'Utils/html-head.js'
import db from '../../logic/database'

import { ImportStyle } from 'sp-css-import'
import style from './ship-details.less'

@connect()
@ImportStyle(style)
export default class extends React.Component {
    static htmlExtends(ext, store) {
        const head = htmlHead({
            store,
            title: db.ships[store.getState().routing.locationBeforeTransitions.pathname.split('/').reverse()[0]]._name
        })

        ext.meta = ext.meta.concat(head.meta)
        ext.title = head.title
    }

    get data() {
        if (!this._data && this.props.params.id)
            this._data = db.ships[this.props.params.id]
        return this._data || {}
    }

    renderSeries() {
        const serieses = this.data._series
        console.log(serieses)
        return (
            <div>
                <table>
                    <tbody>
                        {serieses.map((series, i) => (
                            <tr key={i}>
                                <th style={{
                                    textAlign: 'right'
                                }}><i>
                                    {i == 0 && "-"}
                                    {i > 0 && serieses[i-1].next_lvl}
                                    {i > 0 && serieses[i-1].next_blueprint === 'on' && <small><br/>+ Blueprint</small>}
                                    {i > 0 && serieses[i-1].next_catapult === 'on' && <small><br/>+ Catapult</small>}
                                    {i > 0 && serieses[i-1].next_loop === 'on' && ' (Switchable)'}
                                </i></th>
                                <td>
                                    {this.data.id === series.id && db.ships[series.id]._name}
                                    {this.data.id !== series.id && <Link to={`/ships/${series.id}`}>
                                        {db.ships[series.id]._name}
                                    </Link>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }

    renderSlotEquipments() {
        let i = 0
        let renderArr = []
        while(i < 4){
            const slot = this.data.slot[i]
            const equipmentId = typeof slot !== 'undefined' ? this.data.equip[i] : undefined
            renderArr.push(
                <tr key={i}>
                    <th style={{
                        textAlign: 'right'
                    }}><i>{typeof slot !== 'undefined' ? slot : "-"}</i></th>
                    <td>
                        {equipmentId &&
                            <Link to={`/equipments/${equipmentId}`}>
                                {db.equipments[equipmentId]._name}
                            </Link>
                        }
                        {!equipmentId && "-"}
                    </td>
                </tr>
            )
            i++
        }
        return (
            <div>
                <h4>{translate('ship_details.slot_and_equipments')}</h4>
                <table>
                    <tbody>
                        {renderArr}
                    </tbody>
                </table>
            </div>
        )
    }

    render() {
        if (__CLIENT__ && __DEV__) console.log('thisShip', this.data)
        return (
            <PageContainer
                className={this.props.className}
            >
                <h2>{this.data._name}</h2>
                <p><i>{translate('under_construction')}...</i></p>

                {this.renderSeries()}
                {this.renderSlotEquipments()}
            </PageContainer>
        )
    }
}