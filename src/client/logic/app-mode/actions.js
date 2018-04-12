import {
    RESET_APPMODE,
    ENTER_APPMODE,
    LEAVE_APPMODE,
    APPMODE_ANIMATION_END
} from '@appRedux/action-types.js'

export function reset() {
    return {
        type: RESET_APPMODE
    }
}

export function enter(mode, scrollY, ...args) {
    if (!mode) return reset()
    let action = {
        type: ENTER_APPMODE,
        state: {
            scrollY,
            mode
        }
    }
    switch (mode) {
        case 'select':
            action.state.select = args[0]
            break
    }
    return action
}

export function leave() {
    return {
        type: LEAVE_APPMODE,
    }
}

export function animationEnd() {
    return {
        type: APPMODE_ANIMATION_END,
    }
}
