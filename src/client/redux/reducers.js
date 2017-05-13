import appModeReducer from '../logic/app-mode/reducer.js'
import bgimgReducer from '../logic/bgimg/reducer.js'
import pageTitleReducer from '../logic/page-title/reducer.js'
import sideMenuReducer from '../logic/side-menu/reducer.js'

export default [
    ['appMode', appModeReducer],
    ['bgimg', bgimgReducer],
    ['pageTitle', pageTitleReducer],
    ['timeSwipedFromLeftEdge', sideMenuReducer]
]