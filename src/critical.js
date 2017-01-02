import nwInit from './_core/nw-init.js'
import * as nwUltils from './_core/nw-utils.js'
import nwControls from './_core/nw-controls.js'

(() => {
    // nw window is hidden by default
    // do all critical process here before the window is shown later
    require('./critical.less')
    nwInit()
    nwControls()

    // create .boat-loader into body
    // onTransitionEnd for removing .loading class from body

    // show and focus window
    if (self.nw.win) {
        self.nw.win.show()
        self.nw.win.focus()
    }
})()