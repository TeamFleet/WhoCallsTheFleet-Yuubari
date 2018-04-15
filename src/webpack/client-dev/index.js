// const fs = require('fs-extra')
// const path = require('path')
const webpack = require('webpack')
// const ExtractTextPlugin = require("extract-text-webpack-plugin")
const WebpackOnBuildPlugin = require('on-build-webpack')
const opn = require('opn')

let isOpened = false

// const {
//     _app: pathApp,
//     // _appName: pathNameSub,
//     ...dirs
// } = require('../../../directories.js')
// const publicPath = `http://localhost:${process.env.WEBPACK_DEV_SERVER_PORT || 3001}/dist/`

const pluginCopyImages = require('../base/plugin-copy-images')

const config = require('../base/factory')()

module.exports = (async () => Object.assign({}, config, {

    entry: {
        ...config.entry,
    },

    // output: {
    //     // -_-_-_-_-_- is trying to fix a pm2 bug that will currupt [name] value
    //     // check enter.js for the fix
    //     filename: `${pathNameSub}.-_-_-_-_-_-[name]-_-_-_-_-_-.js`,
    //     chunkFilename: `${pathNameSub}.chunk.-_-_-_-_-_-[name]-_-_-_-_-_-.js`,
    //     path: '/',
    //     publicPath: publicPath
    // },

    plugins: [
        ...config.plugins,
        // new ExtractTextPlugin('[name].[chunkhash].css'),
        new webpack.DefinePlugin({
            '__ELECTRON__': false,
            // '__PUBLIC__': JSON.stringify(publicPath),
        }),
        ...await pluginCopyImages(true),
        new WebpackOnBuildPlugin(function () {
            if (!isOpened) {
                opn(`http://127.0.0.1:3000/`)
                isOpened = true
            }
        })
    ],

})
)()