import {
    APP_READY_UPDATE,
    MAIN_KEY_UPDATE,
    SET_INSTALL_PWA_EVENT,
} from '@redux/action-types';

const initialState = {
    // ready: false,
    // mainKey: undefined,
    // showInstallPWAButton: false,
    // eventInstallPWA: undefined,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case APP_READY_UPDATE: {
            return Object.assign({}, state, {
                ready: action.ready,
            });
        }

        case MAIN_KEY_UPDATE: {
            return Object.assign({}, state, {
                mainKey: action.key,
            });
        }

        case SET_INSTALL_PWA_EVENT: {
            return Object.assign({}, state, {
                eventInstallPWA: action.event,
            });
        }
    }

    return state;
}
