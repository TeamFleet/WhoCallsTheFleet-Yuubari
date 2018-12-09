import {
    EQUIPMENTLIST_INIT,
    EQUIPMENTLIST_RESET,

    EQUIPMENTLIST_CHANGE_COLLECTION,
    EQUIPMENTLIST_HIGHLIGHT_COLUMN,

    EQUIPMENTLIST_SCROLL,
    EQUIPMENTLIST_OBSERVER
} from '@redux/action-types.js'

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

export const highlightColumn = (id, index, stat) => ({
    type: EQUIPMENTLIST_HIGHLIGHT_COLUMN,
    id,
    index, stat
})

export const scroll = (id, scrollLeft) => ({
    type: EQUIPMENTLIST_SCROLL,
    id,
    scrollLeft
})

export const observer = (id, observer) => ({
    type: EQUIPMENTLIST_OBSERVER,
    id,
    observer
})
