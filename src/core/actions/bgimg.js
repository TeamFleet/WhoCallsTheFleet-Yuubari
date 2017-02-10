import * as types from '../actions/types.js';

// export const INIT_BGIMG = 'INIT_BGIMG'
// export const ADD_BGIMG = 'ADD_BGIMG'
// export const REMOVE_BGIMG = 'REMOVE_BGIMG'
// export const CHANGE_BGIMG = 'CHANGE_BGIMG'

// INIT_BGIMG(list, currentIndex)
// ADD_BGIMG(filename)
// REMOVE_BGIMG(indexCustom)
// CHANGE_BGIMG(currentIndex)

export function initBgimg(state) {
    return {
        type: types.INIT_BGIMG,
        state
    };
}