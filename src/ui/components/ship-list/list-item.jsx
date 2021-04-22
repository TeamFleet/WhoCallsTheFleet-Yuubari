import { Component } from 'react';
import classNames from 'classnames';
import { extend } from 'koot';

import { compareAdd, compareRemove, compareEnter } from '@api/ship-list/api';

import LinkShip from '@ui/components/link/ship';
import Icon from '@ui/components/icon';

//

@extend({
    connect: (state, ownProps) => ({
        isModeCompare: state.shipList[ownProps.shipListId].isModeCompare,
        compareList: state.shipList[ownProps.shipListId].compareList,
    }),
    styles: require('./list-item.less'),
})
class ShipListItem extends Component {
    constructor(props) {
        super(props);

        ['onClick', 'onClickCheckbox'].forEach((e) => {
            this[e] = this[e].bind(this);
        });
    }

    get isSelected() {
        return __CLIENT__ &&
            this.props.isModeCompare &&
            this.props.compareList.indexOf(this.props.ship.id) > -1
            ? true
            : false;
    }

    onClick(evt) {
        if (this.props.isModeCompare) {
            evt.preventDefault();
            if (this.isSelected) {
                this.props.dispatch(
                    compareRemove(this.props.shipListId, this.props.ship)
                );
            } else {
                this.props.dispatch(
                    compareAdd(this.props.shipListId, this.props.ship)
                );
            }
        }
    }
    onClickCheckbox(evt) {
        evt.preventDefault();
        if (!this.props.isModeCompare) {
            this.props.dispatch(compareEnter(this.props.shipListId));
            this.props.dispatch(
                compareAdd(this.props.shipListId, this.props.ship)
            );
        }
    }

    shouldComponentUpdate(nextProps /*nextState*/) {
        if (this.props.ship !== nextProps.ship) return true;
        if (this.props.isModeCompare !== nextProps.isModeCompare) return true;

        if (
            this.props.compareList.indexOf(this.props.ship.id) !==
            !nextProps.compareList.indexOf(this.props.ship.id)
        )
            return true;

        return false;
    }

    render() {
        const showCheckbox = __CLIENT__;
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
                        'is-selected': this.isSelected,
                    },
                ])}
                ship={this.props.ship}
                navy={true}
                name={true}
                pic={true}
                extraIllust={true}
                onClick={this.onClick}
            >
                {showCheckbox && (
                    <span className="checkbox" onClick={this.onClickCheckbox}>
                        <ShipListItemCheckbox isSelected={this.isSelected} />
                    </span>
                )}
            </LinkShip>
        );
    }
}
export default ShipListItem;

//

const ShipListItemCheckbox = ({ isSelected }) => {
    if (isSelected) return <Icon className="icon" icon="checkbox-checked" />;
    return null;
};
