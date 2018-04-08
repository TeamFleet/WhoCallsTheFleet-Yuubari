import {
    FLEETS_INIT,
    // FLEETS_REFRESH,

    FLEETS_NEW_BUILD,
    FLEETS_REMOVE_BUILD,
    FLEETS_UPDATE_BUILD,
} from '../../redux/action-types.js'

const initialState = {
    builds: [],
    groupByTheme: true,
    order: ['theme', 'asc'],
    current: {},
}
const initialStateBuild = {
    history: [],

    data: [],

    name: undefined,
    name_airfields: [],
    hq_lv: -1,
    note: undefined,

    theme: 0,

    rating: -1,
}

const readAllBuilds = () => {

}

export default function (state = initialState, action) {
    switch (action.type) {

        case FLEETS_INIT: {
            return Object.assign({}, initialState, {
                builds: action.builds,
                groupByTheme: state.groupByTheme,
                order: state.order,
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
            if (typeof Nedb === 'undefined') {
                console.error('Nedb not initialized')
                return state
            }
            // return Object.assign({}, state, {
            //     builds: state.builds.concat([initialStateBuild])
            // })
        }

    }

    return state;

}