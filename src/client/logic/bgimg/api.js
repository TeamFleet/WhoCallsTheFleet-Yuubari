import * as actions from './actions.js'

export class BgimgObject {
    constructor(data) {
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

            if (segs.length > 1){
                this.filenameOriginal = filename
                data.filename = segs[0]
                data.origin = segs[1].split(',').join('% ') + '%'
            }

            if (filename.indexOf('-') > -1)
                data.author = filename.split('-')[0]
        }

        this.filename = data.filename || ''
        this.origin = data.origin || '50% 38.2%'
        if (this.author) this.author = data.author
    }

    getPath(type = "") {
        if (typeof type !== 'string') type = ''
        const prop = '_path' + type
        if (!this[prop]) {
            this[prop] = __PUBLIC__ + `/bgimgs/${type ? (type + '/') : ''}${type ? this.filename : (this.filenameOriginal || this.filename)}.jpg`
        }
        return this[prop]
    }

    active() {

    }

    remove() {

    }
}

const getObj = (indexString) => {
    /*
    const [type, index] = indexString.split('-')

    if (typeof index === 'undefined') return {}

    return store.getState().bgimgState.list[type][index]
    */
}

const getListInitial = (type) => {
    let list = []

    if (__CLIENT__ && type === 'default' && Array.isArray(self.__BGIMG_LIST__))
        list = self.__BGIMG_LIST__.map(filename => new BgimgObject(filename))

    /*
    const dir = type == 'custom' ? thePath.bgimgs_custom : thePath.bgimgs

    const parseData = (name) => {
        return {
            name: name
        }
    }

    if (self.nw) {
        const fs = require('fs')
        const path = require('path')
        const getList = (dir) => {
            return fs.readdirSync(dir)
                .filter(function (file) {
                    return !fs.lstatSync(path.join(dir, file)).isDirectory()
                })
                .map(function (filename) {
                    return {
                        name: filename,
                        time: fs.statSync(path.join(dir, filename)).mtime.getTime()
                    };
                })
                .sort(function (a, b) { return b.time - a.time; })
                .map(function (o) { return o.name; })
        }

        getList(dir)
            .forEach(function (name) {
                list.push(parseData(
                    name,
                    type === 'default'
                ))
            })
    } else {

    }
    */

    return list
}





export const initList = (currentIndex = 'default-0') => {
    const listDefault = getListInitial('default')
    const listCustom = getListInitial('custom')

    const [type, index] = currentIndex.split('-')
    const current = eval('list' + type.substr(0, 1).toUpperCase() + type.substr(1))[index]
    const currentPath = current ? {
        original: current.getPath(),
        blured: current.getPath('blured')
    } : {}

    return (dispatch) => {
        dispatch(
            actions.init({
                list: {
                    default: listDefault,
                    custom: listCustom
                },
                current,
                currentIndex,
                currentPath
            })
        )
    }
}

export const add = (filename) => {

}

export const remove = (indexCustom) => {

}

export const change = (currentIndex) => {
    /*
    const currentObj = getObj(currentIndex)

    store.dispatch(
        actions.change({
            index: currentIndex,
            original: getPath(currentObj),
            blured: getPath(currentObj, 'blured')
        })
    )
    */
}

export const mainImgLoaded = () => (dispatch) => dispatch(
    actions.mainLoaded()
)