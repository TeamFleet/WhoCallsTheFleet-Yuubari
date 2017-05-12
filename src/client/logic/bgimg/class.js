export default class Background {
    constructor(data, index) {
        if (typeof data === 'string') {
            // 提供文件名
            // 島田フミカネ-1.jpg
            // しずまよしのり-5.50,38.jpg
            let filename = data.split('.')
            filename.pop()
            filename = filename.join('.')
            const segs = filename.split('.')

            data = {
                filename: filename
            }

            if (segs.length > 1) {
                this.filenameOriginal = filename
                data.filename = segs[0]
                data.position = segs[1].split(',').join('% ') + '%'
            }

            if (filename.indexOf('-') > -1)
                data.author = filename.split('-')[0]
        }

        Object.assign(this, {
            filename: '',
            position: '50% 38.2%'
        }, data)

        if (index) this.index = index
    }

    get ext() {
        if (__SERVER__) return '.jpg'
        if (typeof this._ext === 'undefined') {
            if (self._html && self._html.classList.contains('webp')) this._ext = '.webp'
            else this._ext = '.jpg'
        }
        return this._ext
    }

    getPath(type = "") {
        if (typeof type !== 'string') type = ''
        const prop = '_path' + type
        if (!this[prop]) {
            this[prop] = __PUBLIC__ + `/_bgimgs/${type ? (type + '/') : ''}${type ? this.filename : (this.filenameOriginal || this.filename)}${type === 'thumbnail' ? '.jpg' : this.ext}`
        }
        return this[prop]
    }

    active() {

    }

    remove() {

    }
}