import * as types from '../../core/actions';

const initialState = {
    list: {
        default: [],
        custom: []
    },
    current: {
        index: 'default-0',
        original: '',
        blured: ''
    }
}

export default function (state = initialState, action) {

    switch (action.type) {

        case types.INIT_BGIMG:
            // return Object.assign({}, state, action.state)
            return Object.assign({}, initialState, action.state)

        case types.ADD_BGIMG:
            // new obj - action.items
            return Object.assign({}, state, {
                list: Object.assign({}, state.list, {
                    custom: state.list.custom.concat(action.items)
                }),
                current: Object.assign({}, state.current, {

                })
            })

        case types.REMOVE_BGIMG:
            return Object.assign({}, state, {
            })

        case types.CHANGE_BGIMG:
            return Object.assign({}, state, {
                current: action.current
            })

    }

    return state;

}