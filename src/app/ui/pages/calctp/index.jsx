import React from 'react'
import { connect } from 'react-redux'
import { ImportStyle } from 'sp-css-import'
import { pageinfo } from 'koot'
import kckit from 'kckit'
import EquipmentTypes from 'kckit/src/types/equipments'

import db from '@api/database'
import { init as pageInit, update as pageUpdate } from '@api/pages'

import htmlHead from '@utils/html-head'

import Page from '@ui/containers/page'
import Header from '@ui/components/main-header/main-options'
import Title from '@ui/components/title'
import Counter from '@ui/components/input/counter'
import IconEquipment from '@ui/components/icon-equipment'

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
@pageinfo(() => htmlHead({
    title: __('nav.calctp')
}))
@ImportStyle(require('./styles.less'))
export default class extends React.Component {

    constructor(props) {
        super(props)
        props.dispatch(
            pageInit(pageId, {
                result: 0
            })
        )
    }

    componentWillUnmount(){
        this.props.dispatch(pageUpdate(pageId, {
            result: 0
        }))
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
                children={__('nav.calctp')}
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
    count = {
        shipType: {},
        equipmentType: {},
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
                        children={__('ship_type')}
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
                        children={__('equipment_type')}
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
