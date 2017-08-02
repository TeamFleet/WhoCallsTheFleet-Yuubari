import appModeReducer from '@appLogic/app-mode/reducer'
import bgimgReducer from '@appLogic/bgimg/reducer'
import pageTitleReducer from '@appLogic/page-title/reducer'
import sideMenuReducer from '@appLogic/side-menu/reducer'
import shipListReducer from '@appLogic/ship-list/reducer'
import shipDetailsReducer from '@appLogic/ship-details/reducer'
import equipmentListReducer from '@appLogic/equipment-list/reducer'

export default [
    ['appMode', appModeReducer],
    ['bgimg', bgimgReducer],
    ['pageTitle', pageTitleReducer],
    ['timeSwipedFromLeftEdge', sideMenuReducer],
    ['shipList', shipListReducer],
    ['shipDetails', shipDetailsReducer],
    ['equipmentDetails', equipmentListReducer]
]