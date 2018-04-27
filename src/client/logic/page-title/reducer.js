import {
    UPDATE_PAGE_TITLE
} from '@appRedux/action-types.js'
import translate from 'super-i18n'

const initialState = {
    // main: '',
    // sub: ''
}

export default function (state = initialState, action) {

    switch (action.type) {

        case UPDATE_PAGE_TITLE:
            // console.log(action)
            if (typeof action.title === 'object')
                return action.title
            if (typeof action.title !== undefined)
                return {
                    main: action.title,
                    sub: undefined
                }
            return translate('title')

    }

    return state || translate('title');

}
