const path = require('path')
const webpack = require('webpack')

const defaults = require('./base/factory')()
const pluginCopyImages = require('./base/plugin-copy-images')

const isAnalyze = process.env.WEBPACK_ANALYZE == 'true'

module.exports = (async () => {
    const pathDist = global.__SUPER_DIST__ || (typeof __DIST__ === 'undefined' ? '' : __DIST__)
    const publicPath = `/includes/`
    const config = {
        entry: {
            commons: [
                'react',
                'react-dom',

                'redux',
                'redux-thunk',
                'react-redux',

                'react-router',
                'react-router-redux',

                'react-transition-group',

                // 'localforage',
                'lz-string',
                'metas',
                'classnames',
                'js-cookie',

                'kckit',
            ],
            ...defaults.entry,
        },

        output: {
            filename: `core.[chunkhash].js`,
            chunkFilename: `chunk.[chunkhash].js`,
            path: path.resolve(pathDist, `./public/${publicPath}`),
            publicPath,
        },

        plugins: [
            ...defaults.plugins,
            new webpack.DefinePlugin({
                '__ELECTRON__': false,
                '__PUBLIC__': JSON.stringify(publicPath),
            }),
            ...(isAnalyze ? [] : await pluginCopyImages()),
        ],

        optimization: {
            // minimize: false,
            // splitChunks: {
            //     chunks: 'all'
            // }
            splitChunks: {
                cacheGroups: {
                    commons: {
                        name: "commons",
                        chunks: "initial",
                        minChunks: 2
                    }
                }
            }
        }
    }

    return Object.assign({}, defaults, config)
})()
