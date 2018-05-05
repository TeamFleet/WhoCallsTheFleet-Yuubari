import React from 'react'

import { ImportStyle } from 'sp-css-import'

import getShip from '@appUtils/get-ship.js'

import ComponentContainer from '@appUI/containers/infos-component'
import ListShips from '@appUI/components/list/ships'

// @connect()
@ImportStyle(require('./styles.less'))
export default class EquipmentDetailsComponentStocked extends React.Component {
    list = this.props.equipment.default_equipped_on || []
    getList() {
        const list = {}
        const levels = []
        const classNameThis = this.props.className.split([' '])[0]
        this.list.forEach(shipId => {
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
        return levels.map((level, index) => (
            <div
                className={
                    classNameThis + "-level"
                    + (!index ? ' is-first' : '')
                    + (index >= levels.length - 1 ? ' is-last' : '')
                }
                key={level}
            >
                <span className="level">{level}</span>
                <ListShips
                    className={classNameThis + '-list'}
                    list={list[level]}
                    size="mini"
                    grid={false}
                />
            </div>
        ))
    }
    render() {
        return (
            <ComponentContainer className={this.props.className} title={__("equipment_details.stocked")}>
                {!!this.list.length && this.getList()}
                {!this.list.length && <span className="disabled">{__("none")}</span>}
                {/* <ListShips
                    list={this.props.equipment.default_equipped_on || []}
                    empty={__("equipment_details.stocked_list_empty")}
                    sort={true}

                    navy={true}
                    min-level={true}
                /> */}
            </ComponentContainer>
        )
    }
}
