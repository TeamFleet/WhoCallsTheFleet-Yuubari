import * as actions from './actions.js'

export const update = (title) => (dispatch) => {
    dispatch(
        actions.update(title)
    )
}