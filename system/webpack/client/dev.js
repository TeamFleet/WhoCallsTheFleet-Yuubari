// const path = require('path')
// const fs = require('fs-extra')

const webpack = require('webpack')
const common = require('../common')
// const opn = require('opn')

const getConfigs = require('./_getConfigs')

const getConfig = async (appPath, app, options = {}) => {

    const entries = common.clientEntries(appPath, app)
    const typeName = app ? app : 'default'
    const publicPath = `http://localhost:${options.clientDevPort}/dist/`

    let config = {
        target: 'web',
        devtool: 'source-map',
        entry: entries,
        output: {
            // -_-_-_-_-_- is trying to fix a pm2 bug that will currupt [name] value
            // check enter.js for the fix
            filename: `${typeName}.-_-_-_-_-_-[name]-_-_-_-_-_-.js`,
            chunkFilename: `${typeName}.chunk.-_-_-_-_-_-[name]-_-_-_-_-_-.js`,
            path: '/',
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
    { clientDevPort }
)
