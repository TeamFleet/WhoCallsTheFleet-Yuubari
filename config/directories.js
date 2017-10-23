const path = require('path')

const pathBase = path.resolve(__dirname, '../')
const pathApp = path.resolve(pathBase, './apps/app')

const {
    pathNameOutput, pathNameSub
} = require(path.resolve(pathApp, './config/site'))

module.exports = {
    base: pathBase,
    assets: path.resolve(pathBase, './assets'),
    pics: path.resolve(pathBase, './pics'),
    bgimgs: path.resolve(pathBase, './node_modules/whocallsthefleet-backgrounds/output'),

    app: pathApp,
    appUI: path.resolve(pathApp, './client/ui'),

    output: path.resolve(pathBase, pathNameOutput, `public/${pathNameSub}/`),
}