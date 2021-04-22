import { extend } from 'koot';

import getPic from '@utils/get-pic';

import Image from '@ui/components/image';
import ComponentContainer from '@ui/containers/infos-component';

const EquipmentDetailsComponentIllust = extend({
    styles: require('./styles.less'),
})(({ className, equipment }) => (
    <ComponentContainer className={className}>
        <Image
            className="illust"
            src={getPic(
                'equipment',
                equipment.id,
                'card',
                equipment.illust_version
            )}
        />
    </ComponentContainer>
));

export default EquipmentDetailsComponentIllust;
