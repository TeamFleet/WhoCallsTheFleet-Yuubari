import {
    INIT_BGIMG,
    ADD_BGIMG,
    REMOVE_BGIMG,
    CHANGE_BGIMG,
    LOADED_MAIN_BGIMG
} from '../../redux/action-types.js';

export function init(newState) {
    return {
        type: INIT_BGIMG,
        state: newState
    }
}

export function add(state) {
    return {
        type: ADD_BGIMG,
        state
    }
}

export function remove(state) {
    return {
        type: REMOVE_BGIMG,
        state
    }
}

export function change(changeToObj) {
    return {
        type: CHANGE_BGIMG,
        changeToObj
    }
}

export function mainLoaded() {
    return {
        type: LOADED_MAIN_BGIMG
    }
}