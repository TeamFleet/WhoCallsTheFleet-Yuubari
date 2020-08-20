import { SWIPED_FROM_LEFT_EDGE } from '@redux/action-types';

export function swipedFromLeftEdge(ts = Date.now()) {
    return {
        type: SWIPED_FROM_LEFT_EDGE,
        ts,
    };
}
