import { extend } from 'koot';

const CenterContainer = extend({
    styles: require('./styles.less'),
})(({ className, children }) => (
    <div className={className} children={children} />
));

export default CenterContainer;
