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

export const init = (id, initialState) => ({
    type: SHIPLIST_INIT,
    id,
    initialState,
});

export const reset = (id, initialState) => ({
    type: SHIPLIST_RESET,
    id,
    initialState,
});

export const changeCollection = (id, collection) => ({
    type: SHIPLIST_CHANGE_COLLECTION,
    id,
    collection,
});

export const filterEnter = (id) => ({
    type: SHIPLIST_FILTER_ENTER,
    id,
});

export const filterLeave = (id) => ({
    type: SHIPLIST_FILTER_LEAVE,
    id,
});

export const filterInput = (id, input) => ({
    type: SHIPLIST_FILTER_INPUT,
    id,
    input,
});

export const compareEnter = (id) => ({
    type: SHIPLIST_COMPARE_ENTER,
    id,
});

export const compareLeave = (id, remove) => ({
    type: SHIPLIST_COMPARE_LEAVE,
    id,
    remove,
});

export const compareReset = (id, remove) => ({
    type: SHIPLIST_COMPARE_RESET,
    id,
    remove,
});

export const compareChangeState = (id, state) => ({
    type: SHIPLIST_COMPARE_CHANGE_STATE,
    id,
    state,
});

export const compareUpdateList = (id, list) => ({
    type: SHIPLIST_COMPARE_UPDATE_LIST,
    id,
    list,
});

export const compareAdd = (id, item) => ({
    type: SHIPLIST_COMPARE_ADD,
    id,
    item,
});

export const compareRemove = (id, item) => ({
    type: SHIPLIST_COMPARE_REMOVE,
    id,
    item,
});

export const compareSort = (id, sorttype, order) => ({
    type: SHIPLIST_COMPARE_SORT,
    id,
    sorttype,
    order,
});

export const compareScroll = (id, scrollLeft) => ({
    type: SHIPLIST_COMPARE_SCROLL,
    id,
    scrollLeft,
});
