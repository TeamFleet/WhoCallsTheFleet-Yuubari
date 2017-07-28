const path = require('path')
const webpack = require('webpack')
const common = require('../common')

module.exports = (appPath, clientDevPort) => {
    const publicPath = `http://localhost:${clientDevPort}/dist`
    return {
        target: 'async-node',
        node: {
            __dirname: true
        },
        watch: true,
        entry: [
            'webpack/hot/poll?1000',
            path.resolve(appPath, './src/start')
        ],
        output: {
            filename: 'index.js',
            chunkFilename: 'chunk.[name].js',
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
                '__DEV__': true,
                '__PUBLIC__': JSON.stringify(publicPath)
            }),
            new webpack.HotModuleReplacementPlugin({ quiet: true }),
            ...common.plugins
        ],
        externals: common.filterExternalsModules(),
        resolve: common.resolve
    }
}