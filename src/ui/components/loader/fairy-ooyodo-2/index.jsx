import { memo } from 'react';
import { extend } from 'koot';

const LoaderFairyOoyodo2 = extend({
    styles: require('./styles.less'),
})(memo((props) => <span {...props} />));

export default LoaderFairyOoyodo2;
