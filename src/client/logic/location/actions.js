import {
    LOCATION_UPDATE
} from '../../redux/action-types.js'

export function update(location) {
    return {
        type: LOCATION_UPDATE,
        location
    }
}