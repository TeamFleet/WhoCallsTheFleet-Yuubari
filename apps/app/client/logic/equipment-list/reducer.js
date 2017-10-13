import {
    EQUIPMENTLIST_INIT,
    EQUIPMENTLIST_RESET,

    EQUIPMENTLIST_CHANGE_COLLECTION,
    EQUIPMENTLIST_HIGHLIGHT_COLUMN,

    EQUIPMENTLIST_SCROLL,
    EQUIPMENTLIST_OBSERVER
} from '../../redux/action-types.js'

const initialState = {}
const initialStateSingle = {
    collection: 0,
    // highlightingIndex: undefined,
    // highlightingStat: undefined,
    // observer: undefined,
}

const updateState = (fullState, id, state) =>
    Object.assign({}, fullState, {
        [id]: Object.assign({}, fullState[id] || initialStateSingle, state)
    })

export default function (state = initialState, action) {

    switch (action.type) {

        case EQUIPMENTLIST_INIT:
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

        case EQUIPMENTLIST_RESET:
            if (state[action.id])
                return updateState(
                    state,
                    action.id,
                    action.initialState || state[action.id].initialState || initialStateSingle
                )
            return state

        case EQUIPMENTLIST_CHANGE_COLLECTION:
            return updateState(state, action.id, {
                collection: action.collection
            })

        case EQUIPMENTLIST_HIGHLIGHT_COLUMN: {
            return updateState(state, action.id, {
                highlightingIndex: action.index,
                highlightingStat: action.stat
            })
        }

        case EQUIPMENTLIST_SCROLL: {
            return updateState(state, action.id, {
                compareScrollLeft: action.scrollLeft
            })
        }

        case EQUIPMENTLIST_OBSERVER: {
            return updateState(state, action.id, {
                observer: action.observer
            })
        }

    }

    return state;

}