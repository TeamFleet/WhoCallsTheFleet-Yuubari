import classNames from 'classnames';
import checkCssProp from 'check-css-prop';
import { extend } from 'koot';

import getShip from '@utils/get-ship';
import getPic from '@utils/get-pic';

import LinkShip from '@ui/components/link/ship';
import Icon from '@ui/components/icon';
import ComponentContainer from '@ui/containers/infos-component';

const ShipDetailsComponentRemodels = extend({
    styles: require('./remodels.less'),
})(({ className, ship }) => (
    <ComponentContainer
        className={className}
        title={__('ship_details.remodels')}
    >
        <div className="container">
            {ship._series.map((current, index, series) => (
                <Series
                    key={index}
                    ship={ship}
                    current={current}
                    index={index}
                    series={series}
                />
            ))}
        </div>
    </ComponentContainer>
));

export default ShipDetailsComponentRemodels;

const Series = ({ current, index, series, ship }) => {
    const thisShip = getShip(current.id);
    const hasIcon =
        index > 0 &&
        (series[index - 1].next_blueprint === 'on' ||
            series[index - 1].next_catapult === 'on');
    return (
        <span
            className={classNames([
                'item',
                {
                    on: current.id === ship.id,
                    'is-has-icon': hasIcon,
                    'is-switchable':
                        index > 0 && series[index - 1].next_loop === 'on',
                    'is-need-blueprint':
                        index > 0 && series[index - 1].next_blueprint === 'on',
                    'is-need-catapult':
                        index > 0 && series[index - 1].next_catapult === 'on',
                },
            ])}
        >
            <span
                className={classNames([
                    'lvl',
                    {
                        'is-initial': index <= 0,
                    },
                ])}
            >
                {index > 0
                    ? series[index - 1].next_lvl
                    : __('ship_details.remodel_initial')}
                {index > 0 && series[index - 1].next_catapult === 'on' && (
                    <span className="icon icon-catapult" />
                )}
                {index > 0 && series[index - 1].next_blueprint === 'on' && (
                    <span className="icon icon-blueprint" />
                )}
            </span>
            <LinkShip
                className="ship"
                // to={`/ships/${current.id}`}
                ship={thisShip}
                navy={true}
                name={false}
                pic={false}
                extraIllust={true}
                replace={true}
            >
                <span
                    className="pic"
                    style={{
                        backgroundImage: `url(${getPic(
                            thisShip,
                            checkCssProp('mask') ? '0' : '0-1'
                        )})`,
                    }}
                />
                {index > 0 && series[index - 1].next_loop === 'on' && (
                    <Icon icon="loop" className="icon-switchable" />
                )}
            </LinkShip>
        </span>
    );
};
