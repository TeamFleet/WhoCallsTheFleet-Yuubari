const fs = require('fs-extra')
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const {
    base: pathBase,
    assets: pathAssets,
    bgimgs: pathBgimgs,
    // pathNameDistWeb,
    _app: pathApp,
    _appUI: pathAppUI,
    _appName: appName,
    // ...dirs
} = require('../../../directories')

const useSpCssLoader = 'sp-css-loader?length=8&mode=replace'
const useUniversalAliasLoader = {
    loader: "universal-alias-loader",
    options: {
        alias: {
            "~base.less": pathAppUI + '/base.less',
            "~Assets": pathAssets,
            "~/": pathAppUI + '//'
        }
    }
}

const channel = require('../../../channel')

module.exports = (options = {}) => {

    const {
        isExtractTextPlugin
    } = options

    return {

        entry: {
            critical: [
                path.resolve(pathApp, './client/critical.js')
            ]
        },

        module: {
            rules: [
                {
                    test: /\.json$/,
                    loader: 'json-loader'
                },

                // CSS - general
                {
                    test: /\.css$/,
                    exclude: [/\.g\.css$/, /node_modules/],
                    use: [
                        useSpCssLoader,
                        "postcss-loader",
                        useUniversalAliasLoader
                    ]
                    // loader: 'sp-css-loader?length=8&mode=replace!postcss-loader'
                }, {
                    test: /\.less$/,
                    exclude: [/\.g\.less$/, /node_modules/],
                    use: [
                        useSpCssLoader,
                        "postcss-loader",
                        "less-loader",
                        useUniversalAliasLoader
                    ]
                }, {
                    test: /\.scss$/,
                    exclude: [/\.g\.scss$/, /node_modules/],
                    use: [
                        useSpCssLoader,
                        "postcss-loader",
                        "sass-loader",
                        useUniversalAliasLoader
                    ]
                },

                // CSS - in node_modules
                {
                    test: /\.css$/,
                    include: /node_modules/,
                    use: [
                        "style-loader",
                        "postcss-loader"
                    ]
                }, {
                    test: /\.less$/,
                    include: /node_modules/,
                    use: [
                        "style-loader",
                        "postcss-loader",
                        "less-loader"
                    ]
                }, {
                    test: /\.scss$/,
                    include: /node_modules/,
                    use: [
                        "style-loader",
                        "postcss-loader",
                        "sass-loader"
                    ]
                },

                // CSS - critical
                {
                    test: isExtractTextPlugin ? /critical\.g\.css$/ : /^IMPOSSIBLE$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: ["css-loader", "postcss-loader"]
                    })
                }, {
                    test: isExtractTextPlugin ? /critical\.g\.less$/ : /^IMPOSSIBLE$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: ["css-loader", "postcss-loader", "less-loader"]
                    })
                }, {
                    test: isExtractTextPlugin ? /critical\.g\.scss$/ : /^IMPOSSIBLE$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: ["css-loader", "postcss-loader", "sass-loader"]
                    })
                },

                // CSS - other global
                {
                    test: /\.g\.css$/,
                    exclude: isExtractTextPlugin ? /critical\.g\.css$/ : undefined,
                    loader: 'style-loader!postcss-loader'
                }, {
                    test: /\.g\.less$/,
                    exclude: isExtractTextPlugin ? /critical\.g\.less$/ : undefined,
                    loader: 'style-loader!postcss-loader!less-loader'
                }, {
                    test: /\.g\.scss$/,
                    exclude: isExtractTextPlugin ? /critical\.g\.scss$/ : undefined,
                    loader: 'style-loader!postcss-loader!sass-loader'
                },

                //

                {
                    test: /\.(ico|gif|jpg|jpeg|png|webp)$/,
                    loader: 'file-loader?context=static&name=assets/[hash:32].[ext]',
                    exclude: /node_modules/
                }, {
                    test: /\.svg$/,
                    loader: 'svg-url-loader',
                    exclude: /node_modules/
                }, {
                    test: /\.(js|jsx)$/,
                    loader: 'babel-loader'
                }, {
                    test: /\.nedb$/,
                    loader: 'raw-loader'
                }, {
                    test: /\.md$/,
                    include: [/docs/],
                    loader: 'raw-loader'
                }
            ]
        },

        plugins: [
            new webpack.DefinePlugin({
                '__CHANNEL__': JSON.stringify(channel),
                '__BGIMG_LIST__': JSON.stringify(
                    fs.readdirSync(pathBgimgs).filter(
                        file => !fs.lstatSync(path.resolve(pathBgimgs, file)).isDirectory() && path.extname(path.resolve(pathBgimgs, file)) === '.jpg'
                    )
                ),
                // '__ICONSVG__': JSON.stringify(
                //     fs.readFileSync(
                //         path.resolve(pathAssets, './symbols/symbol-defs.svg'), 'utf8'
                //     ).replace(/<title>(.+?)<\/title>/g, '')
                // ),
            }),
        ],

        resolve: {
            alias: {
                // 目录别名，不用的项目可以删除
                '@apps': path.resolve(pathBase, './apps'),
                '@config': path.resolve(pathBase, './config'),

                '@appName': appName,

                '@app': pathApp,
                '@appConfig': path.resolve(pathApp, './config'),
                '@appUtils': path.resolve(pathApp, './utils'),
                '@appUI': path.resolve(pathApp, './client/ui'),
                '@appLogic': path.resolve(pathApp, './client/logic'),
                "@appData": path.resolve(pathApp, './data'),
                "@appConstants": path.resolve(pathApp, './constants'),
                "@appConst": path.resolve(pathApp, './constants'),

                '@appLocales': path.resolve(pathBase, './locales'),
                '@appAssets': path.resolve(pathBase, './assets'),
                '@appDocs': path.resolve(pathBase, './docs'),
            }
        }

    }
}