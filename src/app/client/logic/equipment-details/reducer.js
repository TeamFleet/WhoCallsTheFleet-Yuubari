import {
    EQUIPMENTDETAILS_INIT,
    EQUIPMENTDETAILS_RESET,

    EQUIPMENTDETAILS_CHANGE_TAB,
    EQUIPMENTDETAILS_CHANGE_ILLUSTRATION
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

        case EQUIPMENTDETAILS_INIT:
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

        case EQUIPMENTDETAILS_RESET:
            if (state[action.id])
                return updateState(
                    state,
                    action.id,
                    initialStateSingle,
                    // action.initialState || state[action.id].initialState
                )
            return state

        case EQUIPMENTDETAILS_CHANGE_TAB:
            return updateState(state, action.id, {
                tabIndex: action.tabIndex
            })

        case EQUIPMENTDETAILS_CHANGE_ILLUSTRATION:
            return updateState(state, action.id, {
                illustIndex: action.illustIndex
            })

    }

    return state;

}