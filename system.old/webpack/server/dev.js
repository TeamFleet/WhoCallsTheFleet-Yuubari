// const path = require('path')
const webpack = require('webpack')
const common = require('../common')

module.exports = async (appPath, clientDevPort) => {
    const publicPath = `http://localhost:${clientDevPort}/dist`

    return {
        target: 'async-node',
        node: {
            __dirname: true
        },
        watch: true,
        entry: common.serverEntries(appPath).concat([
            'webpack/hot/poll?1000'
        ]),
        output: {
            filename: 'index.js',
            chunkFilename: 'chunk.[name].js',
            path: `${appPath}/${common.outputPath}/server`,
            publicPath: publicPath + `/`
        },
        module: {
            rules: [...common.rules]
        },
        plugins: [
            new webpack.DefinePlugin({
                '__CLIENT__': false,
                '__SERVER__': true,
                '__DEV__': true,
                '__SPA__': false,
                '__PUBLIC__': JSON.stringify(publicPath)
            }),
            new webpack.HotModuleReplacementPlugin({ quiet: true }),
            ...common.plugins
        ],
        externals: common.filterExternalsModules(),
        resolve: common.resolve
    }
}