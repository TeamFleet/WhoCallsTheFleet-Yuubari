const path = require('path')

const pathBase = typeof process === 'undefined' ? path.resolve(__dirname, '../') : process.cwd()
const pathApp = path.resolve(pathBase, './src')

const pathNameDistWeb = 'dist-web'
const _appName = 'app'

const pathDistWeb = path.resolve(pathBase, pathNameDistWeb)

module.exports = {
    base: pathBase,
    assets: path.resolve(pathBase, './assets'),
    pics: path.resolve(pathBase, './pics'),
    nodeModules: path.resolve(pathBase, './node_modules'),
    bgimgs: path.resolve(pathBase, './node_modules/whocallsthefleet-backgrounds/output'),
    output: pathDistWeb,
    outputRelative: `${pathNameDistWeb}`,

    distWeb: pathDistWeb,
    pathNameDistWeb,

    _app: pathApp,
    _appUI: path.resolve(pathApp, './client/ui'),
    _appOutput: path.resolve(pathDistWeb, `public/${_appName}/`),
    _appName,
}
