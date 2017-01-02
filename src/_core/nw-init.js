function nw_pre13_shim(self = window) {
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
}



export default (self = window) => {
    if (self.nwInited)
        return self.nwInited

    self.nwInited = true

    if (!self.require)
        return self.nwInited

    nw_pre13_shim(self)

    const path = require('path')
    const fs = require('fs')





    // nw object
    if (!self.nw)
        self.nw = self.require('nw.gui')
    
    self.nw.win = self.nw.Window.get()





    // debugmode
    if (typeof self.debugmode == 'undefined')
        self.debugmode = false
            || (
                self.nw.App.manifest['debug']
                || self.nw.App.manifest['window']['debug']
            )
    if (global.launcherOptions) {
        self.debugmode = global.launcherOptions['debug'] || global.launcherOptions['window']['debug']
    }





    // nw.root
    const rootscheck = [
        self.nw.__dirname,
        path.dirname(process.execPath),
        process.cwd(),
        path.join(self.nw.App.dataPath, '/Extracted Data/')
    ]
    let rootscheckentry
    if (global.launcherOptions)
        rootscheckentry = global.launcherOptions.main
    else if (localStorage.nwManifest)
        rootscheckentry = JSON.parse(localStorage.nwManifest).main
    else
        rootscheckentry = self.nw.App.manifest.main
    rootscheckentry = rootscheckentry.split('://')
    rootscheckentry = rootscheckentry[rootscheckentry.length - 1]
    rootscheck.some((dir) => {
        if (!dir)
            return false
        try {
            fs.accessSync(
                path.join(dir, rootscheckentry),
                fs.F_OK
            );
            self.nw.root = dir
        } catch (e) { }
        return self.nw.root ? true : false
    })
}