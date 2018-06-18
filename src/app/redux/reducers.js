import app from '@api/app/reducer'
import uiMode from '@api/ui-mode/reducer'
import bgimg from '@api/bgimg/reducer'
import pageTitle from '@api/page-title/reducer'
import timeSwipedFromLeftEdge from '@api/side-menu/reducer'
import shipList from '@api/ship-list/reducer'
import equipmentList from '@api/equipment-list/reducer'
import pages from '@api/pages/reducer'
import fleets from '@api/fleets/reducer'

export default {
    app,
    uiMode,
    bgimg,
    pageTitle,
    timeSwipedFromLeftEdge,

    pages,

    shipList,
    equipmentList,

    fleets
}
