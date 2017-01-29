import nwInit from './_core/nw-init.js'
// import * as nwUltils from './_core/nw-utils.js'
// import nwControls from './_core/nw-controls.js'

export default () => {
    // nw window is hidden by default
    // do all critical process here before the window is shown later
    nwInit()
    // nwControls()

    console.log(nw)
}
