const path = require('path')

const webpack = require('webpack')
const common = require('./common')

const pwaCreatePlugin = require('sp-pwa')

let routes = []
const parseRouter = (router, urlParent = '/') => {
    router.forEach(route => {
        if (Array.isArray(route)) return parseRouter(route, urlParent + router.path)
        routes.push(urlParent + router.path)
    })
}
// parseRouter(require('../src/client/router').default)

module.exports = async (appPath, env) => {
    const entries = require('./client-entries.js')(appPath)
    const outputPath = path.normalize(appPath + '/dist-web/public/client')
    const publicPath = '/client'

    return {
        target: 'web',
        devtool: 'source-map',
        entry: entries,
        output: {
            filename: '[name].[chunkhash].js',
            chunkFilename: 'chunk.[name].[chunkhash].js',
            path: outputPath,
            publicPath: publicPath + '/' // TODO 改成静态第三方URL用于CDN部署 http://localhost:3000/
        },
        module: {
            rules: [...common.rules]
        },
        plugins: [
            // 在node执行环境中设置，不起作用，此处不能省略
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new webpack.DefinePlugin({
                '__CLIENT__': true,
                '__SERVER__': false,
                '__APP__': true,
                '__DEV__': false,
                '__PUBLIC__': JSON.stringify(publicPath)
            }),
            new webpack.NoEmitOnErrorsPlugin(),
            ...common.plugins,
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                beautify: false,
                comments: false,
                sourceMap: (env === 'dist' ? true : false)
            }),

            ...await require('./client-plugins.js')(appPath),
        ],
        resolve: common.resolve
        // externals: ['react'] // 尝试把react单独已js引用到html中，看看是否可以减小体积
    }
}
