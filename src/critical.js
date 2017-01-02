((nw) => {
    // nw window is hidden by default
    // do all critical process here before the window is shown later

    // show and focus window when all critical process finished
    if( nw ){
        const win = nw.Window.get();
        win.show()
        win.focus()
    }
})(nw || null)