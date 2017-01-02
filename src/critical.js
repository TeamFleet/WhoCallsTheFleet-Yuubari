import nwInit from './_core/nw-init.js'
import * as nwUltils from './_core/nw-utils.js'

(() => {
    // nw window is hidden by default
    // do all critical process here before the window is shown later
    require('./critical.less')

    nwInit()

    // show and focus window when all critical process finished
    if (self.nw.win) {
        self.nw.win.show()
        self.nw.win.focus()
    }
})()