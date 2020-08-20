import { UPDATE_PAGE_TITLE } from '@redux/action-types';

export function update(title) {
    return {
        type: UPDATE_PAGE_TITLE,
        title,
    };
}
