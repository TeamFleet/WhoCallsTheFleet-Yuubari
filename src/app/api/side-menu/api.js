import * as actions from './actions.js'

export const swipedFromLeftEdge = (ts = (new Date()).valueOf()) => (dispatch) => {
    dispatch(
        actions.swipedFromLeftEdge(ts)
    )
}