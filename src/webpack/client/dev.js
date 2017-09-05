const path = require('path')
const fs = require('fs-extra')

const webpack = require('webpack')
const common = require('../common')

const getConfig = async (appPath, port, type) => {
    const entries = require('./entries.js')(appPath, type)
    const typeName = type ? type : 'default'
    const outputPath = path.resolve(appPath, `dist/public/client`)
    const publicPath = `http://localhost:${port}/dist`

    return {
        target: 'web',
        devtool: 'source-map',
        entry: entries,
        output: {
            filename: `${typeName}.[name].js`,
            chunkFilename: `${typeName}.chunk.[name].js`,
            path: outputPath,
            publicPath: publicPath + '/'
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
                '__SPA__': false,
                '__DEV__': true,
                '__CLIENTPORT__': JSON.stringify(port),
                '__PUBLIC__': JSON.stringify(publicPath)
            }),
            new webpack.NoEmitOnErrorsPlugin(),
            ...common.plugins,
            ...await require('./plugins.js')(appPath, type, true)
        ],
        resolve: common.resolve
    }
}

module.exports = async (appPath, port) => [
    await getConfig(appPath, port, 'app')
]