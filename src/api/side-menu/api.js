import * as actions from './actions.js'

export const swipedFromLeftEdge = (ts = Date.now()) => (dispatch) => {
    dispatch(
        actions.swipedFromLeftEdge(ts)
    )
}
