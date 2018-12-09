import * as actions from './actions'
import { TABINDEX } from './reducer'

export { TABINDEX }

export const init = (id, initialState) =>
    dispatch =>
        dispatch(
            actions.init(id, initialState)
        )

export const reset = (id, initialState) =>
    dispatch =>
        dispatch(
            actions.reset(id, initialState)
        )

export const update = (id, state) =>
    dispatch =>
        dispatch(
            actions.update(id, state)
        )

export const changeTab = (id, tabIndex) =>
    dispatch =>
        dispatch(
            actions.changeTab(id, tabIndex)
        )