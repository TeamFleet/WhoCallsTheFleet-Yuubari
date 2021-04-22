import { memo } from 'react';
import { extend } from 'koot';

import getStyles from '@utils/background-styles';

const Background = extend({
    connect: (state) => ({
        currentBg: state.bgimg.current,
    }),
    styles: require('./background.less'),
})(
    memo(({ className, currentBg, type }) => (
        <div className={className}>
            <div className="background" style={getStyles(currentBg, type)} />
        </div>
    ))
);

export default Background;
