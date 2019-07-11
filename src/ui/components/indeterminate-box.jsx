import React from 'react';
import { extend } from 'koot';

export default extend({
    styles: require('./indeterminate-box.less')
})(props => {
    return <span {...props} />;
});
