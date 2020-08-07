// import getPublicPath from 'koot/utils/get-public-dir';

import db from '@database';

// const publicPath = __DEV__ ? '/' : getPublicPath();
// const ext =
//     __CLIENT__ && document.documentElement.classList.contains('webp')
//         ? 'webp'
//         : 'png';
const ext = 'png';

const getHasedUrl = (type, id, _file) => {
    if (typeof db.cgmaps[type][id] !== 'object') return '';

    const [file, mask] = `${_file}`.split('-');

    if (typeof db.cgmaps[type][id][file] !== 'string') return '';

    return `/pics/${db.cgmaps[type][id][file]}${mask ? `/m${mask}` : ''}${
        ext === 'webp' ? '/webp' : ''
    }`;
};

const getUri = (type, id, file, revision) => {
    const sampleShip = db.ships[1];
    const sampleEntity = db.entities[1];

    if (typeof type === 'object') {
        if (type.constructor === sampleShip.constructor)
            return getUri('ship', type.id, id);
        if (type.constructor === sampleEntity.constructor)
            return getUri('entity', type.id, id);
    }

    // console.log('\n\n')
    // console.log({ type, Ship })
    // console.log({ 'type instanceof Ship': type instanceof Ship })
    // console.log({ id, file })
    if (typeof id !== 'undefined' && typeof file === 'undefined') {
        const arr = id.split('/');
        if (arr.length > 1) return getUri(type, arr[0], arr[1].split('.')[0]);
        return '';
    }

    if (revision) revision = '?' + revision;
    else revision = '';

    switch (type) {
        case 'ship':
        case 'ships': {
            return getHasedUrl('ships', id, file);
            // const ship = db.ships[id];
            // return (
            //     'ships/' +
            //     ship.getPic(file, '.' + ext) +
            //     (ship.illust_version ? `?version=${ship.illust_version}` : '')
            // );
        }

        case 'ship-extra':
        case 'ships-extra': {
            return getHasedUrl('shipsExtra', id, file);
        }

        case 'equipment':
        case 'equipments': {
            return getHasedUrl('equipments', id, file);
        }

        case 'entity':
        case 'entities': {
            return getHasedUrl('entities', id, file);
        }

        case 'enemy':
        case 'enemies': {
            return `enemies/${id}/${file}.${ext}${revision}`;
        }

        default: {
        }
    }
};

export default (type, id, file, revision) => {
    // if (__SERVER__) return ''
    return getUri(type, id, file, revision);

    // const filepath = getUri(type, id, file, revision);

    // // if (__ELECTRON__)
    // //     return require('electron').remote.getGlobal('__path_pics') + filepath

    // if (__SPA__) return '../../pics/' + filepath;

    // return publicPath + 'pics/' + filepath;
};
