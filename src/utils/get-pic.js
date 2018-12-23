import getPublicPath from 'koot/utils/get-public-dir'

import db from '@database'

const publicPath = __DEV__ ? '/' : getPublicPath()
const ext = __CLIENT__ && self._html && self._html.classList.contains('webp') ? '.webp' : '.png'

const getUri = (type, id, file, revision) => {

    const sampleShip = db.ships[1]
    const sampleEntity = db.entities[1]

    if (typeof type === 'object') {
        if (type.constructor === sampleShip.constructor)
            return getUri('ship', type.id, id)
        if (type.constructor === sampleEntity.constructor)
            return getUri('entity', type.id, id)
    }

    // console.log('\n\n')
    // console.log({ type, Ship })
    // console.log({ 'type instanceof Ship': type instanceof Ship })
    // console.log({ id, file })
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
        case 'ships': {
            const ship = db.ships[id]
            return 'ships/' + ship.getPic(file, ext) + (ship.illust_version ? `?version=${ship.illust_version}` : '')
        }

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
    // if (__SERVER__) return ''

    const filepath = getUri(type, id, file)

    // if (__ELECTRON__)
    //     return require('electron').remote.getGlobal('__path_pics') + filepath

    if (__SPA__) return '../../pics/' + filepath

    return publicPath + 'pics/' + filepath
}
