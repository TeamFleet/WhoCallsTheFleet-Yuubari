import {
    EQUIPMENTLIST_INIT,
    EQUIPMENTLIST_RESET,

    EQUIPMENTLIST_CHANGE_COLLECTION,

    EQUIPMENTLIST_SCROLL
} from '../../redux/action-types.js'

export const init = (id, initialState) => ({
    type: EQUIPMENTLIST_INIT,
    id,
    initialState
})

export const reset = (id, initialState) => ({
    type: EQUIPMENTLIST_RESET,
    id,
    initialState
})

export const changeCollection = (id, collection) => ({
    type: EQUIPMENTLIST_CHANGE_COLLECTION,
    id,
    collection
})

export const scroll = (id, scrollLeft) => ({
    type: EQUIPMENTLIST_SCROLL,
    id,
    scrollLeft
})