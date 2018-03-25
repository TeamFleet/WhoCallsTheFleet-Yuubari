import React from 'react'
import { connect } from 'react-redux'
import translate from 'sp-i18n'
import { ImportStyle } from 'sp-css-import'
import kckit from 'kckit'
import EquipmentTypes from 'kckit/src/types/equipments'

import db from '@appLogic/database'
import { init as pageInit, update as pageUpdate } from '@appLogic/pages'

import htmlHead from '@appUtils/html-head'

import Page from '@appUI/containers/page'
import Header from '@appUI/components/main-header/main-options'
import Title from '@appUI/components/title'
import Counter from '@appUI/components/input/counter'
import IconEquipment from '@appUI/components/icon-equipment'

const pageId = 'CALCTP'

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
@ImportStyle(require('./styles.less'))
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

    componentWillMount() {
        this.props.dispatch(
            pageInit(pageId, {
                result: 0
            })
        )
    }

    render() {
        return (
            <Page
                className={this.props.className}
            >
                <PageCalcTPHeader
                    className={this.props.className + '-header'}
                />
                <PageCalcTPBody
                    className={this.props.className + '-body'}
                />
            </Page>
        )
    }
}

const PageCalcTPHeader = ({ className }) => (
    <Header
        className={className}
        main={
            <Title
                className={className + '-title'}
                component="h2"
                children={translate('nav.calctp')}
            />
        }
        options={
            <PageCalcTPResult
                className={className + '-result'}
            />
        }
    />
)

@connect(state => ({
    result: state.pages[pageId].result
}))
class PageCalcTPBody extends React.Component {
    constructor() {
        super()
        this.count = {
            shipType: {},
            equipmentType: {},
        }
    }

    update() {
        this.props.dispatch(pageUpdate(pageId, {
            result: kckit.calculate.tp(this.count)
        }))
    }

    render() {
        return (
            <div className={this.props.className}>
                <div className={this.props.className + "-set"}>
                    <Title
                        className={this.props.className + "-title"}
                        component="h4"
                        // type="line-append"
                        children={translate('ship_type')}
                    />
                    <div className={this.props.className + "-grid"}>
                        {shipTypes.map((typeId, index) => (
                            <PageCalcTPCounter
                                className={this.props.className + "-counter"}
                                key={index}
                                name={[
                                    db.shipTypes[typeId]._name,
                                    <small key="code">[{db.shipTypes[typeId].code}]</small>
                                ]}
                                onUpdate={newValue => {
                                    this.count.shipType[typeId] = newValue
                                    this.update()
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className={this.props.className + "-set"}>
                    <Title
                        className={this.props.className + "-title"}
                        component="h4"
                        // type="line-append"
                        children={translate('equipment_type')}
                    />
                    <div className={this.props.className + "-grid"}>
                        {equipmentTypes.map((typeId, index) => (
                            <PageCalcTPCounter
                                className={this.props.className + "-counter"}
                                key={index}
                                name={db.equipmentTypes[typeId]._name}
                                icon={db.equipmentTypes[typeId].icon}
                                onUpdate={newValue => {
                                    this.count.equipmentType[typeId] = newValue
                                    this.update()
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

const PageCalcTPResult = connect(state => ({
    result: state.pages[pageId].result
}))(
    ({ className, result }) => (
        <div
            className={className}
        >
            <strong>S: {result}</strong>
            <span>A: {Math.floor(result * 0.7)}</span>
        </div>
    )
)

const PageCalcTPCounter = ({
    className,
    name,
    min = 0,
    onUpdate,
    icon,
}) => {
    return (
        <div className={className}>
            {typeof icon === 'undefined'
                ? <span className={className + '-name'}>{name}</span>
                : <IconEquipment className={className + '-name'} icon={icon} children={name} />
            }
            <Counter
                min={min}
                onUpdate={onUpdate}
                className={className + '-counter'}
            />
        </div>
    )
}