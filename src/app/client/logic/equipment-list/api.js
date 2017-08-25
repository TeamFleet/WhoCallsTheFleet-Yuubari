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

export const changeCollection = (id, collection) => (dispatch) => {
    dispatch(
        actions.changeCollection(id, collection)
    )
}

export const highlightColumn = (id, column) => (dispatch) => {
    dispatch(
        actions.highlightColumn(id, column)
    )
}

export const scroll = (id, scrollLeft) => (dispatch) => {
    dispatch(
        actions.scroll(id, scrollLeft)
    )
}