import React from 'react'
import { connect } from 'react-redux'
import translate from 'sp-i18n'
import { ImportStyle } from 'sp-css-import'
import kckit from 'kckit'
import EquipmentTypes from 'kckit/src/types/equipments'

import db from '@appLogic/database'

import htmlHead from '@appUtils/html-head'

import Page from '@appUI/containers/page'
import Title from '@appUI/components/title'
import Counter from '@appUI/components/input/counter'

const shipTypes = [
    1,  // DD
    2,  // CL
    21, // CT
    5,  // CAV
    8,  // BBV
    12, // AV
    14, // SSV
    15, // LHA
    29, // AO
    17, // AS
]

const equipmentTypes = [
    EquipmentTypes.SupplyContainer,
    EquipmentTypes.LandingCraft,
    EquipmentTypes.AmphibiousCraft,
    EquipmentTypes.CombatRation,
]

@connect()
// @ImportStyle(style)
export default class extends React.Component {
    static onServerRenderHtmlExtend(ext, store) {
        const head = htmlHead({
            store,
            title: translate('nav.calctp')
        })

        ext.metas = ext.metas.concat(head.meta)
        ext.title = head.title
    }

    constructor() {
        super()
        this.state = {
            countShipType: {},
            countEquipmentType: {},
        }
    }

    render() {
        return (
            <Page
                className={this.props.className}
            >
                <Title component="h2" children={translate('nav.calctp')} />
                <p><i>{translate('under_construction')}...</i></p>

                <PageCalcTPBody />
            </Page>
        )
    }
}

class PageCalcTPBody extends React.Component {
    constructor() {
        super()
        this.count = {
            shipType: {},
            equipmentType: {},
        }
        this.state = {
            result: 0,
        }
    }

    update() {
        this.setState({
            result: kckit.calculate.tp(this.count)
        })
    }

    render() {
        return (
            <div className={this.props.className}>
                <fieldset>
                    <legend>舰种</legend>
                    {shipTypes.map((typeId, index) => (
                        <div key={index}>
                            <span>{db.shipTypes[typeId]._name}</span>
                            <Counter
                                min={0}
                                onUpdate={newValue => {
                                    this.count.shipType[typeId] = newValue
                                    this.update()
                                }}
                            />
                        </div>
                    ))}
                </fieldset>

                <fieldset>
                    <legend>装备类型</legend>
                    {equipmentTypes.map((typeId, index) => (
                        <div key={index}>
                            <span>{db.equipmentTypes[typeId]._name}</span>
                            <Counter
                                min={0}
                                onUpdate={newValue => {
                                    this.count.equipmentType[typeId] = newValue
                                    this.update()
                                }}
                            />
                        </div>
                    ))}
                </fieldset>

                <fieldset>
                    <legend>结果</legend>
                    <div>S: {this.state.result}</div>
                    <div>A: {Math.floor(this.state.result * 0.7)}</div>
                </fieldset>
            </div>
        )
    }
}