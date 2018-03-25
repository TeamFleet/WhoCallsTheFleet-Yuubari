import {
    PAGE_INIT,
    PAGE_RESET,
    PAGE_UPDATE
} from '../../redux/action-types'

import { TABINDEX } from './reducer'

export const init = (id, initialState) => ({
    type: PAGE_INIT,
    id,
    initialState
})

export const reset = (id, initialState) => ({
    type: PAGE_RESET,
    id,
    initialState
})

export const update = (id, state) => ({
    type: PAGE_UPDATE,
    id,
    state
})

export const changeTab = (id, tabIndex) => update(id, {
    [TABINDEX]: tabIndex
})