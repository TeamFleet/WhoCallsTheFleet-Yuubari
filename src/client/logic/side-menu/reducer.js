import {
    SWIPED_FROM_LEFT_EDGE
} from '@appRedux/action-types.js'

const initialState = 0

export default function (state = initialState, action) {

    switch (action.type) {

        case SWIPED_FROM_LEFT_EDGE:
            return action.ts || 0

    }

    return state;

}
