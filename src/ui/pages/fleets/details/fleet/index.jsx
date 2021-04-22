// import classNames from 'classnames'
import { extend } from 'koot';

import { defaultShipInFleetCount } from '@api/fleets';
import selectShip from '@actions/select-ship';

import Button from '@ui/components/button';

const FleetDetailsSubfleet = extend({
    connect: (state) => {
        // console.log(state)
        if (
            !state.fleets.current ||
            typeof state.fleets.current.currentTab !== 'number'
        )
            return {};
        const index = state.fleets.current.currentTab;
        return {
            id: state.fleets.current._id,
            index,
            count: Math.max(
                defaultShipInFleetCount,
                (state.fleets.current.fleets[index] || []).length
            ),
        };
    },
    styles: require('./styles.less'),
})(({ index, count, className }) => {
    if (typeof index !== 'number') return null;

    const ships = [];
    function onClick() {
        selectShip();
    }

    for (let i = 0; i < count; i++) {
        ships.push(
            <div
                key={i}
                data-ship-index={i}
                data-fleet-index={index}
                onClick={onClick}
            >
                Fleet #{index + 1} | Ship #{i + 1}
            </div>
        );
    }

    return (
        <div className={className}>
            {ships}
            <Button children="+ [WIP] ADD" />
        </div>
    );
});

export default FleetDetailsSubfleet;
