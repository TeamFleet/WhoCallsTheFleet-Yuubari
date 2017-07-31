import {
    SHIPDETAILS_INIT,
    SHIPDETAILS_RESET,

    SHIPDETAILS_CHANGE_TAB,
    SHIPDETAILS_CHANGE_ILLUSTRATION
} from '../../redux/action-types.js'

export const init = (id, initialState) => ({
    type: SHIPDETAILS_INIT,
    id,
    initialState
})

export const reset = (id, initialState) => ({
    type: SHIPDETAILS_RESET,
    id,
    initialState
})

export const changeTab = (id, tabIndex) => ({
    type: SHIPDETAILS_CHANGE_TAB,
    id,
    tabIndex
})

export const changeIllust = (id, illustIndex) => ({
    type: SHIPDETAILS_CHANGE_ILLUSTRATION,
    id,
    illustIndex
})