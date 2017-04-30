import * as actions from './actions.js'

export const reset = () => (dispatch) => {
    dispatch(
        actions.reset()
    )
}

export const enter = (...args) => (dispatch) => {
    dispatch(
        actions.enter(...args)
    )
}

export const leave = () => (dispatch) => {
    dispatch(
        actions.leave()
    )
}

export const animationEnd = () => (dispatch) => {
    dispatch(
        actions.animationEnd()
    )
}





export const enterBackground = () => (dispatch) => {
    dispatch(
        actions.enter('background')
    )
}