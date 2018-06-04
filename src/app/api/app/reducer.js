import {
    APP_READY_UPDATE,
    MAIN_KEY_UPDATE,
} from '@redux/action-types.js'

const initialState = {
    // ready: false,
    // mainKey: undefined,
}

export default function (state = initialState, action) {

    switch (action.type) {

        case APP_READY_UPDATE: {
            return Object.assign({}, state, {
                ready: action.ready
            })
        }

        case MAIN_KEY_UPDATE: {
            return Object.assign({}, state, {
                mainKey: action.key
            })
        }

    }

    return state;

}
