import { combineReducers } from 'redux'

// Combine Reducers
var reducers = combineReducers({
    bgimgState: require('../../logic/bgimg/reducer.js').default
});

export default reducers;