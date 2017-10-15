const webpack = require('webpack')
const fs = require('fs-extra')
const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const appPath = process.cwd()
const base = require('./_base')
const pathBgimgs = path.resolve(appPath, './node_modules/whocallsthefleet-backgrounds/output')
const dirs = require('../directories')

const extractCriticalCSS = new ExtractTextPlugin('[name].[chunkhash].css')

module.exports = [
    extractCriticalCSS,
    new webpack.DefinePlugin({
        '__ELECTRON__': base.WEBPACK_BUILD_ENV === 'electron' || base.WEBPACK_BUILD_ENV === 'app',
        '__CHANNEL__': JSON.stringify(
            require(path.resolve(appPath, 'utils/get-channel'))()
        ),
        '__BGIMG_LIST__': JSON.stringify(
            fs.readdirSync(pathBgimgs).filter(
                file => !fs.lstatSync(path.resolve(pathBgimgs, file)).isDirectory() && path.extname(path.resolve(pathBgimgs, file)) === '.jpg'
            )
        ),
        '__ICONSVG__': JSON.stringify(
            fs.readFileSync(
                path.resolve(dirs.assets, './symbols/symbol-defs.svg'), 'utf8'
            ).replace(/<title>(.+?)<\/title>/g, '')
        ),
    }),
]
