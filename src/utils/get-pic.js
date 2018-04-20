import db from '@appLogic/database'

import Ship from 'kckit/src/class/ship.js'
import Entity from 'kckit/src/class/entity.js'

const ext = __CLIENT__ && self._html && self._html.classList.contains('webp') ? '.webp' : '.png'

const getUri = (type, id, file, revision) => {
    if (typeof type === 'object') {
        if (type instanceof Ship)
            return getUri('ship', type.id, id)
        if (type instanceof Entity)
            return getUri('entity', type.id, id)
    }

    if (typeof id !== 'undefined' && typeof file === 'undefined') {
        const arr = id.split('/')
        if (arr.length > 1)
            return getUri(type, arr[0], arr[1].split('.')[0])
        return ''
    }

    if (revision)
        revision = "?" + revision
    else
        revision = ''

    switch (type) {
        case 'ship':
        case 'ships':
            return 'ships/' + db.ships[id].getPic(file, ext)

        case 'ship-extra':
        case 'ships-extra':
            return `ships-extra/${id}/${file}${ext}${revision}`

        case 'equipment':
        case 'equipments':
            return `equipments/${id}/${file}${ext}${revision}`

        case 'entity':
        case 'entities': {
            let _ext = ext
            if (file == 2) _ext = '.jpg'
            return `entities/${id}/${file}${_ext}${revision}`
        }

        case 'enemy':
        case 'enemies': {
            return `enemies/${id}/${file}${ext}${revision}`
        }
    }
}

export default (type, id, file) => {
    if (__SERVER__) return ''

    const filepath = getUri(type, id, file)

    // if (__ELECTRON__)
    //     return require('electron').remote.getGlobal('__path_pics') + filepath

    if (__SPA__)
        return '../../pics/' + filepath

    const base = __DEV__
        ? '/'
        : require('@appConstants/root')

    return base + 'pics/' + filepath
}