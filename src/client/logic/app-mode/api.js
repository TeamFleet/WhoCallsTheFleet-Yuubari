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





export const enterBackground = (scrollY = __CLIENT__ ? window.scrollY : 0) => (dispatch) => 
    dispatch(
        actions.enter('background', scrollY)
    )
