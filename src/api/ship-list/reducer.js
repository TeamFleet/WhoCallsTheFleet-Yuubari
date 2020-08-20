import {
    SHIPLIST_INIT,
    SHIPLIST_RESET,
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
    SHIPLIST_COMPARE_REMOVE,
    SHIPLIST_COMPARE_SORT,
    SHIPLIST_COMPARE_SCROLL,
} from '@redux/action-types';

const initialState = {};
const initialStateSingle = {
    collection: 0,

    isModeFilter: false,
    filterInput: undefined,

    isModeCompare: undefined,
    compareState: 'selecting', // selecting || comparing
    compareList: [],
    compareSort: ['fire', 'desc'],
    compareScrollLeft: 0,
};

const updateState = (fullState, id, state) =>
    Object.assign({}, fullState, {
        [id]: Object.assign({}, fullState[id] || initialStateSingle, state),
    });

export default function (state = initialState, action) {
    switch (action.type) {
        case SHIPLIST_INIT:
            return Object.assign({}, state, {
                [action.id]: Object.assign(
                    {},
                    initialStateSingle,
                    action.initialState,
                    action.initialState
                        ? {
                              initialState: Object.assign(
                                  {},
                                  action.initialState
                              ),
                          }
                        : {}
                ),
            });

        case SHIPLIST_RESET:
            if (state[action.id])
                return updateState(
                    state,
                    action.id,
                    action.initialState ||
                        state[action.id].initialState ||
                        initialStateSingle
                );
            return state;

        case SHIPLIST_CHANGE_COLLECTION:
            return updateState(state, action.id, {
                collection: action.collection,
            });

        case SHIPLIST_FILTER_ENTER:
            return updateState(state, action.id, {
                isModeFilter: true,
            });

        case SHIPLIST_FILTER_LEAVE:
            return updateState(state, action.id, {
                isModeFilter: false,
                filterInput: undefined,
            });

        case SHIPLIST_FILTER_INPUT:
            return updateState(state, action.id, {
                filterInput: action.input,
            });

        case SHIPLIST_COMPARE_ENTER:
            return updateState(state, action.id, {
                isModeCompare: true,
            });

        case SHIPLIST_COMPARE_LEAVE:
            return updateState(state, action.id, {
                isModeCompare: action.remove ? undefined : false,
            });

        case SHIPLIST_COMPARE_RESET:
            return updateState(state, action.id, {
                isModeCompare: action.remove ? undefined : false,
                compareState: initialStateSingle.compareState,
                compareList: [],
                compareSort: [...initialStateSingle.compareSort],
            });

        case SHIPLIST_COMPARE_CHANGE_STATE:
            return updateState(state, action.id, {
                compareState: action.state,
            });

        case SHIPLIST_COMPARE_UPDATE_LIST:
            return updateState(state, action.id, {
                compareList: action.list,
            });

        case SHIPLIST_COMPARE_ADD: {
            const list = state[action.id].compareList;
            if (Array.isArray(action.item)) {
                const shipsToAdd = action.item
                    .filter((ship) => !list.includes(ship.id))
                    .map((ship) => ship.id);
                if (shipsToAdd.length) {
                    return updateState(state, action.id, {
                        compareList: list.concat(shipsToAdd),
                    });
                }
            } else {
                if (!list.includes(action.item.id)) {
                    return updateState(state, action.id, {
                        compareList: list.concat(action.item.id),
                    });
                }
            }
            break;
        }

        case SHIPLIST_COMPARE_REMOVE: {
            const list = state[action.id].compareList;
            if (Array.isArray(action.item)) {
                const newList = [...list];
                action.item.forEach((ship) => {
                    newList.splice(newList.indexOf(ship.id), 1);
                });
                return updateState(state, action.id, {
                    compareList: newList,
                });
            } else {
                const index = list.indexOf(action.item.id);
                if (index > -1) {
                    const newList = [...list];
                    newList.splice(index, 1);
                    return updateState(state, action.id, {
                        compareList: newList,
                    });
                }
            }
            break;
        }

        case SHIPLIST_COMPARE_SORT: {
            if (!action.sorttype)
                return updateState(state, action.id, {
                    compareSort: [...initialStateSingle.compareSort],
                });
            else if (
                !action.order &&
                state[action.id].compareSort[0] === action.sorttype
            )
                return updateState(state, action.id, {
                    compareSort: [
                        action.sorttype,
                        state[action.id].compareSort[1] === 'desc'
                            ? 'asc'
                            : 'desc',
                    ],
                });
            else
                return updateState(state, action.id, {
                    compareSort: [
                        action.sorttype,
                        action.order || initialStateSingle.compareSort[1],
                    ],
                });
        }

        case SHIPLIST_COMPARE_SCROLL: {
            return updateState(state, action.id, {
                compareScrollLeft: action.scrollLeft,
            });
        }

        default: {
        }
    }

    return state;
}
