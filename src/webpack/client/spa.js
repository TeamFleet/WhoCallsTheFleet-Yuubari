const path = require('path')
// const fs = require('fs-extra')

const webpack = require('webpack')
const common = require('../common')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// const CopyWebpackPlugin = require('copy-webpack-plugin')
// const pwaCreatePlugin = require('sp-pwa')

const getConfig = (appPath, type) => {

    const entries = require('./entries.js')(appPath, type)
    const typeName = type ? type : 'default'
    const outputPath = path.resolve(appPath, `dist-app/${typeName}/includes`)
    const publicPath = `includes/`

    let config = {
        target: 'electron-main',
        devtool: 'source-map',
        entry: entries,
        output: {
            filename: `[name].[chunkhash].js`,
            chunkFilename: `chunk.[name].[chunkhash].js`,
            path: outputPath,
            publicPath: publicPath
        },
        module: {
            rules: [...common.rules]
        },
        plugins: [
            // 在node执行环境中设置，不起作用，此处不能省略
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new webpack.DefinePlugin({
                '__CLIENT__': true,
                '__SERVER__': false,
                '__SPA__': true,
                '__DEV__': false,
                '__PUBLIC__': JSON.stringify(publicPath)
            }),
            new webpack.NoEmitOnErrorsPlugin(),
            ...common.plugins,
            // new webpack.optimize.UglifyJsPlugin({
            //     compress: {
            //         warnings: false
            //     },
            //     beautify: false,
            //     comments: false,
            //     sourceMap: false
            // }),
            new HtmlWebpackPlugin({
                title: 'WhoCallsTheFleet',
                filename: '../index.html',
                template: path.resolve(appPath, `./src/app/html.ejs`),
                src_critical: () => {
                    return 'null'
                }
            })
        ],
        resolve: common.resolve
        // externals: ['react'] // 尝试把react单独已js引用到html中，看看是否可以减小体积
    }

    return config
}

module.exports = (appPath) => [
    getConfig(appPath, 'app')
]