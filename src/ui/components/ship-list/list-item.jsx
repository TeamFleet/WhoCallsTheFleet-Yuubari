import React from 'react'
import classNames from 'classnames'
import { extend } from 'koot'

import {
    compareAdd,
    compareRemove,
    compareEnter
} from '@api/ship-list/api'

import LinkShip from '@ui/components/link/ship'
import Icon from '@ui/components/icon'


//


@extend({
    connect: (state, ownProps) => ({
        isModeCompare: state.shipList[ownProps.shipListId].isModeCompare,
        compareList: state.shipList[ownProps.shipListId].compareList
    }),
    styles: require('./list-item.less')
})
class ShipListItem extends React.Component {
    onClick(evt, isSelected) {
        if (this.props.isModeCompare) {
            evt.preventDefault()
            if (isSelected) {
                this.props.dispatch(compareRemove(this.props.shipListId, this.props.ship))
            } else {
                this.props.dispatch(compareAdd(this.props.shipListId, this.props.ship))
            }
        }
    }
    onClickCheckbox(evt) {
        evt.preventDefault()
        if (!this.props.isModeCompare) {
            this.props.dispatch(compareEnter(this.props.shipListId))
            this.props.dispatch(compareAdd(this.props.shipListId, this.props.ship))
        }
    }

    shouldComponentUpdate(nextProps, /*nextState*/) {
        if (this.props.ship !== nextProps.ship) return true
        if (this.props.isModeCompare !== nextProps.isModeCompare) return true

        if (this.props.compareList.indexOf(this.props.ship) !== !nextProps.compareList.indexOf(this.props.ship)) return true
        else
            return false

        // return false
    }

    render() {
        const isSelected = (__CLIENT__ && this.props.isModeCompare && this.props.compareList.indexOf(this.props.ship) > -1) ? true : false
        const showCheckbox = __CLIENT__
        // const className =
        //     "item"
        //     + (this.props.isModeCompare ? ' is-compare' : '')
        //     + (isSelected ? ' is-selected' : '')
        // console.log(this.props.ship._name, className)
        return (
            <LinkShip
                className={classNames([
                    this.props.className,
                    'item',
                    {
                        'is-compare': this.props.isModeCompare,
                        'is-selected': isSelected
                    }
                ])}

                ship={this.props.ship}
                navy={true}
                name={true}
                pic={true}
                extraIllust={true}

                onClick={(evt) => this.onClick(evt, isSelected)}
            >
                {showCheckbox && <span className="checkbox" onClick={this.onClickCheckbox.bind(this)}>
                    <ShipListItemCheckbox isSelected={isSelected} />
                </span>}
            </LinkShip>
        )
    }
}
export default ShipListItem


//


const ShipListItemCheckbox = ({ isSelected }) => {
    if (isSelected)
        return <Icon className="icon" icon="checkbox-checked" />
    return null
}
