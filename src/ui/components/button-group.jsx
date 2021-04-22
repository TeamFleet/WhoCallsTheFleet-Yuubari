import { memo } from 'react';
import { extend } from 'koot';

const ButtonGroup = extend({
    styles: require('./button-group.less'),
})(
    memo(({ className, children }) => (
        <span className={className}>{children}</span>
    ))
);

export default ButtonGroup;
