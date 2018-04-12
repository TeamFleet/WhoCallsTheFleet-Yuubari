import {
    UPDATE_PAGE_TITLE
} from '@appRedux/action-types.js'

export function update(title) {
    return {
        type: UPDATE_PAGE_TITLE,
        title
    }
}
