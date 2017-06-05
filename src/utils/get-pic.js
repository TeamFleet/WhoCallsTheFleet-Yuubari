import db from 'Logic/database'

const ext = __CLIENT__ && self._html && self._html.classList.contains('webp') ? '.webp' : '.png'

export default (type, id, file) => {
    if (__SERVER__) return ''

    let getUri = () => {
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

    return __CLIENT__
        ? `${__DEV__ ? `https://yuubari.fleet.moe/client` : `${__PUBLIC__}`}/_pics/${getUri()}`
        : ''
}