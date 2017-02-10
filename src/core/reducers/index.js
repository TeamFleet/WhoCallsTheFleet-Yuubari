import { combineReducers } from 'redux'

// Reducers
import bgimgReducer from './bgimg.js'

// Combine Reducers
var reducers = combineReducers({
    bgimgState: bgimgReducer
});

export default reducers;