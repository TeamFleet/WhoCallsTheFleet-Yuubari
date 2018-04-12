import app from '@appLogic/app/reducer'
import appMode from '@appLogic/app-mode/reducer'
import bgimg from '@appLogic/bgimg/reducer'
import pageTitle from '@appLogic/page-title/reducer'
import timeSwipedFromLeftEdge from '@appLogic/side-menu/reducer'
import shipList from '@appLogic/ship-list/reducer'
import equipmentList from '@appLogic/equipment-list/reducer'
import pages from '@appLogic/pages/reducer'
import fleets from '@appLogic/fleets/reducer'

export default {
    app,
    appMode,
    bgimg,
    pageTitle,
    timeSwipedFromLeftEdge,

    pages,

    shipList,
    equipmentList,

    fleets
}
