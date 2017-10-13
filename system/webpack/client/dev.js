const path = require('path')
// const fs = require('fs-extra')

const webpack = require('webpack')
const common = require('../common')
// const WebpackOnBuildPlugin = require('on-build-webpack')
// const opn = require('opn')

const getConfigs = require('./_getConfigs')

const defaults = {
    outputPathDev: common.outputPath
}

const getConfig = async (appPath, type, options = {}) => {
    // const entries = require('./_entries.js')(appPath, type)
    const entries = common.clientEntries(appPath, type)
    const typeName = type ? type : 'default'
    const outputPath = path.resolve(appPath, options.outputPathDev || defaults.outputPathDev, `public/client`)
    const publicPath = `http://localhost:${options.clientDevPort}/dist/`
    // const configServer = require(path.resolve(appPath, `config/server`))

    let config = {
        target: 'web',
        devtool: 'source-map',
        entry: entries,
        output: {
            filename: `${typeName}.[name].js`,
            chunkFilename: `${typeName}.chunk.[name].js`,
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
                    'NODE_ENV': JSON.stringify('development')
                }
            }),
            new webpack.DefinePlugin({
                '__CLIENT__': true,
                '__SERVER__': false,
                '__DEV__': true,
                '__SPA__': false,
                '__CLIENTPORT__': JSON.stringify(options.clientDevPort),
                '__PUBLIC__': JSON.stringify(publicPath)
            }),
            new webpack.NoEmitOnErrorsPlugin(),
            // new WebpackOnBuildPlugin(function () {
            //     opn(`http://localhost:${configServer.SERVER_PORT}`)
            // }),
            ...common.plugins,

        ],
        resolve: common.resolve
    }

    return config
}

module.exports = async (appPath, clientDevPort) => await getConfigs(
    getConfig,
    appPath,
    Object.assign({}, defaults, { clientDevPort })
)
