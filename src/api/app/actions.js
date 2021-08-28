import {
    APP_READY_UPDATE,
    MAIN_KEY_UPDATE,
    SET_APP_TYPE,
} from '@redux/action-types';

export const updateAppReady = (ready) => ({
    type: APP_READY_UPDATE,
    ready,
});

export const updateMainKey = (key) => ({
    type: MAIN_KEY_UPDATE,
    key,
});

export const setAppType = (appType) => ({
    type: SET_APP_TYPE,
    appType,
});
