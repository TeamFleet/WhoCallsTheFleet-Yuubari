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

    getPath(type = "") {
        if (typeof type !== 'string') type = ''
        const prop = '_path' + type
        if (!this[prop]) {
            this[prop] = __PUBLIC__ + `/_bgimgs/${type ? (type + '/') : ''}${type ? this.filename : (this.filenameOriginal || this.filename)}.jpg`
        }
        return this[prop]
    }

    active() {

    }

    remove() {

    }
}