// const fs = require('fs-extra')
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const {
    app: pathApp,
    ...dirs
} = require('../../../directories.js')
const {
    pathNameSub
} = require(path.resolve(pathApp, './config/site'))
const publicPath = `http://localhost:${process.env.WEBPACK_DEV_SERVER_PORT || 3001}/dist/`

const pluginCopyImages = require('../base/plugin-copy-images')

const config = require('../base/factory')()

module.exports = (async () => Object.assign({}, config, {

    entry: {
        ...config.entry,
        "critical-extra-old-ie": [
            "babel-polyfill",
            path.resolve(pathApp, './client/critical.extra-old-ie.js')
        ],
        client: [
            path.resolve(pathApp, `./client`)
        ]
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
        'default',
        {
            'pwa': false
        },
        [
            ...config.plugins,
            new ExtractTextPlugin('[name].[chunkhash].css'),
            new webpack.DefinePlugin({
                '__ELECTRON__': false,
                // '__PUBLIC__': JSON.stringify(publicPath),
            }),
            ...await pluginCopyImages(true),
        ]
    ],

})
)()