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
    // ...other
}

export default function (state = initialState, action) {

    switch (action.type) {

        case RESET_APPMODE:
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
            return Object.assign(state, {
                animation: false
            })

    }

    return state;

}