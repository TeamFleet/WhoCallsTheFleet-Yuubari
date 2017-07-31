import {
    SHIPDETAILS_INIT,
    SHIPDETAILS_RESET,

    SHIPDETAILS_CHANGE_TAB,
    SHIPDETAILS_CHANGE_ILLUSTRATION
} from '../../redux/action-types.js'

const initialState = {}
const initialStateSingle = {
    tabIndex: 0,
    illustIndex: 0
}

const updateState = (fullState, id, state) =>
    Object.assign({}, fullState, {
        [id]: Object.assign({}, fullState[id] || initialStateSingle, state)
    })

export default function (state = initialState, action) {

    switch (action.type) {

        case SHIPDETAILS_INIT:
            return Object.assign({}, state, {
                [action.id]: Object.assign(
                    {},
                    initialStateSingle,
                    action.initialState,
                    action.initialState ? {
                        initialState: Object.assign({}, action.initialState)
                    } : {}
                )
            })

        case SHIPDETAILS_RESET:
            if (state[action.id])
                return updateState(
                    state,
                    action.id,
                    initialStateSingle,
                    // action.initialState || state[action.id].initialState
                )
            return state

        case SHIPDETAILS_CHANGE_TAB:
            return updateState(state, action.id, {
                tabIndex: action.tabIndex
            })

        case SHIPDETAILS_CHANGE_ILLUSTRATION:
            return updateState(state, action.id, {
                illustIndex: action.illustIndex
            })

    }

    return state;

}