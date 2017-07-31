import * as actions from './actions.js'

export const init = (id, initialState) => (dispatch) => {
    dispatch(
        actions.init(id, initialState)
    )
}

export const reset = (id, initialState) => (dispatch) => {
    dispatch(
        actions.reset(id, initialState)
    )
}

export const changeTab = (id, tabIndex) => (dispatch) => {
    dispatch(
        actions.changeTab(id, tabIndex)
    )
}

export const changeIllust = (id, illustIndex) => (dispatch) => {
    dispatch(
        actions.changeIllust(id, illustIndex)
    )
}