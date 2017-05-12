import {
    UPDATE_PAGE_TITLE
} from '../../redux/action-types.js'
import translate from 'sp-i18n'

const initialState = ''

export default function (state = initialState, action) {

    switch (action.type) {

        case UPDATE_PAGE_TITLE:
            if (action.title) return action.title
            return translate('title')

    }

    return state || translate('title');

}