import {
    INFOSPAGE_INIT,
    INFOSPAGE_RESET,
    INFOSPAGE_UPDATE
} from '../../redux/action-types'

export const TABINDEX = '__tabIndex'

const initialState = {}
const initialStateSingle = {
    [TABINDEX]: 0
}

export default function (state = initialState, action) {

    const update = (id, thisState) =>
        Object.assign(
            {}, state,
            {
                [id]: Object.assign({}, state[id] || initialStateSingle, thisState)
            }
        )

    switch (action.type) {

        case INFOSPAGE_INIT: {
            if (state[action.id])
                return state
            return Object.assign(
                {}, state,
                {
                    [action.id]: Object.assign(
                        action.initialState ? {
                            __initialState: Object.assign({}, action.initialState)
                        } : {},
                        initialStateSingle,
                        action.initialState
                    )
                }
            )
        }

        case INFOSPAGE_RESET: {
            // console.log('reset', action, state[action.id])
            if (state[action.id])
                return Object.assign(
                    {}, state,
                    {
                        [action.id]: action.initialState || state[action.id].__initialState || initialStateSingle
                    }
                )
            return state
        }

        case INFOSPAGE_UPDATE: {
            return update(action.id, action.state)
        }

    }

    return state

}