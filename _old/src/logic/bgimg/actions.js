import * as types from '../../core/actions.js';

// export const INIT_BGIMG = 'INIT_BGIMG'
// export const ADD_BGIMG = 'ADD_BGIMG'
// export const REMOVE_BGIMG = 'REMOVE_BGIMG'
// export const CHANGE_BGIMG = 'CHANGE_BGIMG'

// INIT_BGIMG(list, currentIndex)
// ADD_BGIMG(filename)
// REMOVE_BGIMG(indexCustom)
// CHANGE_BGIMG(currentIndex)

export function init(newState) {
    return {
        type: types.INIT_BGIMG,
        state: newState
    }
}

export function add(state) {
    return {
        type: types.ADD_BGIMG,
        state
    }
}

export function remove(state) {
    return {
        type: types.REMOVE_BGIMG,
        state
    }
}

export function change(dataCurrent) {
    return {
        type: types.CHANGE_BGIMG,
        current: dataCurrent
    }
}

export function initImgLoaded() {
    return {
        type: types.INIT_BGIMG_LOADED
    }
}