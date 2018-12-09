import {
    RESET_UIMODE,
    ENTER_UIMODE,
    LEAVE_UIMODE,
    UIMODE_ANIMATION_END
} from '@redux/action-types.js'

const initialState = {
    // mode: '',
    // animation: false
    // leaving: false,
    // scrollY: 0,
    // ...other
}

export default function (state = initialState, action) {

    let newState

    switch (action.type) {

        case RESET_UIMODE:
            if (__CLIENT__ && typeof state.scrollY !== 'undefined') {
                setTimeout(() => {
                    window.scrollTo(undefined, state.scrollY)
                }, 0)
            }
            return {}

        case ENTER_UIMODE: {
            if (state.animation) return state
            return Object.assign(action.state, {
                animation: true
            })
        }

        case LEAVE_UIMODE:
            if (state.animation) return state
            return Object.assign({}, state, {
                animation: true,
                leaving: true
            })

        case UIMODE_ANIMATION_END:
            if (!state.animation) return state
            newState = { ...state }
            delete newState.animation
            return newState

    }

    return state;

}
