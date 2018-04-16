const fs = require('fs-extra')
const path = require('path')
const webpack = require('webpack')
// const ExtractTextPlugin = require("extract-text-webpack-plugin")
const semver = require('semver')

const {
    nodeModules: pathNodeModules,
    dist: {
        includes: pathIncludes,
    }
} = require('../directories')
const publicPath = `/includes/`

const defaults = require('./base/factory')({
    // isExtractTextPlugin: true
})
const pluginCopyImages = require('./base/plugin-copy-images')

const isAnalyze = process.env.WEBPACK_ANALYZER || false

module.exports = (async () => {
    const webpackVersion = fs.readJsonSync(
        path.resolve(pathNodeModules, './webpack/package.json')
    ).version

    let config = {}
    try {
        await (async () => {
            config = {

                analyzer: isAnalyze,

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
                    // filename: `[name].[chunkhash].js`,
                    // chunkFilename: `chunk.[name].[chunkhash].js`,
                    filename: `core.[chunkhash].js`,
                    chunkFilename: `chunk.[chunkhash].js`,
                    path: pathIncludes,
                    publicPath: publicPath // TODO 改成静态第三方URL用于CDN部署 http://localhost:3000/
                },

                plugins: [
                    ...defaults.plugins,
                    // new ExtractTextPlugin('[name].[chunkhash].css'),
                    new webpack.DefinePlugin({
                        '__ELECTRON__': false,
                        '__PUBLIC__': JSON.stringify(publicPath),
                    }),
                    // new webpack.optimize.CommonsChunkPlugin({
                    //     children: true,
                    //     deepChildren: true,
                    // }),
                    // new webpack.optimize.CommonsChunkPlugin({
                    //     name: "commons",
                    //     filename: '[name].[chunkhash].js',
                    //     minChunks: 3
                    // }),
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
        })()

        // const optimizationSplitChunks = {
        //     names: [
        //         'commons',
        //         'critical',
        //     ],
        //     filename: 'core.[chunkhash].js'
        // }

        // if (semver.satisfies(webpackVersion, '>= 4.0.0')) {
        //     if (!config.optimization)
        //         config.optimization = {}
        //     // const {
        //     //     names: chunks,
        //     //     filename,
        //     // } = optimizationSplitChunks
        //     config.optimization.splitChunks = {
        //         chunks: 'initial',
        //         name: true,
        //     }
        // } else {
        //     config.plugins.push(
        //         new webpack.optimize.CommonsChunkPlugin(optimizationSplitChunks)
        //     )
        // }
    } catch (e) {
        console.log(e)
    }

    return Object.assign({}, defaults, config)
})()
