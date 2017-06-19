import db from 'Logic/database'
import Ship from 'kckit/src/class/ship.js'

const ext = __CLIENT__ && self._html && self._html.classList.contains('webp') ? '.webp' : '.png'

const getUri = (type, id, file) => {
    if (typeof type === 'object') {
        if (type instanceof Ship)
            return getUri('ship', type.id, id)
    }

    if (typeof id !== 'undefined' && typeof file === 'undefined') {
        const arr = id.split('/')
        if (arr.length > 1)
            return getUri(type, arr[0], arr[1].split('.')[0])
        return ''
    }

    switch (type) {
        case 'ship':
        case 'ships':
            return 'ships/' + db.ships[id].getPic(file, ext)

        case 'ship-extra':
        case 'ships-extra':
            return `ships-extra/${id}/${file}${ext}`

        case 'equipment':
        case 'equipments':
            return `equipments/${id}/${file}${ext}`

        case 'entity':
        case 'entities':
            return `entities/${id}/${file}${ext}`

        case 'enemy':
        case 'enemies':
            return `enemies/${id}/${file}${ext}`
    }
}

export default (type, id, file) => {
    if (__SERVER__) return ''

    return (__DEV__
        // ? 'https://yuubari.fleet.moe/client'
        ? '/client'
        : __PUBLIC__
    ) + '/_pics/' + getUri(type, id, file)
}