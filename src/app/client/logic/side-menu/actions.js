import {
    SWIPED_FROM_LEFT_EDGE
} from '../../redux/action-types.js'

export function swipedFromLeftEdge(ts = (new Date()).valueOf()) {
    return {
        type: SWIPED_FROM_LEFT_EDGE,
        ts
    }
}