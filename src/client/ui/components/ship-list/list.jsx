import React from 'react'

import pref from 'Logic/preferences'

import LinkShip from 'UI/components/link-ship.jsx'

import { ImportStyle } from 'sp-css-import'
import styleList from './list.less'

@ImportStyle(styleList)
export default class ShipListList extends React.Component {
    // getList() {
    //     let list = []
    // }
    insertPlaceHolders() {
        let i = 0;
        let arr = []
        while (i++ < 10) arr.push(<span className="item placeholder" key={i}></span>)
        return arr
    }

    checkLastRemodelLoop(ships, index) {
        while (ships[index].remodel && ships[index].remodel.next_loop)
            index++
        return index === ships.length - 1
    }

    renderItem(ship, index) {
        return (
            <Link
                ship={ship}
                key={index}
                
                isModeCompare={this.props.isModeCompare}
                onCompareSelect={this.props.onCompareSelect}
                compareList={this.props.compareList}
            />
        )
    }

    render() {
        return (
            <div className={this.props.className}>
                {this.props.ships.map((ships, index) => {
                    if (Array.isArray(ships))
                        return ships.map((ship, index2) => {
                            if (!this.props.showHidden
                                && !pref.shipListShowAllShips
                                && index2 < ships.length - 1
                                && !this.checkLastRemodelLoop(ships, index2)
                            )
                                return null
                            return this.renderItem(ship, index + '-' + index2)
                        })
                    return this.renderItem(ships, index)
                })}
                {this.insertPlaceHolders()}
            </div>
        )
    }
}

class Link extends React.Component {
    onClick(evt, isSelected) {
        if (this.props.isModeCompare) {
            evt.preventDefault()
            if (typeof this.props.onCompareSelect !== 'undefined')
                this.props.onCompareSelect(evt, this.props.ship, isSelected)
        }
    }

    shouldComponentUpdate(nextProps, /*nextState*/) {
        if (this.props.ship !== nextProps.ship) return true
        if (this.props.isModeCompare !== nextProps.isModeCompare) return true

        if (!this.props.compareList && nextProps.compareList) return true
        if (this.props.compareList && !nextProps.compareList) return true
        if (!this.props.compareList && !nextProps.compareList) return false

        if (this.props.compareList.indexOf(this.props.ship) !== !nextProps.compareList.indexOf(this.props.ship)) return true
        else
            return false

        // return false
    }

    render() {
        const isSelected = (__CLIENT__ && this.props.compareList && this.props.compareList.indexOf(this.props.ship) > -1) ? true : false
        // const className =
        //     "item"
        //     + (this.props.isModeCompare ? ' is-compare' : '')
        //     + (isSelected ? ' is-selected' : '')
        // console.log(this.props.ship._name, className)
        return (
            <LinkShip
                className={
                    "item"
                    + (this.props.isModeCompare ? ' is-compare' : '')
                    + (isSelected ? ' is-selected' : '')
                }
                ship={this.props.ship}
                onClick={(evt) => this.onClick(evt, isSelected)}
            >
                {this.props.isModeCompare && 'COMPARE'}
            </LinkShip>
        )
    }
}