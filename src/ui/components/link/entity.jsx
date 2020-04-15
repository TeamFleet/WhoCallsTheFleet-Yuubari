import React from 'react';
import { extend } from 'koot';

import getEntity from '@utils/get-entity.js';
import getPic from '@utils/get-pic.js';
import getLink from '@utils/get-link.js';

import LinkDefault from './_normal';

const checkShow = (value) => value || typeof value === 'undefined';

const LinkEntity = extend({
    styles: require('./entity.less'),
})(({ entity: _entity, id, pic, name, children, count, ...props }) => {
    const entity = getEntity(_entity || id);

    return (
        <LinkDefault
            to={getLink('entity', entity.id)}
            pic={checkShow(pic) ? getPic(entity, '0-2') : null}
            name={checkShow(name) ? entity._name : null}
            nameExtra={count ? `(${entity.relation[count].length})` : undefined}
            type="entity"
            {...props}
        >
            {children}
        </LinkDefault>
    );
});

export default LinkEntity;
