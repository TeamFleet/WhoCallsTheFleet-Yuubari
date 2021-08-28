import {
    APP_READY_UPDATE,
    MAIN_KEY_UPDATE,
    SET_INSTALL_PWA_EVENT,
    SET_APP_TYPE,
} from '@redux/action-types';

const initialState = {
    // ready: false,
    // mainKey: undefined,
    // showInstallPWAButton: false,
    // eventInstallPWA: undefined,
    type: 'web',
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

        case SET_APP_TYPE: {
            return Object.assign({}, state, {
                type: action.appType,
            });
        }

        default:
            return state;
    }
}
