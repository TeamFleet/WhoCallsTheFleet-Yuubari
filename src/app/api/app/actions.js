import {
    APP_READY_UPDATE,
    MAIN_KEY_UPDATE,
} from '@redux/action-types.js'

export const updateAppReady = ready => ({
    type: APP_READY_UPDATE,
    ready
})

export const updateMainKey = key => ({
    type: MAIN_KEY_UPDATE,
    key
})
