import * as actions from './actions.js'

export const init = (id, initialState = {}) => (dispatch) => {
    dispatch(
        actions.init(id, initialState)
    )
}

export const changeCollection = (id, collection) => (dispatch) => {
    dispatch(
        actions.changeCollection(id, collection)
    )
}

export const filterEnter = (id) => (dispatch) => {
    dispatch(
        actions.filterEnter(id)
    )
}

export const filterLeave = (id) => (dispatch) => {
    dispatch(
        actions.filterLeave(id)
    )
}

export const filterInput = (id, input) => (dispatch) => {
    dispatch(
        actions.filterInput(id, input)
    )
}

export const compareEnter = (id) => (dispatch) => {
    dispatch(
        actions.compareEnter(id)
    )
}

export const compareLeave = (id, remove = false) => (dispatch) => {
    dispatch(
        actions.compareLeave(id, remove)
    )
}

export const compareReset = (id, remove = false) => (dispatch) => {
    dispatch(
        actions.compareReset(id, remove)
    )
}

export const compareChangeState = (id, state) => (dispatch) => {
    dispatch(
        actions.compareChangeState(id, state)
    )
}

export const compareUpdateList = (id, list) => (dispatch) => {
    dispatch(
        actions.compareUpdateList(id, list)
    )
}

export const compareAdd = (id, item) => (dispatch) => {
    dispatch(
        actions.compareAdd(id, item)
    )
}

export const compareRemove = (id, item) => (dispatch) => {
    dispatch(
        actions.compareRemove(id, item)
    )
}

export const compareSort = (sorttype, order) => (dispatch) => {
    dispatch(
        actions.compareSort(sorttype, order)
    )
}