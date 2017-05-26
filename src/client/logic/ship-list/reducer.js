import {
    SHIPLIST_INIT,

    SHIPLIST_CHANGE_COLLECTION,

    SHIPLIST_FILTER_ENTER,
    SHIPLIST_FILTER_LEAVE,
    SHIPLIST_FILTER_INPUT,

    SHIPLIST_COMPARE_ENTER,
    SHIPLIST_COMPARE_LEAVE,
    SHIPLIST_COMPARE_RESET,
    SHIPLIST_COMPARE_CHANGE_STATE,
    SHIPLIST_COMPARE_UPDATE_LIST,
    SHIPLIST_COMPARE_ADD,
    SHIPLIST_COMPARE_REMOVE
} from '../../redux/action-types.js'

const initialState = {}
const initialStateSingle = {
    collection: 0,

    isModeFilter: false,
    filterInput: undefined,

    isModeCompare: undefined,
    compareState: 'selecting', // selecting || comparing
    compareList: []
}

const updateState = (fullState, id, state) =>
    Object.assign({}, fullState, {
        [id]: Object.assign({}, fullState[id] || initialStateSingle, state)
    })

export default function (state = initialState, action) {

    switch (action.type) {

        case SHIPLIST_INIT:
            return Object.assign({}, state, {
                [action.id]: Object.assign({}, initialStateSingle, action.initialState)
            })

        case SHIPLIST_CHANGE_COLLECTION:
            return updateState(state, action.id, {
                collection: action.collection
            })

        case SHIPLIST_FILTER_ENTER:
            return updateState(state, action.id, {
                isModeFilter: true
            })

        case SHIPLIST_FILTER_LEAVE:
            return updateState(state, action.id, {
                isModeFilter: false,
                filterInput: undefined
            })

        case SHIPLIST_FILTER_INPUT:
            return updateState(state, action.id, {
                filterInput: action.input
            })

        case SHIPLIST_COMPARE_ENTER:
            return updateState(state, action.id, {
                isModeCompare: true
            })

        case SHIPLIST_COMPARE_LEAVE:
            return updateState(state, action.id, {
                isModeCompare: false
            })

        case SHIPLIST_COMPARE_RESET:
            return updateState(state, action.id, {
                isModeCompare: undefined,
                compareState: 'selecting',
                compareList: []
            })

        case SHIPLIST_COMPARE_CHANGE_STATE:
            return updateState(state, action.id, {
                compareState: action.state
            })

        case SHIPLIST_COMPARE_UPDATE_LIST:
            return updateState(state, action.id, {
                compareList: action.list
            })

        case SHIPLIST_COMPARE_ADD: {
            const list = state[action.id].compareList
            const index = list.indexOf(action.item)
            if (index < 0) {
                return updateState(state, action.id, {
                    compareList: list.concat(action.item)
                })
            }
        }

        case SHIPLIST_COMPARE_REMOVE: {
            const list = state[action.id].compareList
            const index = list.indexOf(action.item)
            if (index > -1) {
                let newList = [...list]
                newList.splice(index, 1)
                return updateState(state, action.id, {
                    compareList: newList
                })
            }
        }

    }

    return state;

}