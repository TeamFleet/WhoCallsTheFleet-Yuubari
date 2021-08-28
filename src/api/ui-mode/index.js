import {
    RESET_UIMODE,
    ENTER_UIMODE,
    LEAVE_UIMODE,
    UIMODE_ANIMATION_END,
} from '@redux/action-types';
// import { history } from 'koot'

//

export const reset = () => (dispatch) => {
    dispatch(actions.reset());
};

export const enter =
    (...args) =>
    (dispatch) => {
        dispatch(actions.enter(...args));
    };

export const leave = () => (dispatch) => {
    dispatch(actions.leave());
};

export const animationEnd = () => (dispatch) => {
    dispatch(actions.animationEnd());
};

export const enterBackground =
    (scrollY = __CLIENT__ ? window.scrollY : 0) =>
    (dispatch) =>
        dispatch(actions.enter('background', scrollY));

//

const actions = {
    reset: () => ({
        type: RESET_UIMODE,
    }),

    enter: (mode, scrollY, ...args) => {
        if (!mode) return reset();
        const action = {
            type: ENTER_UIMODE,
            state: {
                scrollY,
                mode,
            },
        };
        switch (mode) {
            case 'select':
                action.state.select = args[0];
                break;
        }
        // history.push({
        //     ...history.getCurrentLocation(),
        //     state: { 'uiMode': action.state }
        // })
        return action;
    },

    leave: () => ({
        type: LEAVE_UIMODE,
    }),

    animationEnd: () => ({
        type: UIMODE_ANIMATION_END,
    }),
};
