import { memo } from 'react';
import { extend } from 'koot';

export default extend({
    styles: require('./indeterminate-box.less'),
})(
    memo((props) => {
        return <span {...props} />;
    })
);
