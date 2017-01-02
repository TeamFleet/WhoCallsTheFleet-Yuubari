(() => {
    // nw window is hidden by default
    // do all critical process here before the window is shown later
    require('./critical.less')

    // https://github.com/nwjs/nw.js/blob/nw13/src/resources/nw_pre13_shim.js
    // detect `nw` object of NW13
    if (!(self.nw && self.nw.require)) return;

    var realrequire = nw.require;
    self.require = function () {
        if (arguments[0] === 'nw.gui') {
            return nw;
        } else {
            return realrequire.apply(self, [].slice.call(arguments, 0));
        }
    };
    self.require.cache = realrequire.cache;
    self.require.extensions = realrequire.extensions;
    self.require.resolve = realrequire.resolve;

    // Following items exist when running with `--mixed-context`.
    // Copy them from `nw` to browser context
    if (!self.process) self.process = self.nw.process;
    if (!self.Buffer) self.Buffer = self.nw.Buffer;
    if (!self.global) self.global = self.nw.global;
    if (!self.root) self.root = self.nw.root;

    // show and focus window when all critical process finished
    let win
    if (self.nw) {
        win = self.nw.Window.get();
    } else if (self.require) {
        win = self.require('nw.gui').Window.get()
    }
    if (win) {
        win.show()
        win.focus()
    }
})()