// const path = require('path')
const webpack = require('webpack')
const common = require('../common')

const getConfig = async (appPath, type) => {
    const typeName = type ? type : 'default'
    const publicPath = `/${typeName}`

    return {
        target: 'async-node',
        node: {
            __dirname: true
        },
        watch: false,
        entry: common.serverEntries(appPath),
        output: {
            filename: 'index.js',
            chunkFilename: 'chunk.[name].[chunkhash].js',
            path: `${appPath}/${common.outputPath}/server`,
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
                '__SPA__': false,
                '__PUBLIC__': JSON.stringify(publicPath)
            }),
            ...common.plugins
        ],
        externals: common.filterExternalsModules(),
        resolve: common.resolve
    }
}

module.exports = async (appPath) => [
    await getConfig(appPath, 'app')
]