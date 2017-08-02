const path = require('path')
const webpack = require('webpack')
const common = require('../common')

const getConfig = (appPath, type) => {
    // const publicPath = '/client'
    const publicPath = `/${typeName}`

    return {
        target: 'async-node',
        node: {
            __dirname: true
        },
        watch: false,
        entry: [
            path.resolve(appPath, './src/start')
        ],
        output: {
            filename: 'index.js',
            chunkFilename: 'chunk.[name].[chunkhash].js',
            path: appPath + '/dist-web/server',
            publicPath: publicPath + '/'
        },
        module: {
            rules: [...common.rules]
        },
        plugins: [
            new webpack.DefinePlugin({
                '__CLIENT__': false,
                '__SERVER__': true,
                '__APP__': false,
                '__DEV__': false,
                '__PUBLIC__': JSON.stringify(publicPath)
            }),
            ...common.plugins
        ],
        externals: common.filterExternalsModules(),
        resolve: common.resolve
    }
}

module.exports = (appPath) => [
    getConfig(appPath, 'app')
]