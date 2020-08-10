import backgroundImages from '@const/background-images';

import * as actions from './actions.js';
import Background from './class.js';

// const getObj = (indexString) => {
/*
const [type, index] = indexString.split('-')

if (typeof index === 'undefined') return {}

return store.getState().bgimgState.list[type][index]
*/
// }

const getListInitial = (type) => {
    let list = [];

    if (type === 'default') {
        list = backgroundImages.map(
            (filename, index) => new Background(filename, type + '-' + index)
        );
    }

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

    return list;
};

export const initList = (currentIndex = 'default-0') => {
    const listDefault = getListInitial('default');
    const listCustom = getListInitial('custom');

    const [type, index] = currentIndex.split('-');
    const current = eval(
        'list' + type.substr(0, 1).toUpperCase() + type.substr(1)
    )[index];
    // const currentPath = current ? {
    //     original: current.getPath(),
    //     blured: current.getPath('blured')
    // } : {}

    return (dispatch) => {
        dispatch(
            actions.init({
                list: {
                    default: listDefault,
                    custom: listCustom,
                },
                current, //,
                // currentIndex,
                // currentPath
            })
        );
    };
};

export const add = (/*filename*/) => {};

export const remove = (/*indexCustom*/) => {};

export const change = (obj) => {
    return (dispatch) => {
        dispatch(actions.change(obj));
    };
};

export const mainImgLoaded = () => (dispatch) => dispatch(actions.mainLoaded());
