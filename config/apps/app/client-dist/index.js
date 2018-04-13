const fs = require('fs-extra')
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const semver = require('semver')

const {
    // _app: pathApp,
    nodeModules: pathNodeModules,
    _appOutput: pathOutput,
    // _appName: pathNameSub,
    // ...dirs
} = require('../../../directories.js')
const publicPath = `/includes/`

const pluginCopyImages = require('../base/plugin-copy-images')

const defaults = require('../base/factory')({
    isExtractTextPlugin: true
})

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
                    ...defaults.entry,
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
                    ]
                },

                output: {
                    // filename: `[name].[chunkhash].js`,
                    // chunkFilename: `chunk.[name].[chunkhash].js`,
                    filename: `core.[chunkhash].js`,
                    chunkFilename: `chunk.[chunkhash].js`,
                    path: pathOutput,
                    publicPath: publicPath // TODO 改成静态第三方URL用于CDN部署 http://localhost:3000/
                },

                plugins: [
                    'default',
                    {
                        'pwa': {
                            outputPath: path.resolve(pathOutput, '../'),
                            outputFilename: `service-worker.js`,
                            outputFilenameHash: false,
                            // customServiceWorkerPath: path.normalize(appPath + '/src/client/custom-service-worker.js'),
                            globPattern: `/$includes/**/*`,
                            globOptions: {
                                ignore: [
                                    '/**/_*/',
                                    '/**/_*/**/*',
                                    '/**/chunk.database.*'
                                ]
                            },
                            // appendUrls: getUrlsFromRouter()
                            appendUrls: []
                        }
                    },
                    [
                        ...defaults.plugins,
                        new ExtractTextPlugin('[name].[chunkhash].css'),
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
                    ]
                ],
            }
        })()

        const optimizationSplitChunks = {
            names: [
                'commons',
                'critical',
            ],
            filename: 'core.[chunkhash].js'
        }
    
        if (semver.satisfies(webpackVersion, '>= 4.0.0')) {
            if (!config.optimization)
                config.optimization = {}
            config.optimization.splitChunks = optimizationSplitChunks
        } else {
            config.plugins[2].push(
                new webpack.optimize.CommonsChunkPlugin(optimizationSplitChunks)
            )
        }
    } catch (e) {
        console.log(e)
    }

    return Object.assign({}, defaults, config)
})()
