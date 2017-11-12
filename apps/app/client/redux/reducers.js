import { SERVER_REDUCER_NAME, serverReducer } from '@app/server/server-redux'
import appReducer from '@appLogic/app/reducer'
import appModeReducer from '@appLogic/app-mode/reducer'
import bgimgReducer from '@appLogic/bgimg/reducer'
import pageTitleReducer from '@appLogic/page-title/reducer'
import sideMenuReducer from '@appLogic/side-menu/reducer'
import shipListReducer from '@appLogic/ship-list/reducer'
import equipmentListReducer from '@appLogic/equipment-list/reducer'
import infosPageReducer from '@appLogic/infospage/reducer'

export default [
    [SERVER_REDUCER_NAME, serverReducer],

    ['app', appReducer],
    ['appMode', appModeReducer],
    ['bgimg', bgimgReducer],
    ['timeSwipedFromLeftEdge', sideMenuReducer],

    ['pageTitle', pageTitleReducer],
    ['infosPage', infosPageReducer],

    ['shipList', shipListReducer],

    ['equipmentList', equipmentListReducer]
]