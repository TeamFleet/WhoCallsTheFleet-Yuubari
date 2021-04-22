import { extend } from 'koot';

import Reffitable from './components/refittable';

const EquipmentDetailsRefittable = extend({
    styles: require('./refittable.less'),
})(({ className, equipment }) => (
    <div className={className}>
        <Reffitable equipment={equipment} />
    </div>
));

export default EquipmentDetailsRefittable;
