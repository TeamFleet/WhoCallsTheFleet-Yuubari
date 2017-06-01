const ext = __CLIENT__ && self._html && self._html.classList.contains('webp') ? 'webp' : 'png'

export default (type, id, filename) => {
    return `${__DEV__ ? `https://yuubari.fleet.moe/client` : `${__PUBLIC__}`}/_pics/${type}/${id}/${filename}.${ext}`
}