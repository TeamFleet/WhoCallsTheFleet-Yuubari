import Bullet from '@ui/components/bullet';
import { wrapper as moduleClassName } from './index.less';

export default () => (
    <div className={`${moduleClassName}-legend`}>
        <div className="wrapper">
            <Bullet
                className="item"
                title={__('ship_details.unable_to_perform')}
                level={false}
            />
            <Bullet
                className="item"
                title={__('ship_details.can_perform_when_meet_requirements')}
                level="indeterminate"
            />
            <Bullet
                className="item"
                title={__('ship_details.can_always_perform')}
                level={true}
            />
        </div>
    </div>
);
