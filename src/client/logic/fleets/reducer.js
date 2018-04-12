import {
    FLEETS_INIT,
    // FLEETS_REFRESH,

    FLEETS_NEW_BUILD,
    FLEETS_REMOVE_BUILD,
    FLEETS_UPDATE_BUILD,
} from '@appRedux/action-types.js'

const initialState = {
    // builds: [],
    groupByTheme: true,
    order: ['theme', 'asc'],
    // current: {},
}

export default function (state = initialState, action) {
    switch (action.type) {

        case FLEETS_INIT: {
            return Object.assign({}, initialState, {
                builds: action.builds,

                groupByTheme: state.groupByTheme,
                order: state.order,

                current: undefined,
            })
        }

        // case FLEETS_REFRESH: {
        //     return Object.assign({}, initialState, {
        //         builds: action.builds,
        //         groupByTheme: state.groupByTheme,
        //         order: state.order,
        //     })
        // }

        case FLEETS_NEW_BUILD: {
            return Object.assign({}, state, {
                current: action.data,
            })
        }

    }

    return state;

}
