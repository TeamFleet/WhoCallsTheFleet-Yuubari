import {
    RESET_APPMODE,
    ENTER_APPMODE,
    LEAVE_APPMODE,
    APPMODE_ANIMATION_END
} from '../../redux/action-types.js'

const initialState = {
    // mode: '',
    // animation: false
    // leaving: false,
    // scrollY: 0,
    // ...other
}

export default function (state = initialState, action) {

    switch (action.type) {

        case RESET_APPMODE:
            if (__CLIENT__ && typeof state.scrollY !== 'undefined') {
                setTimeout(() => {
                    window.scrollTo(undefined, state.scrollY)
                }, 0)
            }
            return {}

        case ENTER_APPMODE:
            if (state.animation) return state
            return Object.assign(action.state, {
                animation: true
            })

        case LEAVE_APPMODE:
            if (state.animation) return state
            return Object.assign({}, state, {
                animation: true,
                leaving: true
            })

        case APPMODE_ANIMATION_END:
            if (!state.animation) return state
            let newState = { ...state }
            delete newState.animation
            return newState

    }

    return state;

}