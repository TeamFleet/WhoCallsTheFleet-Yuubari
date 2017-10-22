const path = require('path')
const fs = require('fs-extra')

const webpack = require('webpack')
const common = require('../common')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackOnBuildPlugin = require('on-build-webpack')

const times = n => f => {
    let iter = i => {
        if (i === n) return
        f(i)
        iter(i + 1)
    }
    return iter(0)
}

const factoryConfig = async(opt) => {

    let { RUN_PATH, CLIENT_DEV_PORT, APP_KEY } = opt

    let config = {
        target: 'web',
        devtool: 'source-map',
        // entry: entries,
        // output: {
        //     filename: `[name].[chunkhash].js`,
        //     chunkFilename: `chunk.[name].[chunkhash].js`,
        //     path: outputPath,
        //     publicPath: publicPath
        // },
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
            new webpack.NoEmitOnErrorsPlugin(),
            // new webpack.optimize.UglifyJsPlugin({
            //     compress: {
            //         warnings: false
            //     },
            //     beautify: false,
            //     comments: false,
            //     sourceMap: false
            // }),
            new HtmlWebpackPlugin({
                filename: '../index.html',
                template: path.resolve(RUN_PATH, `./apps/${APP_KEY}/html.ejs`),
                inject: false
            }),
            new WebpackOnBuildPlugin(function(stats) {

                const chunks = {}
                const outputPath = stats.compilation.outputOptions.path
                const publicPath = stats.compilation.outputOptions.publicPath

                const log = (obj, spaceCount = 1, deep = 2) => {
                    if (typeof obj === 'object') {
                        let spaces = ''
                        times(spaceCount)(() => {
                            spaces += '    '
                        })
                        for (let key in obj) {
                            // console.log(spaces + key)
                            if (spaceCount < deep)
                                log(obj[key], spaceCount + 1, deep)
                        }
                    }
                }

                for (let id in stats.compilation.chunks) {
                    const o = stats.compilation.chunks[id]
                    chunks[o.name] = o.files
                }

                fs.writeFileSync(
                    path.resolve(outputPath, '../index.html'),
                    fs.readFileSync(
                        path.resolve(outputPath, '../index.html'),
                        'utf-8'
                    ).replace(/\{\{[ ]*SRC:(.+?)[ ]*\}\}/g, (match, ...parts) => {
                        // console.log(match, parts)
                        return publicPath + chunks[parts[0]][0]
                    }),
                    'utf-8'
                )
            })
        ],
        resolve: common.resolve
    }

    return config
}
module.exports = async(opt) => await factoryConfig(opt)