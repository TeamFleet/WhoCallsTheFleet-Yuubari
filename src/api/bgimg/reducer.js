import {
    INIT_BGIMG,
    ADD_BGIMG,
    REMOVE_BGIMG,
    CHANGE_BGIMG,
    LOADED_MAIN_BGIMG,
} from '@redux/action-types';

const initialState = {
    isMainLoaded: false,
    list: {
        default: [],
        custom: [],
    },
    // current: null,
    // currentIndex: 'default-0',
    // currentPath: {
    //     original: '',
    //     blured: ''
    // }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case INIT_BGIMG:
            // return Object.assign({}, state, action.state)
            return Object.assign({}, state, action.state);

        case ADD_BGIMG:
            // new obj - action.items
            return Object.assign({}, state, {
                list: Object.assign({}, state.list, {
                    custom: state.list.custom.concat(action.items),
                }), //,
                // current: Object.assign({}, state.current, {})
            });

        case REMOVE_BGIMG:
            return Object.assign({}, state, {});

        case CHANGE_BGIMG:
            action.changeToObj.active();
            return Object.assign({}, state, {
                current: action.changeToObj,
            });

        case LOADED_MAIN_BGIMG: {
            if (state.isMainLoaded) return state;
            return Object.assign({}, state, {
                isMainLoaded: true,
            });
        }

        default: {
        }
    }

    return state;
}
