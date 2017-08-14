import {
    EQUIPMENTDETAILS_INIT,
    EQUIPMENTDETAILS_RESET,

    EQUIPMENTDETAILS_CHANGE_TAB,
    EQUIPMENTDETAILS_CHANGE_ILLUSTRATION
} from '../../redux/action-types.js'

export const init = (id, initialState) => ({
    type: EQUIPMENTDETAILS_INIT,
    id,
    initialState
})

export const reset = (id, initialState) => ({
    type: EQUIPMENTDETAILS_RESET,
    id,
    initialState
})

export const changeTab = (id, tabIndex) => ({
    type: EQUIPMENTDETAILS_CHANGE_TAB,
    id,
    tabIndex
})

export const changeIllust = (id, illustIndex) => ({
    type: EQUIPMENTDETAILS_CHANGE_ILLUSTRATION,
    id,
    illustIndex
})