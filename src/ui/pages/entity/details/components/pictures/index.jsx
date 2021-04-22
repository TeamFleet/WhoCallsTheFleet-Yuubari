import { memo } from 'react';
import { extend } from 'koot';

import Image from '@ui/components/image';
import ComponentContainer from '@ui/containers/infos-component';

import getPic from '@utils/get-pic';

const EntityDetailsComponentPictures = extend({
    styles: require('./styles.less'),
})(
    memo(({ className, entity }) => (
        <ComponentContainer className={className}>
            <Image className="picture" src={getPic('entity', entity.id, '2')} />
        </ComponentContainer>
    ))
);

export default EntityDetailsComponentPictures;
