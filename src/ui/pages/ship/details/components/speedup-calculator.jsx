import { extend } from 'koot';

import ComponentContainer from '@ui/containers/infos-component';
import CalculatorSpeed from '@ui/components/calculator/speed';

const ShipDetailsCalculatorSpeedUp = extend({
    styles: require('./speedup-calculator.less'),
})(({ className, ship }) => (
    <ComponentContainer
        className={className}
        title={__('speed_calculator.title')}
    >
        <CalculatorSpeed className="calculator" ship={ship} />
    </ComponentContainer>
));

export default ShipDetailsCalculatorSpeedUp;
