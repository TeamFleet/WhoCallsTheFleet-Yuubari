const path = require('path')

const pathRoot = path.resolve(__dirname, '../')
const pathSrc = path.resolve(pathRoot, './src')
const pathDist = process.env.SUPER_DIST_DIR

module.exports = {
    root: pathRoot,

    assets: path.resolve(pathRoot, './assets'),
    pics: path.resolve(pathRoot, './pics'),
    nodeModules: path.resolve(pathRoot, './node_modules'),
    bgimgs: path.resolve(pathRoot, './node_modules/whocallsthefleet-backgrounds/output'),

    src: {
        _: pathSrc,
        ui: path.resolve(pathSrc, './client/ui'),
    },

    dist: {
        _: pathDist,
        public: path.resolve(pathDist, './public'),
        includes: path.resolve(pathDist, './public/includes'),
    }
}
