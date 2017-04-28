import {
    INIT_BGIMG,
    ADD_BGIMG,
    REMOVE_BGIMG,
    CHANGE_BGIMG,
    LOADED_MAIN_BGIMG
} from '../../redux/action-types.js';

const initialState = {
    isMainLoaded: false,
    list: {
        default: [],
        custom: []
    },
    current: null,
    currentIndex: 'default-0',
    currentPath: {
        original: '',
        blured: ''
    }
}

export default function (state = initialState, action) {

    switch (action.type) {

        case INIT_BGIMG:
            // return Object.assign({}, state, action.state)
            return Object.assign({}, initialState, action.state)

        case ADD_BGIMG:
            // new obj - action.items
            return Object.assign({}, state, {
                list: Object.assign({}, state.list, {
                    custom: state.list.custom.concat(action.items)
                })//,
                // current: Object.assign({}, state.current, {})
            })

        case REMOVE_BGIMG:
            return Object.assign({}, state, {
            })

        case CHANGE_BGIMG:
            return Object.assign({}, state, {
                current: action.current
            })
        
        case LOADED_MAIN_BGIMG:
            return Object.assign({}, state, {
                isMainLoaded: true
            })

    }

    return state;

}