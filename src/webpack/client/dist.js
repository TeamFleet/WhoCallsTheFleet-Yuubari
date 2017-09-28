const path = require('path')
// const fs = require('fs-extra')

const webpack = require('webpack')
const common = require('../common')

// const CopyWebpackPlugin = require('copy-webpack-plugin')
const pwaCreatePlugin = require('sp-pwa')

const defaults = {
    pwa: false
}

const getConfig = async (appPath, type, options = {}) => {

    const settings = Object.assign({}, defaults, options)
    const entries = require('./_entries.js')(appPath, type)
    const typeName = type ? type : 'default'
    const outputPath = path.resolve(appPath, `dist-web/public/${typeName}/`)
    const publicPath = `/${typeName}`

    // const getUrlsFromRouter = () => {
    //     const router = require(path.resolve(appPath, './src/app/client/router'))
    //     const urls = []

    //     console.log(router)

    //     const parse = (obj, prefix = '') => {
    //         if (obj.indexRoute)
    //             urls.push(`${prefix}/`)

    //         if (Array.isArray(obj.childRoutes)) {
    //             obj.childRoutes.filter(innerObj => (
    //                 typeof innerObj.path !== 'undefined'
    //                 && !innerObj.path.includes('/:')
    //                 && innerObj.path.substr(0, 1) !== ':'
    //                 && !innerObj.isRedirect
    //             )).forEach(innerObj => {
    //                 console.log(innerObj)
    //                 urls.push(`${prefix}/${innerObj.path}`.replace(/\/\//g, `/`))
    //                 parse(innerObj, innerObj.path)
    //             })
    //         }
    //     }

    //     parse(router)

    //     console.log(urls)

    //     return urls
    // }

    return {
        target: 'web',
        // devtool: 'source-map',
        entry: entries,
        output: {
            filename: `[name].[chunkhash].js`,
            chunkFilename: `chunk.[name].[chunkhash].js`,
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
                '__SPA__': false,
                '__ELECTRON__': false,
                '__DEV__': false,
                '__PUBLIC__': JSON.stringify(publicPath)
            }),
            new webpack.NoEmitOnErrorsPlugin(),
            ...common.plugins,
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    drop_console: true
                },
                beautify: false,
                comments: false,
                sourceMap: false
            }),

            ...await require('./_plugins.js')(appPath, type, false),

            settings.pwa ? pwaCreatePlugin({
                outputPath: path.resolve(outputPath, '../'),
                outputFilename: `service-worker.${typeName}.js`,
                // customServiceWorkerPath: path.normalize(appPath + '/src/client/custom-service-worker.js'),
                globPattern: `/${typeName}/**/*`,
                globOptions: {
                    ignore: [
                        '/**/_*/',
                        '/**/_*/**/*'
                    ]
                },
                // appendUrls: getUrlsFromRouter()
                appendUrls: []
            }) : undefined
        ],
        resolve: common.resolve
        // externals: ['react'] // 尝试把react单独已js引用到html中，看看是否可以减小体积
    }
}

module.exports = async (appPath) => [
    await getConfig(appPath, 'app', {
        pwa: true
    }),
]