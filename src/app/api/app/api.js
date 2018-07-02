import * as actions from './actions.js'

export const updateAppReady = ready => dispatch => dispatch(
    actions.updateAppReady(ready)
)

export const updateMainKey = key => dispatch => dispatch(
    actions.updateMainKey(key)
)