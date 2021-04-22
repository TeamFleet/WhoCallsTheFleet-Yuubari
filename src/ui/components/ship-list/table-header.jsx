import { Component } from 'react';
import { extend } from 'koot';

import { compareScroll, compareSort } from '@api/ship-list/api';

import DataTable from '@ui/components/datatable';

const headers = [
    '',
    'fire',
    'torpedo',
    'night',
    'aa',
    'asw',
    'hp',
    'armor',
    'evasion',
    'carry',
    'speed',
    'range',
    'los',
    'luck',
    'consum.fuel',
    'consum.ammo',
];

@extend({
    connect: (state, ownProps) => ({
        sortType: state.shipList[ownProps.id].compareSort[0],
        sortOrder: state.shipList[ownProps.id].compareSort[1],
        scrollLeft: state.shipList[ownProps.id].compareScrollLeft,
    }),
    styles: require('./table-header.less'),
})
class ShipListTableHeader extends Component {
    sort(type) {
        this.props.dispatch(compareSort(this.props.id, type));
        this.props.dispatch(compareScroll(this.props.id, 0));
    }

    getHeaders() {
        return headers.map((stat) => {
            const type = stat.replace(/^consum\./, '');
            return [
                stat
                    ? __('stat', stat)
                    : // ? (<IconStat className="icon" stat={stat} />)
                      null,
                {
                    className:
                        'btn-sort' +
                        (this.props.sortType === type
                            ? ` is-sorting is-sorting-${this.props.sortOrder}`
                            : ''),
                    onClick: () => {
                        this.sort(type);
                    },
                },
            ];
        });
    }

    onScroll(evt) {
        this.scrollLeft = evt.target.scrollLeft;
        this.scrolling = true;
        setTimeout(() => {
            this.scrolling = false;
        });
        this.props.dispatch(compareScroll(this.props.id, this.scrollLeft));
    }
    onScroll = this.onScroll.bind(this);

    shouldComponentUpdate(nextProps) {
        if (this.scrolling && nextProps.scrollLeft === this.scrollLeft)
            return false;
        return true;
    }

    render() {
        return (
            <DataTable
                className={this.props.className + ' comparetable'}
                tag="div"
                headers={this.getHeaders()}
                onScroll={this.onScroll}
                scrollLeft={this.props.scrollLeft}
            />
        );
    }
}

export default ShipListTableHeader;
