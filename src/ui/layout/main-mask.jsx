import React from 'react';
import { extend } from 'koot';

const MainMask = extend({
    // connect: state => ({
    //     currentBg: state.bgimg.current,
    // }),
    styles: require('./main-mask.less'),
})(({ className, children }) => (
    <div id="main-mask" className={className}>
        {children}
    </div>
));
export default MainMask;
