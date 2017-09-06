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
        case 'entities':
            return `entities/${id}/${file}${ext}${revision}`

        case 'enemy':
        case 'enemies':
            return `enemies/${id}/${file}${ext}${revision}`
    }
}

export default (type, id, file) => {
    if (__SERVER__) return ''

    // ? 'https://yuubari.fleet.moe/client'
    const base = __SPA__ ? '' : (
        __DEV__
            ? '/app'
            : __PUBLIC__
    )

    const folder = __SPA__ ? '../pics/' : '/_pics/'

    return base + folder + getUri(type, id, file)
}