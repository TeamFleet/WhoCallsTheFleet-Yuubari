// const fs = require('fs-extra')
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const {
    base: pathBase,
    app: pathApp,
    ...dirs
} = require('../../../directories.js')
const {
    pathNameOutput
} = require(path.resolve(pathApp, './config/site'))

const config = require('../base/factory')({
    isExtractTextPlugin: true
})

module.exports = (async () => Object.assign({}, config, {

    output: {
        filename: 'index.js',
        chunkFilename: 'chunk.[name].[chunkhash].js',
        path: `${pathBase}/${pathNameOutput}/server`,
        publicPath: `/[need_set_in_app:__webpack_public_path__]/`
    },

    plugins: [
        'default',
        [
            ...config.plugins,
            new webpack.DefinePlugin({
                '__ELECTRON__': false,
            }),
        ]
    ],

})
)()