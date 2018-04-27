import React from 'react'

import translate from 'super-i18n'
import { ImportStyle } from 'sp-css-import'

import getShip from '@appUtils/get-ship.js'
import sortShips from '@appUtils/sort-ships'

import ComponentContainer from '@appUI/containers/infos-component'
import ListEquipments from '@appUI/components/list/equipments'
import ListShips from '@appUI/components/list/ships'
// import LinkMini from '@appUI/components/link-mini'

// @connect()
@ImportStyle(require('./styles.less'))
export default class EquipmentDetailsComponentAcquisition extends React.Component {
    listUpgradeFrom = this.props.equipment.upgrade_from || []
    listStocked = this.props.equipment.default_equipped_on || []

    render() {
        // console.log(this.listUpgradeFrom, this.listStocked)
        const classNameThis = this.props.className.split([' '])[0]
        return (
            <ComponentContainer title={translate("equipment_details.acquisition")}>
                <dl className={this.props.className}>
                    <List
                        title={translate("equipment_details.upgrade_from")}
                        list={
                            this.listUpgradeFrom.length
                                ? <ListEquipments list={this.listUpgradeFrom} />
                                : undefined
                        }
                    />
                    <List
                        title={translate("equipment_details.stocked")}
                        list={
                            this.listStocked.length
                                ? <ListStockedBody
                                    className={classNameThis + "-stocked"}
                                    list={this.listStocked}
                                />
                                : undefined
                        }
                    />
                </dl>
            </ComponentContainer>
        )
    }
}

const List = ({
    title,
    list,
}) => {
    const _list = !list
        ? <dd className="empty">{translate("none")}</dd>
        : <dd>{list}</dd>
    return (
        <React.Fragment>
            <dt>{title}</dt>
            {_list}
        </React.Fragment>
    )
}

const ListStockedBody = ({ list: arrShipId, className }) => {
    const list = {}
    const levels = []
    const classNameThis = className.split([' '])[0]
    arrShipId.forEach(shipId => {
        const ship = getShip(shipId)
        // console.log(ship._name, ship._minLv)
        if (Array.isArray(list[ship._minLv])) {
            list[ship._minLv] = list[ship._minLv].concat(ship)
        } else {
            list[ship._minLv] = [ship]
            levels.push(ship._minLv)
        }
    })
    levels.sort()
    // console.log(list, levels)
    return (
        <div className={className}>
            {levels.map(level => (
                <div className={classNameThis + "-line"} key={level}>
                    <span className="badge">Lv.{level}</span>
                    <ListShips list={list[level]} size="mini" grid={false} />
                </div>
            ))}
        </div>
    )
}
