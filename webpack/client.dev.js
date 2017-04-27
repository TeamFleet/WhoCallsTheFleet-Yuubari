const webpack = require('webpack')
const common = require('./common')

module.exports = (appPath, port) => {
    const entries = require('./client-entries.js')(appPath)

    return {
        target: 'web',
        devtool: 'source-map',
        entry: entries,
        output: {
            filename: '[name].js',
            chunkFilename: 'chunk.[name].[chunkhash].js',
            path: appPath + '/dist-web/public/client',
            publicPath: 'http://localhost:' + port + '/dist/'
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
                '__DEV__': false
            }),
            new webpack.NoEmitOnErrorsPlugin(),
            ...common.plugins,
            ...require('./client-plugins.js')(appPath)
        ],
        resolve: common.resolve
    }
}