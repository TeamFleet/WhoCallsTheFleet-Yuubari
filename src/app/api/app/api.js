import {
    SET_INSTALL_PWA_EVENT,
} from '@redux/action-types.js'

import * as actions from './actions.js'

export const updateAppReady = ready => dispatch => dispatch(
    actions.updateAppReady(ready)
)

export const updateMainKey = key => dispatch => dispatch(
    actions.updateMainKey(key)
)

export const setInstallPWAEvent = (evtInstall) => dispatch => dispatch({
    type: SET_INSTALL_PWA_EVENT,
    event: evtInstall
})
