import {
    INFOSPAGE_INIT,
    INFOSPAGE_RESET,
    INFOSPAGE_UPDATE
} from '../../redux/action-types'

import { TABINDEX } from './reducer'

export const init = (id, initialState) => ({
    type: INFOSPAGE_INIT,
    id,
    initialState
})

export const reset = (id, initialState) => ({
    type: INFOSPAGE_RESET,
    id,
    initialState
})

export const update = (id, state) => ({
    type: INFOSPAGE_UPDATE,
    id,
    state
})

export const changeTab = (id, tabIndex) => update(id, {
    [TABINDEX]: tabIndex
})