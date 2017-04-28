const path = require('path')
const webpack = require('webpack')
const common = require('./common')


module.exports = (appPath) => {
    const publicPath = '/client'

    return {
        target: 'async-node',
        node: {
            __dirname: true
        },
        watch: false,
        entry: [
            path.resolve(appPath, './src/server')
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
                '__DEV__': false,
                '__PUBLIC__': JSON.stringify(publicPath)
            }),
            ...common.plugins
        ],
        externals: common.filterExternalsModules(),
        resolve: common.resolve
    }
}