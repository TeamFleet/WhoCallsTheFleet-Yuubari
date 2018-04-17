const webpack = require('webpack')

const config = require('./base/factory')()
const pluginCopyImages = require('./base/plugin-copy-images')

module.exports = (async () => Object.assign({}, config, {

    entry: {
        ...config.entry,
    },

    plugins: [
        ...config.plugins,
        new webpack.DefinePlugin({
            '__ELECTRON__': false,
        }),
        ...await pluginCopyImages(true),
    ],

})
)()
