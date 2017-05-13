const webpack = require('webpack')
const common = require('./common')
const fs = require('fs')
const path = require('path')

module.exports = (appPath, port) => {
    const entries = require('./client-entries.js')(appPath)
    const publicPath = `http://localhost:${port}/dist`

    return {
        target: 'web',
        devtool: 'source-map',
        entry: entries,
        output: {
            filename: '[name].js',
            chunkFilename: 'chunk.[name].[chunkhash].js',
            path: appPath + '/dist-web/public/client',
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
                '__DEV__': true,
                '__PUBLIC__': JSON.stringify(publicPath),
                '__ICONSVG__': JSON.stringify(fs.readFileSync(path.resolve(appPath, './src/client/assets/symbols/symbol-defs.svg'), 'utf8'))
            }),
            new webpack.NoEmitOnErrorsPlugin(),
            ...common.plugins,
            ...require('./client-plugins.js')(appPath)
        ],
        resolve: common.resolve
    }
}