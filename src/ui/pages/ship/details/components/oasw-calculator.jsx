import { extend } from 'koot';

import ComponentContainer from '@ui/containers/infos-component';
import Bullet from '@ui/components/bullet';
import CalculatorLevelOASW from '@ui/components/calculator/level-oasw';

const ShipDetailsCalculatorOASW = extend({
    styles: require('./oasw-calculator.less'),
})(({ className, ship }) => (
    <ComponentContainer
        className={className}
        title={__('oasw_calculator.title')}
    >
        <CalculatorLevelOASW
            className="calculator"
            ship={ship}
            componentUnknown={
                <Bullet
                    className="special"
                    title={__('oasw_calculator.unknown')}
                    level={-1}
                />
            }
            componentUnable={
                <Bullet
                    className="special"
                    title={__('oasw_calculator.unable')}
                    level={0}
                />
            }
            componentAlways={
                <Bullet
                    className="special"
                    title={__('oasw_calculator.always')}
                    level={2}
                />
            }
        />
    </ComponentContainer>
));

export default ShipDetailsCalculatorOASW;
