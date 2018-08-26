const getDistPath = require('koot/utils/get-dist-path')

const path = require('path')

const pathRoot = path.resolve(__dirname, '../')
const pathSrc = path.resolve(pathRoot, './src')

module.exports = {
    root: pathRoot,

    assets: path.resolve(pathSrc, './assets'),
    pics: path.resolve(pathRoot, './pics'),
    nodeModules: path.resolve(pathRoot, './node_modules'),
    bgimgs: path.resolve(pathRoot, './node_modules/whocallsthefleet-backgrounds/output'),

    src: {
        _: pathSrc,
        ui: path.resolve(pathSrc, './app/ui'),
    },

    getDist: () => getDistPath(),
    getDistPublic: () => path.resolve(getDistPath(), 'public'),
    getDistIncludes: () => path.resolve(getDistPath(), 'public/includes'),

    // dist: {
    //     _: pathDist,
    //     public: path.resolve(pathDist, './public'),
    //     includes: path.resolve(pathDist, './public/includes'),
    // }
}
