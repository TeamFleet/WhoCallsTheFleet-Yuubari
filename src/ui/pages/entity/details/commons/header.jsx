import { memo } from 'react';
import { extend } from 'koot';

import Header from '@ui/components/main-header/infos';

import getSubtitle from '../get-subtitle';
// import db from '@database'

const EntityDetailsHeader = extend({
    connect: (state) => ({
        localeId: state.localeId,
    }),
    styles: require('./header.less'),
})(
    memo(({ className, entity, localeId }) => {
        if (!entity) return null;
        return (
            <Header
                className={className}
                title={entity._name}
                subtitle={getSubtitle(entity)}
            >
                {localeId !== 'ja' && (
                    <span className="name-ja">{entity.getName('ja_jp')}</span>
                )}
            </Header>
        );
    })
);

export default EntityDetailsHeader;
