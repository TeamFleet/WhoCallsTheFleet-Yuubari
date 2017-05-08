import appModeReducer from '../logic/app-mode/reducer.js'
import bgimgReducer from '../logic/bgimg/reducer.js'
import locationReducer from '../logic/location/reducer.js'

export default [
    ['appMode', appModeReducer],
    ['bgimg', bgimgReducer],

    // real time react-router location
    ['location', locationReducer]
]