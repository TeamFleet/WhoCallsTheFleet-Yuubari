((nw) => {

    // show and focus window when all critical process finished
    const win = nw.Window.get();
    win.show()
    win.focus()
})(nw)